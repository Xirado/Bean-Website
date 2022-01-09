<template>
    <div>
        <v-list class="py-0 d-flex justify-center" >
            <v-list-item-group>
                <template v-for="(guild, index) in guilds">
                    <v-list-item
                    :key="guild.id"
                    @click="guild.bot_joined ? open(guild.id) : invite(guild.id)"
                    >
                        <v-list-item-avatar>
                            <img v-if="guild.icon" :src="guild.icon">
                            <v-avatar v-if="!guild.icon" size="36" color="indigo">
                                <span class="white--text caption" style="text-align:center; vertical-align:middle;"> {{ guild.initials }}</span>
                            </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-text="guild.name"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn
                            v-if="guild.bot_joined"
                            class="ma"
                            color="green"
                            
                            >
                            Open Dashboard
                            </v-btn>
                            <v-btn
                             v-else
                             color="indigo"
                             :href="get_invite_url(guild.id)"
                             target="_blank"
                            >
                                Setup
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                    <v-divider
                        v-if="index < guilds.length - 1"
                        :key="index"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
export default {
    name: 'GuildList',
    props: {
        guilds: {
            type: Array,
            required: true
        },
        baseInviteUrl: {
            type: String,
            required: true
        }
    },
    methods: {
        truncate(name)
        {
            let string = String(name)
            if (string.length > 41)
            {
                return string.substring(0,41)+"..."
            }
            return string
        },
        open(id) {
            this.$router.push(`guild?id=${id}`)
        },
        get_invite_url(id) {
            return this.baseInviteUrl+'&guild_id='+id
        },
        invite(id) {
            window.location.href = this.get_invite_url(id)
        }
    }

}
</script>