<template>
  <v-app id="app">
      <Navbar />
    <v-main class="mx-4 my-4">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import { logout } from '@/api/api.js'
export default {
  name: 'App',
  components: { Navbar },
  created() {
    if (localStorage.getItem('token') && localStorage.getItem('last_login')) {
      if (Date.now()/1000 > Number.parseInt(localStorage.getItem('last_login'))+259200)
        logout()
    } else {
      logout()
    }
  }
}
</script>

<style>
#app {
  background-color: #222;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
