<template>
  <div class="HomeCarousel.vue">
    <v-carousel height="300px">
      <v-carousel-item v-for="(color, i) in colors" :key="color">
        <v-sheet :color="color" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-2" text-center>Election Event {{ i + 1 }}
            </div> 
            <p class="text-sm-left">In this event we vote for cookies. Prepare yourselves
              Pornire vot and other shit add some views for the sake of stan
            </p>
          </v-row>
          
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"]
    };
  }
};
</script>

<style>
</style>