<template>
    <div>
        <v-progress-linear v-if="loading && !error" indeterminate color="indigo darken-2"></v-progress-linear>
        <v-alert
        :value="error"
        outlined
        type="error"
        elevation="2"
        transition="scale-transition"
        >
            Login failed!
        </v-alert>
    </div>
</template>

<script>
import EventBus from '@/events/event-bus.js'
import { generateToken } from '@/api/api.js'
export default {
    name: 'DiscordOauth',
    components: {
    },
    data() {
        return {
            loading: true,
            error: false
        }
    },
    async created() {
        const code = this.$route.query.code
        if (code == null) {
            this.$router.push('/')
        }
        
        try {
            const response = await generateToken(code)
            if (!response) {
                this.error = true
                return
            }
            EventBus.$emit('LoginEvent', true)
        } catch (error) {
            console.log(error)
            this.error = true
            return
        }
        this.$router.push('/dashboard')
    }
}
</script>