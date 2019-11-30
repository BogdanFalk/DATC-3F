<template>
  <div class="HomeCarousel">
    <v-carousel hide-delimiters light height="100%">
      <v-carousel-item v-for="(event) in events" :key="event.eventTitle">
        <v-row class="fill-height" align="center" justify="center">
          <v-layout align-space-around justify-center row fill-height>
            <div class="CandidatesCard">
              <v-flex xs12 sm6 md12 v-for="candidate in event.eventCandidates" :key="candidate.name">
                <v-card class="mx-auto" max-width="344">
                  <v-img class="white--text align-end" height="200px" :src="candidate.face"></v-img>

                  <v-card-title class="black--text">{{candidate.name}}</v-card-title>
                  <v-card-subtitle class="pb-0">{{candidate.party}}</v-card-subtitle>

                  <v-card-text class="text--primary">
                    <div>{{candidate.description}}</div>
                  </v-card-text>
 
                  <v-card-actions class="justify-center">
                    <v-btn text>Previous Candidate</v-btn>
                    <v-btn text>Next Candidate</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </div>

            <v-flex xs12 sm6 md4>
              <v-card>
                <PieChart></PieChart>
              </v-card>
            </v-flex>
          </v-layout>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>

import PieChart from "../components/PieChart.vue";
export default {
  components: {  PieChart },
  data() {
    return {
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      events: [
        {
          eventId:1,
          eventTitle:"Presidentials",
          eventCandidates: [
        {
          id: 1,
          name: "Klaus Iohannis",
          face: "https://mediacdn.libertatea.ro/unsafe/375x285/smart/filters:contrast(8):quality(80)/https://static4.libertatea.ro/wp-content/uploads/2014/11/klaus_04_146ab53f00.jpg",
          party: "Mon party is PLM",
          description: "Mare gg man."
        },
        {
          id: 2,
          name: "Vio",
          face: "https://www.b1.ro/thumbs/landscape_big/2019/11/18/rezultate-alegeri-2019-exit-poll-alegeri-prezidentiale-2019-rezultate-bec-iohannis-sau-dancila-viorica-dancila-la-dna-401900.jpg",
          party: "Mon party is NSFS",
          description: "Sefu mai mic"
        },
        {
          id: 3,
          name: "John ChinaMan",
          face: "https://semantic-ui.com/images/avatar2/large/molly.png",
          party: "party KGJ",
          description: "Mare gg man."
        },
      ]
        },
        {
          eventId:2,
          eventTitle:"Referendum",
          eventCandidates: [
        {
          id: 1,
          name: "Klaus Iohannis",
          face: "https://mediacdn.libertatea.ro/unsafe/375x285/smart/filters:contrast(8):quality(80)/https://static4.libertatea.ro/wp-content/uploads/2014/11/klaus_04_146ab53f00.jpg",
          party: "Mon party is PLM",
          description: "Mare gg man."
        },
        {
          id: 2,
          name: "Vio",
          face: "https://www.b1.ro/thumbs/landscape_big/2019/11/18/rezultate-alegeri-2019-exit-poll-alegeri-prezidentiale-2019-rezultate-bec-iohannis-sau-dancila-viorica-dancila-la-dna-401900.jpg",
          party: "Mon party is NSFS",
          description: "Sefu mai mic"
        },
        {
          id: 3,
          name: "John ChinaMan",
          face: "https://semantic-ui.com/images/avatar2/large/molly.png",
          party: "party KGJ",
          description: "Mare gg man."
        },
      ]
        }
      
      ],
    };
  }
};
</script>

<style>

</style>