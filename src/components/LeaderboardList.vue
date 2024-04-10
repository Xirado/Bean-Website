<template>
  <div class="d-flex justify-center mb-6">
    <v-list min-width="90%">
        <RankedMember 
    v-for="(user, index) in users"
    v-on:member-delete="users.splice(index, 1)"
    :key="user.id"
    :user="user"
    :guild="guild"
    :index="index"
    :loggedIn="loggedIn"
    :isAdmin="isAdmin"/>
    </v-list>
  </div>
</template>

<script>
import RankedMember from "@/components/leaderboard/RankedMember"
import EventBus from '@/events/event-bus.js'

export default {
  name: "LeaderboardList",
  props: {
    users: {
      type: Array,
      required: true,
    },
    guild: Object,
    isAdmin: Boolean,
  },
  data() {
    return {
        loggedIn: localStorage.getItem("token") != null,
    }
  },
  created() {
    EventBus.$on('LoginEvent', (value) => {
        this.loggedIn = value
    })
  },
  components: { RankedMember },
};
</script>
