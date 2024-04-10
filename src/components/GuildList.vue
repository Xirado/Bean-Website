<template>
  <div>
    <v-list class="py-0 d-flex justify-center">
      <v-list-item-group>
        <div :key="guild.id" v-for="(guild, index) in guilds">
          <v-list-item
            @click="isJoined(guild) ? open(guild.id) : invite(guild.id)"
          >
            <v-list-item-avatar>
              <img v-if="guild.iconUrl" :src="guild.iconUrl" />
              <v-avatar v-if="!guild.iconUrl" size="36" color="indigo">
                <span
                  class="white--text caption"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ getInitials(guild.name) }}</span
                >
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="guild.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                v-if="isJoined(guild)"
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
          <v-divider v-if="index < guilds.length - 1" :key="index"></v-divider>
        </div>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "GuildList",
  props: {
    guilds: {
      type: Array,
      required: true,
    },
    baseInviteUrl: {
      type: String,
    },
  },
  methods: {
    truncate(name) {
      let string = String(name);
      if (string.length > 41) {
        return string.substring(0, 41) + "...";
      }
      return string;
    },
    isJoined(guild) {
        const metadata = guild.botMetadata;
        if (!metadata) return false;

        return metadata.joined;
    },
    getInitials(name) {
        return name.match(/\b\w/g).map(char => char.toUpperCase()).join('');
    },
    open(id) {
      this.$router.push(`guild?id=${id}`);
    },
    get_invite_url(id) {
      return this.baseInviteUrl + "&guild_id=" + id;
    },
    invite(id) {
      window.location.href = this.get_invite_url(id);
    },
  },
};
</script>
