<template>
  <v-list-item>
    <v-avatar class="mx-3" size="40" :color="getColor(index)">
      <span class="white--text caption">{{ index + 1 }}</span>
    </v-avatar>
    <v-list-item-avatar size="70">
      <img @error="user.avatarUrl = getAvatarUrl(user, false)" :src="getAvatarUrl(user, true)" />
    </v-list-item-avatar>
    <v-hover v-slot="{ hover }">
      <v-row align="center" justify="center">
        <v-col cols="4">
          <span class="pl-2">
            {{ user.name }}
          </span>
        </v-col>
        <v-col cols="1" v-if="isAdmin && loggedIn">
          <RemoveRankedMemberButton
            :user="user"
            :guild="guild"
            :hideButton="hover"
            v-on:member-delete="$emit('member-delete')"
          />
        </v-col>
        <v-col class="text-right" id="exp">
          <div class="position: relative;">
            <span
              class="indigo--text text--lighten-3 mb-1"
              style="display: table; margin: 0 auto; font-size: 80%"
            >
              Experience
            </span>
            <span style="display: table; margin: 0 auto; font-size: 120%">
              {{ format(user.xp) }}
            </span>
          </div>
        </v-col>
        <v-col class="text-right" cols="3" style="margin-left: 30px">
          <v-tooltip top style="display: none">
            <template v-slot:activator="{ on, attrs }">
              <v-progress-circular
                color="indigo lighten-2"
                :rotate="-90"
                :size="65"
                :value="getPercentage(user.xp)"
                v-bind="attrs"
                v-on="on"
              >
                <div class="position: relative;">
                  <span
                    class="indigo--text text--lighten-3"
                    style="display: table; margin: 0 auto; font-size: 70%"
                  >
                    Level
                  </span>
                  <span
                    class="indigo--text text--lighten-1"
                    style="display: table; margin: 0 auto; font-size: 140%"
                  >
                    {{ getLevel(user.xp) }}
                  </span>
                </div>
              </v-progress-circular>
            </template>
            <span>{{ format(user.xp) }} XP</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-hover>
  </v-list-item>
</template>

<script>
import { formatSI } from "format-si-prefix";
import RemoveRankedMemberButton from "@/components/leaderboard/RemoveRankedMemberButton";

export default {
  name: "RankedMember",
  props: {
    guild: Object,
    user: Object,
    index: Number,
    isAdmin: Boolean,
    loggedIn: Boolean,
  },
  components: { RemoveRankedMemberButton },
  methods: {
    truncate(name) {
      let string = String(name);
      if (string.length > 41) {
        return string.substring(0, 41) + "...";
      }
      return string;
    },
    format(xp) {
      return formatSI(xp);
    },
    getXpToLevelUp(current) {
      return 5 * (current * current) + 50 * current + 100;
    },
    getLevel(xp) {
      if (xp < 100) return 0;
      let counter = 0;
      let total = 0;
      for (;;) {
        const neededForNextLevel = this.getXpToLevelUp(counter);
        if (neededForNextLevel > xp) return counter;
        total += neededForNextLevel;
        if (total > xp) return counter;
        counter++;
      }
    },
    getTotalXPNeeded(level) {
      let x = 0;
      for (let i = 0; i < level; i++) {
        x += this.getXpToLevelUp(i);
      }
      return x;
    },
    getPercentage(xp) {
      const currentLevel = this.getLevel(xp);
      const needed = this.getXpToLevelUp(currentLevel);
      const currentXP = xp - this.getTotalXPNeeded(currentLevel);
      return (currentXP / needed) * 100;
    },
    getColor(index) {
      if (index == 0) return "amber";
      else if (index == 1) return "blue-grey darken-2";
      else if (index == 2) return "deep-orange darken-1";
      else return "blue-grey darken-4";
    },
    getAvatarUrl(user, valid) {
      if (user.avatarUrl && valid) return user.avatarUrl;

      return `https://cdn.discordapp.com/embed/avatars/${
        user.discriminator == "0"
          ? (BigInt(user.id) >> BigInt(22)) % BigInt(6)
          : user.discriminator % 5
      }.png`;
    },
  },
};
</script>

<style scoped>
@media (max-width: 600px) {
  #exp {
    display: none;
  }
}

@media (min-width: 700px) {
  .tooltip {
    display: none;
  }
}
</style>
