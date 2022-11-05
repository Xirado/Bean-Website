<template>
    <div>
        <v-progress-linear v-if="loading && !error" indeterminate color="indigo darken-2"></v-progress-linear>
        <div v-if="error">
            <v-alert
            outlined
            type="error"
            elevation="2"
            >
                {{ error_message }}
            </v-alert>
        </div>
        <v-row v-if="guild" align="center mx-4 my-6 pb-10">
            <v-avatar size="128">
                <img v-if="guild.icon" :src="guild.icon" alt="Guild Icon">
            </v-avatar>
            <span class="mx-8 my-12" style="font-size: 200%; font-weight: bold;">
                {{ guild.name }}
            </span>
        </v-row>
        <div v-if="users">
            <LeaderboardList :users="users"/>
        </div>
    </div>
</template>

<script>
import { fetchLeaderboard } from '@/api/api.js'
import LeaderboardList from '../components/LeaderboardList.vue'

export default {
    components: { LeaderboardList },
    data() {
        return {
            items: [
                {
                text: 'Home',
                disabled: false,
                href: '/dashboard',
                }
            ],
            guild_id : null,
            users : null,
            guild : null,
            error : false,
            error_message : null,
            loading : false,
            no_results : false
        }
    },
    async mounted() {
        try {
            this.loading = true
            this.guild_id = this.$route.query.id
            const response = await fetchLeaderboard(this.guild_id)
            this.users = response.users.filter(x => x.xp >= 100)
            if (this.users.length == 0) {
                this.no_results = true
            }
            this.guild = response.guild
            this.items.push({text: this.guild.name, disabled: true, href: null})
            this.items.push({text: 'Leaderboard', disabled: true, href: null})
            this.loading  = false
        } catch(error) {
            this.loading = false
            this.error = true
            if (error.response) {
                const data = error.response.data
                this.error_message = `API returned code ${data.code}: ${data.message}`
            } else {
                this.error_message = 'An unknown error occurred'
            }
        }
    }
}
</script>