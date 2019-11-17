
<template>
  <div class="home">
    <HomeToolbar></HomeToolbar>
    <v-container align-start fluid grid-list-md>
      <v-layout align-space-around justify-center column wrap>
        <v-flex xs12>
          <HomeCarousel></HomeCarousel>
        </v-flex>
        <v-layout align-space-around justify-space-around row wrap>
          <v-flex xs12 sm6 md4>
            <v-card class="center justify" max-width="344" outlined>
              <v-img
                class="white--text align-end"
                height="200px"
                src="https://www.europafm.ro/wp-content/uploads/2018/08/Klaus-Iohannis-discurs-la-masa.jpg"
              ></v-img>
              <v-card-title class="black--text">Name Candidate</v-card-title>
              <v-card-subtitle class="pb-0">Candidat din partea partid Smecherie</v-card-subtitle>
              <v-card-text class="text--primary">
                <div>Inforkmatiisadflaskj kljfklsadjfklasdjfklasdjflds</div>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn text>Previous Candidate</v-btn>
                <v-btn text>Next Candidate</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

          <v-flex xs12 sm6 md3>
            <v-card>
              <PieChart></PieChart>
            </v-card>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PieChart from "../components/PieChart.vue";
import HomeToolbar from "../components/HomeToolbar.vue";
import HomeCarousel from "../components/HomeCarousel";
export default {
  name: "Home",
  components: { PieChart, HomeToolbar, HomeCarousel },
  data() {
    return {};
  }
};
</script>

<style>
</style>