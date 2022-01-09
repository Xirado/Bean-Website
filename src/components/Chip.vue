<template>
    <v-chip v-if="!tooltip" class="mx-1" label outlined small :ripple="false" :text-color="color">
        {{ text }}
    </v-chip>
    <v-tooltip bottom v-else>
        <template v-slot:activator="{on, attrs}">
            <v-chip class="mx-1" label outlined small :ripple="false" :text-color="color" v-bind="attrs" v-on="on">
                {{ text }}
            </v-chip>
        </template>
        <slot></slot>
    </v-tooltip>
</template>

<script>
export default {
    name: 'Chip',
    props: {
        color: String,
        text: String,
        tooltip: Boolean
    }
}
</script>