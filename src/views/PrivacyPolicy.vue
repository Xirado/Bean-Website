<template>
    <div v-if="file">
        <vue-markdown class="mx-6 my-6" :source="file" :options="options"/>
    </div>
</template>

<script>

import VueMarkdown from 'vue-markdown-render'
import privacyPolicy from '../../public/markdown/PrivacyPolicy.md'
export default {
    name: 'Privacy',
    components: {
        VueMarkdown
    },
    data() {
        return {
            file: null,
            options: { html: true }
        }
    },
    mounted() {
        this.file = privacyPolicy
    }
}
</script>


