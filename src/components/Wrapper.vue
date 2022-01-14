<template>
  <v-app id="app">
      <Navbar />
    <v-main class="mx-4 my-4">
      <transition name="fade">
        <slot></slot>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);
export default {
  name: "Wrapper",
  components: { Navbar },
};
</script>
