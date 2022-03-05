<template>
  <nav>
    <v-app-bar flat color="#2a0d5d" clipped-left app>
        <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase grey--text">
          <v-img src="/img/bean.png" max-width="50"></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="!isSmall" text href="/privacy-policy">
            <span>Privacy</span>
        </v-btn>
        <v-btn v-if="!isSmall" text href="https://discord.gg/7WEjttJtKa" target="_blank" >
            <span>Support</span>
        </v-btn>
        <v-btn v-if="!isSmall" text href="https://github.com/Xirado/Bean" target="_blank">
            <span>Github</span>
        </v-btn>
        <v-btn v-if="!isSmall" :href='invite_link' target="_blank" color="indigo" class="mx-5">
            <span>Add to Server</span>
        </v-btn>
                <!-- Open menu -->
        <v-menu v-if="isSmall" bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="mx-1">
            <v-icon class="grey--text">mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
                <v-btn text color="white" href="/privacy-policy">
                  <span>Privacy</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="white" href="https://discord.gg/7WEjttJtKa" target="_blank">
                  <span>Support</span>
                </v-btn>
                <v-spacer></v-spacer>
              <v-btn text color="white" href="https://github.com/Xirado/Bean" target="_blank">
                  <span>Github</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="white" :href='invite_link' target="_blank">
                  <span>Add to Server</span>
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
        <v-btn v-if="!loggedIn" text color="green" :href='login_link'>
            <span>Login</span>
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
        
        <v-menu v-if="user !== null && loggedIn" bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on" class="mx-1">
            <v-avatar color="brown" size="48">
              <img :src="user.effective_avatar">
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown" class="my-1">
                <img :src="user.effective_avatar">
              </v-avatar>
              <h3>{{ user.username }}<span class="ml-1 grey--text">#{{ user.discriminator }}</span>
              </h3>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text color="red" @click="logout()">
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer absolute stateless clipped dark v-model="drawer" app color="#23272a">
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon class="grey--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
import { logout, fetchLoginURL, fetchInviteURL } from '@/api/api.js'
import EventBus from '@/events/event-bus.js'
const json_bigint = require('json-bigint')
export default {
  data() {
    return {
      user: null,
      drawer: false,
      loggedIn: false,
      login_link: null,
      invite_link: null,
      isSmall : this.$vuetify.breakpoint.smAndDown,
      links: [
        // { icon: 'mdi-home', text: 'Home', route: '/' },
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' },
        { icon: 'mdi-folder', text: 'Commands', route: '/commands' }
      ],
    }
  },
  methods : {
    logout() {
      logout()
      console.log('Logged out!')
      this.loggedIn = false
    },
    resize() {
      if (window.innerWidth > 800)
        this.isSmall = false
      else 
        this.isSmall = true
    }
  },
  created() {
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  async mounted() {
    this.loggedIn = localStorage.getItem('token') ? true : false
    this.login_link = await fetchLoginURL()
    this.invite_link = await fetchInviteURL()
    EventBus.$on('LoginEvent', async (value) => {
      this.loggedIn = value
      if (value)
      {
        this.user = json_bigint.parse(localStorage.getItem('user'))
      }
    })
    if (localStorage.getItem('token') == null) {
      this.loggedIn = false
    }
    if (localStorage.getItem('token'))
    {
      this.loggedIn = true
      const user = json_bigint.parse(localStorage.getItem('user'))
      this.user = user
    }
  }
  
}
</script>

<style>
</style>