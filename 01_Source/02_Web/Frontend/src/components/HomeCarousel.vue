<template>
  <div class="HomeCarousel">
    <v-carousel class="carousel" hide-delimiters light height="100%">
      <v-carousel-item v-for="event in events" :key="event.eventTitle">
        <h1 class="eventTitleHeader">{{event.eventTitle}}</h1>
        <v-row class="fill-height" align="center" justify="center">
          <v-layout align-space-around justify-center row fill-height>
            <div v-if="event.eventTitle === 'Presidentials'" class="CandidatesCard">
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
            <div v-if="event.eventTitle === 'Parliamentary'" class="PartiesCard">
              <v-flex xs12 sm6 md12 v-for="party in event.eventParties" :key="party.name">
                <v-card class="mx-auto" max-width="344">
                  <v-img class="white--text align-end" height="200px" :src="party.logo"></v-img>

                  <v-card-title class="black--text">{{party.name}}</v-card-title>

                  <v-card-text class="text--primary">
                    <div>{{party.description}}</div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </div>
            <div v-if="event.eventTitle === 'Referendum'" class="QuestionsCard">
              <v-flex
                xs12
                sm6
                md12
                v-for="question in event.Questions"
                :key="question.questionTitle"
              >
                <v-card class="mx-auto" max-width="344">
                  <v-card-title class="black--text">{{question.questionTitle}}</v-card-title>
                </v-card>
              </v-flex>
            </div>

            <v-flex xs12 sm6 md4>
              <v-card class="statistics" v-if="event.eventTitle==='Referendum'">
                <v-btn v-on:click="getDataForChart">Show statistic</v-btn>
                <barChartQuestions></barChartQuestions>
              </v-card>
              <v-card class="statistics" v-if="event.eventTitle==='Parliamentary'">
                <v-btn v-on:click="getDataForChart">Show statistic</v-btn>
                <PieChartParties></PieChartParties>
              </v-card>
              <v-card class="statistics" v-if="event.eventTitle==='Presidentials'">
                <v-btn v-on:click="getDataForChart">Show statistic</v-btn>
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
/* eslint-disable no-alert, no-console, no-unused-vars */
import PieChart from "../components/PieChart.vue";
import PieChartParties from "../components/PieChartParties.vue";
import barChartQuestions from "../components/barChartQuestions.vue";
import axios from "axios";
export default {
  components: { barChartQuestions, PieChart, PieChartParties },
  data() {
    return {
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      events: []
    };
  },
  methods: {
    getAllEvents() {
      axios
        .post("/api/event/getAllEventsWithAssociates")
        .then(
          response => {
            var events = [];
            console.log(response);
            response.data.eventPresident.forEach(event => {
              if (event.type === "presidential") {
                const newEvent = {};
                newEvent.eventId = event.id;
                newEvent.eventTitle = "Presidentials";
                newEvent.eventCandidates = [];
                event.candidate.forEach(candidate => {
                  const newCandidate = {};
                  newCandidate.id = candidate.id;
                  newCandidate.name = candidate.name;
                  newCandidate.face = candidate.face;
                  newCandidate.party = candidate.party;
                  newCandidate.numberVotes =
                    candidate.votesOut + candidate.votesIn;
                  newEvent.eventCandidates.push(newCandidate);
                });
                events.push(newEvent);
              }
            });
            response.data.eventReferendum.forEach(event => {
              if (event.type === "referendum") {
                const newEvent = {};
                newEvent.eventId = event.id;
                newEvent.eventTitle = "Referendum";
                newEvent.Questions = [];
                event.referendum.forEach(referendum => {
                  const newQuestion = {};
                  newQuestion.questionId = referendum.id;
                  newQuestion.questionTitle = referendum.question;
                  newQuestion.questionAnswer_Votes_Yes = referendum.votes_yes;
                  newQuestion.questionAnswer_Votes_No = referendum.votes_no;
                  newEvent.Questions.push(newQuestion);
                });
                events.push(newEvent);
              }
            });
            response.data.eventParliamentary.forEach(event =>  {
                if (event.type === "parliamentary") {
                  const newEvent = {};
                  newEvent.eventId = event.id;
                  newEvent.eventTitle = "Parliamentary";
                  newEvent.eventParties = [];
                  event.party.forEach(party => {
                    const newParty = {};
                    newParty.id = party.id;
                    newParty.name = party.name;
                    newParty.logo = party.logo;
                    newParty.description = party.description;
                    newParty.numberVotes = party.votesIn + party.votesOut;
                    newEvent.eventParties.push(newParty);
                  });
                  events.push(newEvent);
                }
            })
            // response.data.forEach(type => {
            //   console.log(type);
            //   type.forEach(event => {
            //     console.log(event.type);

              
            //   });
            // });
            console.log(events);
            this.events = events;
          },
          error => {
            console.log(error);
          }
        );
    },
    getDataForChart() {
      console.log("Emiting data for piechart");
      this.$root.$emit("dataForPieChart", this.events[0]); //event candidates for Presidentials event
      console.log("Emiting data for piechart Parties");
      this.$root.$emit("dataForPieChartParties", this.events[2]); //event parties for Parliamentary
      console.log("Emiting data for barchart referendum.");
      this.$root.$emit("dataForBarChart", this.events[1]); // event questions votes
    }
  },
  created: async function() {
    this.getAllEvents();
  },
  mounted: function() {}
};
</script>

<style>
.eventTitleHeader {
  text-align: center;
  margin-bottom: 40px;
}
.QuestionsCard {
  margin-bottom: 40px;
}
.carousel .v-window__prev {
  position: fixed !important;
}

.carousel .v-window__next {
  position: fixed !important;
}
.statistics {
  margin-bottom: 100px;
}
</style>