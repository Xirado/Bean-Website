<template>
    <Wrapper>
    <div>
        <v-alert
        :value="!loading && !loggedIn"
        outlined
        type="info"
        elevation="2"
        transition="scale-transition"
        >
            Please log in to see your guilds!
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
            You are not Administrator on any server you are in!
        </v-alert>
        <v-card class="mx-auto" v-if="!error && !loading && loggedIn && Object.keys(guilds).length > 0">
            <GuildList :guilds="guilds" :baseInviteUrl="base_invite_url"/>
        </v-card>
    </div>
</Wrapper>
</template>


<script>
import EventBus from '@/events/event-bus.js'
import { backend_url, logout } from '@/api/api.js'
import axios from 'axios'
import GuildList from '../components/GuildList.vue'
import Wrapper from "@/components/Wrapper.vue"
export default {
    name: 'Dashboard',
    components: { GuildList, Wrapper },
    data() {
        return {
            loggedIn: false,
            loading: true,
            guilds: null,
            base_invite_url: null,
            error: false,
            error_message: "An unknown error occurred",
        }
    },
    async mounted() {
        this.error = false
        EventBus.$on('LoginEvent', (value) => {
            this.loggedIn = value
        })
        if (localStorage.getItem("token") != null) {
            try {
                this.loggedIn = true
                this.loading = true
                const token = localStorage.getItem('token')
                if (!token)
                {
                    this.loading = false
                    this.error = true
                }
                const config = {
                    headers: {
                        authorization: `Token ${token}`
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
                this.base_invite_url = response.data.base_invite_url
                this.loading = false
            } catch(error) {
                this.error = true
                if (error.response) {
                    if (error.response.status == 401) {
                        logout()
                        this.loading = false
                        return
                    }
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
        

    }
}
</script>

<style scoped>

</style>