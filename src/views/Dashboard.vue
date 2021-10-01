<template>
    <div>
        <v-alert
        :value="!loading && !loggedIn"
        outlined
        type="info"
        elevation="2"
        transition="scale-transition"
        >
            Please login to see mutual guilds!
        </v-alert>
        <v-alert
        :value="error && loggedIn"
        outlined
        type="error"
        elevation="2"
        transition="scale-transition"
        >
            {{ error_message }}
        </v-alert>
        <v-progress-linear v-if="loading" indeterminate color="indigo darken-2"></v-progress-linear>
        <v-alert
        :value="!error && !loading && loggedIn && Object.keys(guilds).length === 0"
        outlined
        type="warning"
        elevation="2"
        transition="scale-transition"
        >
            I am not in any server in which you have Administrator permissions!
        </v-alert>
        <v-container v-if="!error && !loading && loggedIn && Object.keys(guilds).length > 0">
            <v-row align="stretch" >
                <v-col v-for="guild in guilds" v-bind:key="guild.id">
                    <v-card class="mx-auto my-3" max-width="200">
                            <v-avatar tile size="200" color="indigo darken-2">
                                <img v-if="guild.icon" :src="guild.icon">
                                <span v-if="!guild.icon" class="white--text text-h3"> {{ guild.initials }}</span>
                            </v-avatar>
                        <v-card-text style="overflow-y: auto; height:80px">{{ truncate(guild.name) }}</v-card-text>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-actions class="justify-center">
                            <v-btn color="deep-purple lighten-2" text @click="open(guild.id)">
                                Open Dashboard
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row> 
        </v-container>
    </div>
</template>


<script>
import EventBus from '@/events/event-bus.js'
import { getToken, backend_url } from '@/discord/discord.js'
import axios from 'axios'
export default {
    name: 'Dashboard',
    data() {
        return {
            loggedIn: false,
            loading: true,
            guilds: null,
            error: false,
            error_message: "An unknown error occurred",
        }
    },
    async mounted() {
        this.error = false
        EventBus.$on('LoginEvent', (value) => {
            this.loggedIn = value
        })
        if (localStorage.getItem("code") != null) {
            try {
                this.loading = true
                const tokens = await getToken()
                if (!tokens)
                {
                    this.loading = false
                    this.error = true
                }
                EventBus.$emit('LoginEvent', true)
                const config = {
                    headers: {
                        access_token: tokens.access_token,
                        refresh_token: tokens.refresh_token,
                        expires_on: tokens.expires
                    }
                }
                const response = await axios.get(`${backend_url}/guilds`, config)
                if (!response.data.guilds) {
                    const httpCode = response.data.http_code
                    let errmsg = ''
                    if (httpCode === 429) {
                        errmsg = `Discord returned error ${httpCode}: ${response.data.message}`
                    } else {
                        errmsg = `Discord returned error ${httpCode}: ${response.data.code} - ${response.data.message}`
                    }
                    this.error = true
                    this.error_message = errmsg
                    this.loading = false
                    return
                }
                this.guilds = response.data.guilds
                this.loading = false
            } catch(error) {
                this.error = true
                if (error.response) {
                    this.error_message = `Backend returned error ${error.response.status}: ${error.response.data.message}!`
                } else {
                    this.error_message = 'An unknown error occurred!'
                }
                console.log(this.error_message)
                this.loading = false
                return
            }
        } else {
            this.loading = false
            EventBus.$emit('LoginEvent', false)
        }
        

    },
    methods: {
        open(id) {
            this.$router.push(`guild?id=${id}`)
        },
        truncate(name)
        {
            let string = String(name)
            if (string.length > 41)
            {
                return string.substring(0,41)+"..."
            }
            return string
        }
  }
}
</script>

<style scoped>

</style>