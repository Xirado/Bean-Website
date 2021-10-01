<template>
    <v-card max-width="600" dark :loading="loading">
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>{{ message }}</v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: 'ErrorMessage',
        props: {
            message: String,
            title: String,
            loading: Boolean
        }
    }
</script>

<style scoped>
.v-card.v-sheet.theme--dark {
    border-left: 5px solid red !important
}
</style>