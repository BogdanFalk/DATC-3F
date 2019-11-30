
<template>
  <div class="home">
    <HomeToolbar></HomeToolbar>
    <v-container align-start fluid grid-list-md>
      <v-layout align-space-around justify-center column fill-height>
        <v-flex xs12>
          <HomeCarousel></HomeCarousel>
        </v-flex>
        
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import HomeToolbar from "../components/HomeToolbar.vue";
import HomeCarousel from "../components/HomeCarousel";

export default {
  name: "Home",
  components: {  HomeToolbar, HomeCarousel},
  data() {
    return {};
  }
};
</script>

<style>
</style>