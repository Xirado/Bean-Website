<template>
  <div>
    <div v-if="data">
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :disabled="item.disabled" :to="item.href">
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
    <v-progress-linear
      v-if="loading && !error"
      indeterminate
      color="indigo darken-2"
    ></v-progress-linear>
    <div v-if="error">
      <v-alert outlined type="error" elevation="2">
        {{ error_message }}
      </v-alert>
    </div>
    <div v-if="data && !error">
      <v-expansion-panels multiple popout>
        <v-expansion-panel>
          <v-expansion-panel-header> Logs </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container fluid>
              <v-row align="center" class="d-flex justify-start" no-gutters>
                <v-col cols="4" class="flex-grow-0 flex-shrink-0">
                  <span class="grey--text darken-2">Logchannel</span>
                </v-col>
                <v-col
                  cols="8"
                  style="min-width: 100px"
                  class="flex-grow-0 flex-shrink-1"
                >
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
          <v-expansion-panel-header> Leveling </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container fluid>
              <v-row align="center" class="d-flex justify-start" no-gutters>
                <v-col cols="4" class="flex-grow-0 flex-shrink-0">
                  <span class="grey--text darken-2">Disabled Channels</span>
                </v-col>
                <v-col
                  cols="8"
                  style="min-width: 100px"
                  class="flex-grow-0 flex-shrink-1"
                >
                  <v-autocomplete
                    v-model="silentLevelingChannels"
                    :items="getTextChannelsRaw()"
                    outlined
                    dense
                    label="Disabled Channels"
                    multiple
                  >
                    <template #selection="{ item }">
                      <v-chip :color="item.color" small outlined>
                        {{ item.text }}
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
      <v-btn
        class="mx-2"
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
import axios from "axios";
var json_bigint = require("json-bigint");

import { backend_url, logout } from "@/api/api.js";
import Vue from "vue";
export default {
  name: "GuildView",
  computed: {
    silentLevelingChannels: {
      get() {
        return this.data.settings.silentLevelingChannels
          ? this.data.settings.silentLevelingChannels.map((x) => x.toString())
          : null;
      },
      set(val) {
        this.data.settings.silentLevelingChannels = val;
        this.changed_data.silentLevelingChannels = val;
        this.checkUpdate();
      },
    },
    log_channel: {
      get() {
        return this.data.settings.logChannel
          ? this.data.settings.logChannel.toString()
          : "0";
      },
      set(val) {
        this.data.settings.logChannel = val;
        this.changed_data.logChannel = val;
        this.checkUpdate();
      },
    },
  },
  methods: {
    async updateGuild() {
      this.loading = true;
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const body = this.changed_data;
      try {
        await axios.patch(
          `${backend_url}/guilds/${this.guild_id}`,
          body,
          config
        );

        this.changed_data = {};

        this.loading = false;
        this.has_updated = false;
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.error_message = `An unknown error occurred`;
        this.has_updated = true;
        if (error.response) {
          if (error.response.status == 401) {
            logout();
            return;
          }
        }
      }
    },
    getTextChannels() {
      if (this.data == null) return null;
      let data = [{ text: "None", value: "0" }];
      for (const channel of this.data.channels) {
        if (channel.type != 0) continue;
        data.push({ text: `#${channel.name}`, value: channel.id.valueOf() });
      }
      return data;
    },
    getRoles() {
      if (this.data == null) return null;
      let data = [];
      for (const role of this.data.roles) {
        if (!String(role.id).localeCompare(String(this.data.id))) continue;
        data.push({
          text: `${role.name}`,
          value: role.id.toString(),
          color: `#${role.color.toString(16)}`,
        });
      }
      return data;
    },
    getTextChannelsRaw() {
      if (this.data == null) return null;
      let data = [];
      for (const channel of this.data.channels) {
        if (channel.type != 0) continue;
        data.push({ text: `#${channel.name}`, value: channel.id.valueOf() });
      }
      return data;
    },
    checkUpdate() {
      const isChanged = Object.keys(this.changed_data).length != 0;
      this.has_updated = isChanged;
      console.log(this.has_updated);
    },
  },
  data() {
    return {
      items: [
        {
          text: "Dashboard",
          disabled: false,
          href: "/dashboard",
        },
      ],
      guild_id: null,
      loading: false,
      error: false,
      error_message: null,
      data: null,
      changed_data: {},
      has_updated: false,
    };
  },
  async mounted() {
    this.guild_id = this.$route.query.id;
    const token = localStorage.getItem("token");
    if (token) {
      this.loading = true;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
        transformResponse: (res) => {
          return json_bigint.parse(res);
        },
      };
      try {
        const response = await axios.get(
          `${backend_url}/guilds/${this.guild_id}?withSettings=true&deep=true`,
          config
        );
        this.data = response.data;
        Vue.set(this.items, 1, {
          text: this.data.name,
          disabled: false,
          href: `${this.$router.currentRoute.path}?id=${this.$route.query.id}`,
        });
        this.loading = false;
      } catch (error) {
        this.error = true;
        this.error_message = `Something went wrong. Please try again later`;
      }
      this.loading = false;
    }
  },
};
</script>
