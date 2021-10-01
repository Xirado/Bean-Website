<template>
    <div>
        <div v-if="data">
              <v-breadcrumbs :items="items">
                <template v-slot:item="{ item }">
                    <v-breadcrumbs-item
                        :disabled="item.disabled"
                        :to="item.href" 
                    >
                        {{ item.text }}
                    </v-breadcrumbs-item>
                </template>
                </v-breadcrumbs>
        </div>
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
         <div v-if="data && !error" >
            <v-expansion-panels multiple popout>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        Logs
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-container fluid>
                            <v-row align="center" class="d-flex justify-start" no-gutters>
                                <v-col cols="4" class="flex-grow-0 flex-shrink-0">
                                    <span class="grey--text darken-2">Logchannel</span>
                                </v-col>
                                <v-col cols="8" style="min-width: 100px;" class="flex-grow-0 flex-shrink-1">
                                    <v-select
                                    :items="getTextChannels()"
                                    label="Channel"
                                    v-model="log_channel"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        Music
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-container fluid>
                            <v-row align="center" class="d-flex justify-start" no-gutters>
                                <v-col cols="4" class="flex-grow-0 flex-shrink-0">
                                    <span class="grey--text darken-2">DJ Roles</span>
                                </v-col>
                                <v-col cols="8" style="min-width: 100px;" class="flex-grow-0 flex-shrink-1">
                                    <v-autocomplete
                                        v-model="dj_roles"
                                        :items="getRoles()"
                                        outlined
                                        dense
                                        label="DJ Roles"
                                        multiple>
                                        <template #selection="{item}">
                                            <v-chip :color="item.color" small outlined>
                                                {{item.text}}
                                            </v-chip>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-divider class="my-4"></v-divider>
            <v-btn class="mx-2"
            :disabled="has_updated ? false : true"
            @click="updateGuild()"
            color="success"
            >
            Save
            </v-btn>
         </div>
    </div>
</template>

<script>
import axios from 'axios'
var json_bigint = require('json-bigint')
var _ = require('lodash')

import { backend_url, getToken } from '@/discord/discord.js'
import Vue from 'vue'
export default {
    name: 'GuildView',
    computed: {
        dj_roles: {
            get() {
                return this.data.data.dj_roles ? this.data.data.dj_roles.map(x => x.toString()) : null
            },
            set(val) {
                this.data.data.dj_roles = val
                this.changed_data.dj_roles = val
                this.checkUpdate()
            }
        },
        log_channel: {
            get() {
                return this.data.data.log_channel ? this.data.data.log_channel.toString() : "0"
            },
            set(val) {
                this.data.data['log_channel'] = val
                this.changed_data['log_channel'] = val
                this.checkUpdate()
            }
        }
    },
    methods: {
        async updateGuild()
        {
            this.loading = true
            this.received_data = json_bigint.parse(json_bigint.stringify(this.data))
            this.checkUpdate()
            const tokens = await getToken()
            const config = {
            headers: {
                access_token : tokens.access_token,
                refresh_token : tokens.refresh_token,
                expires_on : tokens.expires
                }
            }
            const body = { guild: this.guild_id, data : this.changed_data }
            try {
                await axios.post(`${backend_url}/modifyguild`, body, config)
                this.changed_data = { }
                this.loading = false
            }catch(error) {
                this.loading = false
                this.error = true
                this.error_message = `An unknown error occurred`
                if (error.response)
                {
                    const data = error.response.data
                    this.error_message = `Backend returned error ${data.code}: ${data.message}`
                }
            }
        },
        getTextChannels()
        {
            if (this.data == null) return null
            let data = [{text: 'None', value: "0"}]
            for (const channel of this.data.guild.channels)
            {
                if (channel.type != 0) continue
                data.push({text: `#${channel.name}`, value: channel.id.valueOf()})
            }
            return data
        },
        getRoles() {
            if (this.data == null) return null
            let data = []
            for (const role of this.data.guild.roles) {
                if (!String(role.id).localeCompare(String(this.data.guild.id))) continue
                data.push({text: `${role.name}`, value: role.id.toString(), color: `#${role.color.toString(16)}`})
            }
            return data
        },
        checkUpdate() {
            if (_.isEqual(this.data.data, this.received_data.data))
            {
                this.has_updated = false
            } else {
                this.has_updated = true
            }
        }
    },
    data() {
        return {
            items: [
                {
                text: 'Dashboard',
                disabled: false,
                href: '/dashboard',
                }
            ],
            guild_id : null,
            loading: false,
            error: false,
            error_message: null,
            data: null,
            received_data : null,
            changed_data : { },
            has_updated: false,
            log_channel_id: null,
        }
    },
    async mounted() {
        this.guild_id = this.$route.query.id
        if(localStorage.getItem('code'))
        {
            this.loading = true
            const tokens = await getToken()
            const config = {
            headers: {
                access_token : tokens.access_token,
                refresh_token : tokens.refresh_token,
                expires_on : tokens.expires,
                guild_id : this.guild_id,
                },
                transformResponse: (res) => {
                    return json_bigint.parse(res);
                },
            }
            try {
                const response = await axios.get(`${backend_url}/guild`, config)
                if (!response.data.data) {
                    const discord_error = response.data.code ? true : false
                    const httpCode = response.data.http_code
                    let errmsg = ''
                    if (discord_error) {
                        errmsg = `Discord returned error ${httpCode}: ${response.data.code} - ${response.data.message}`
                    } else {
                        errmsg = `Discord returned error ${httpCode}!`
                    }
                    this.error = true
                    this.error_message = errmsg
                    this.loading = false
                    return
                }
                this.data = response.data
                this.received_data = json_bigint.parse(json_bigint.stringify(this.data))
                this.log_channel_id = this.data.data.log_channel ? this.data.data.log_channel : "0"
                Vue.set(this.items, 1, {text: this.data.guild.name, disabled: false, href: `${this.$router.currentRoute.path}?id=${this.$route.query.id}`})
                this.loading = false
            }catch(error) {
                console.log(error)
                this.error = true
                this.error_message = `An unknown error occurred`
                if (error.response)
                {
                    const data = error.response.data
                    this.error_message = `Backend returned error ${data.code}: ${data.message}`
                }
            }
            this.loading = false
        }
    }
}
</script>