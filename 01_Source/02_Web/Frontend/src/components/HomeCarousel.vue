<template>
  <div class="HomeCarousel">
    <v-carousel class = "carousel" hide-delimiters light height="100%">
      
      <v-carousel-item v-for="event in events" :key="event.eventTitle">
        <h1 class = "eventTitleHeader" >{{event.eventTitle}}</h1>
        <v-row class="fill-height" align="center" justify="center">
          <v-layout align-space-around justify-center row fill-height>
            <div v-if ="event.eventTitle === 'Presidentials'" class="CandidatesCard" >
              <v-flex
                xs12
                sm6
                md12
                v-for="candidate in event.eventCandidates"
                :key="candidate.name"
              >
                <v-card class="mx-auto" max-width="344">
                  <v-img class="white--text align-end" height="200px" :src="candidate.face"></v-img>

                  <v-card-title class="black--text">{{candidate.name}}</v-card-title>
                  <v-card-subtitle class="pb-0">{{candidate.party}}</v-card-subtitle>

                  <v-card-text class="text--primary">
                    <div>{{candidate.description}}</div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </div>

             <div v-if ="event.eventTitle === 'Referendum'" class="QuestionsCard" >
              <v-flex
                xs12
                sm6
                md12
                v-for="question in event.Questions"
                :key="question.questionTitle"
              >
                <v-card class="mx-auto" max-width="344">
                  <v-card-title class="black--text">{{question.questionTitle}}</v-card-title>
                  <v-card-subtitle class="pb-0">{{question.questionDetails}}</v-card-subtitle>

                  <v-card-text class="text--primary">
                    <div>{{question.description}}</div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </div>


            <v-flex xs12 sm6 md4>
              <v-card class="statistics" v-if="event.eventTitle==='Referendum'">
                <barChartQuestions ></barChartQuestions>
              </v-card>
              <v-card class="statistics" v-else>
                <PieChart :candidates=event.eventCandidates></PieChart>
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
import barChartQuestions from "../components/barChartQuestions.vue";
export default {
  components: { barChartQuestions,PieChart},
  data() {
    return {
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      events: [
        {
          eventId: 1,
          eventTitle: "Presidentials",
          eventCandidates: [
            {
              id: 1,
              name: "Klaus Iohannis",
              face:
                "https://mediacdn.libertatea.ro/unsafe/375x285/smart/filters:contrast(8):quality(80)/https://static4.libertatea.ro/wp-content/uploads/2014/11/klaus_04_146ab53f00.jpg",
              party: "Mon party is PLM",
              description: "Mare gg man.",
              numberVotes: 22
            },
            {
              id: 2,
              name: "Vio",
              face:
                "https://www.b1.ro/thumbs/landscape_big/2019/11/18/rezultate-alegeri-2019-exit-poll-alegeri-prezidentiale-2019-rezultate-bec-iohannis-sau-dancila-viorica-dancila-la-dna-401900.jpg",
              party: "Mon party is NSFS",
              description: "Sefu mai mic",
              numberVotes: 50
            },
            {
              id: 3,
              name: "John ChinaMan",
              face: "https://semantic-ui.com/images/avatar2/large/molly.png",
              party: "party KGJ",
              description: "Mare gg man.",
              numberVotes: 17
            }
          ]
        },
        {
          eventId: 2,
          eventTitle: "Referendum",
          Questions: [
            {
              questionId: 1,
              questionTitle: "Vreti zacusca ?",
              questionDetails: "Legea x presupune ca murim toti da its okay"
            },
            {
              questionId: 2,
              questionTitle: "Doriti muie ?",
              questionDetails:
                "Legea Y presupune ca noi sa fim sanatosi , viata e frumoasa"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style>
.eventTitleHeader{

  text-align: center;
  margin-bottom: 40px;
}
.QuestionsCard{
  margin-bottom: 40px;

}
.carousel .v-window__prev{
  position: fixed!important;
}

.carousel .v-window__next{
  position: fixed!important;
}
.statistics{
   margin-bottom: 100px;
}
</style>