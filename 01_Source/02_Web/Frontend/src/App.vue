<template>
  <v-app id ="vAppId">
    <v-content>
       <v-content>
        <router-view></router-view>
      </v-content>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';


export default {
  name: 'App',

  components: {
   
  },

  data: () => ({
    //
  }),

  beforeCreate: function () {
    // `this` points to the vm instance
    localStorage.setItem("adminLogged",false);
  }
    
  
  
};
</script>

<style>
#vAppId{
  height:100vh; /* set parent height for carousel full screen */
}
</style>