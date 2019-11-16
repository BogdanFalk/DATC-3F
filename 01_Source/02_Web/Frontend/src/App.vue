<template>
  <v-app>
    <v-content>
      <!-- <HelloWorld/> -->
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Home from './views/Home';

export default {
  name: 'App',

  components: {
    // HelloWorld,
    Home,
  },

  data: () => ({
    //
  }),
};
</script>

<style>

</style>