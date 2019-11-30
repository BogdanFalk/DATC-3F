
<template>
  <div class="home">
    <HomeToolbar></HomeToolbar>
    <v-container align-start fluid grid-list-md>
      <v-layout align-space-around justify-center column wrap>
        <v-flex xs12>
          <HomeCarousel></HomeCarousel>
        </v-flex>
        <v-layout align-space-around justify-center row wrap>
          
          <CandidatesCard></CandidatesCard>
          

          <v-flex xs12 sm6 md4>
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
import CandidatesCard from "../components/CandidatesCard";
export default {
  name: "Home",
  components: { PieChart, HomeToolbar, HomeCarousel,CandidatesCard},
  data() {
    return {};
  }
};
</script>

<style>
</style>