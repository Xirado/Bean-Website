<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name: 'DiscordOauth',
    components: {
    },
    data() {
        return {
            waiting: true
        }
    },
    created() {
        localStorage.setItem('code', this.$route.query.code)
        this.$router.push('/dashboard')
    }
}
</script>