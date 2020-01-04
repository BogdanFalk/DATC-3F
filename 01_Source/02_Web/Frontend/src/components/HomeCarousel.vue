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
                <barChartQuestions></barChartQuestions>
              </v-card>
              <v-card class="statistics" v-else>
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
import barChartQuestions from "../components/barChartQuestions.vue";
import axios from "axios";
export default {
  components: { barChartQuestions, PieChart },
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
              party: "Party1",
              description: "Candidates1Desc",
              numberVotes: 22
            },
            {
              id: 2,
              name: "Viorica Dancila",
              face:
                "https://www.b1.ro/thumbs/landscape_big/2019/11/18/rezultate-alegeri-2019-exit-poll-alegeri-prezidentiale-2019-rezultate-bec-iohannis-sau-dancila-viorica-dancila-la-dna-401900.jpg",
              party: "Party2",
              description: "Candidates2Desc",
              numberVotes: 50
            },
            {
              id: 3,
              name: "John China",
              face: "https://semantic-ui.com/images/avatar2/large/molly.png",
              party: "Party3",
              description: "Candidates3Desc",
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
              questionTitle: "Qtitle 1?",
              questionDetails: "Qdetails 1"
            },
            {
              questionId: 2,
              questionTitle: "Qtitle 2?",
              questionDetails: "Qdetails 2"
            }
          ]
        },
        {
          eventId: 3,
          eventTitle: "Parliamentary",
          eventParties: [
            {
              id: 1,
              name: "PSD",
              logo:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Partidul_Social_Democrat_logo.svg/1200px-Partidul_Social_Democrat_logo.svg.png",
              description: "Candidates1Desc",
              numberVotes: 22
            },
            {
              id: 2,
              name: "PNL",
              face:
                "https://upload.wikimedia.org/wikipedia/commons/2/24/National_Liberal_Party_Romania.png",
              description: "Candidates2Desc",
              numberVotes: 50
            }
          ]
        }
      ]
    };
  },
  methods: {
    getAllEvents() {
      axios
        .post("http://localhost:5000/api/event/getAllEventsWithAssociates")
        .then(
          response => {
            var events = [];
            console.log(response);
            response.data.forEach(type => {
              console.log(type);
              type.forEach(event => {
                console.log(event.type);
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
                if (event.type === "referendum") {
                  const newEvent = {};
                  newEvent.eventId = event.id;
                  newEvent.eventTitle = "Referendum";
                  newEvent.Questions = [];
                  event.referendum.forEach(referendum => {
                    const newQuestion = {};
                    newQuestion.questionId = referendum.id;
                    newQuestion.questionTitle = referendum.question;
                    newEvent.Questions.push(newQuestion);
                  });
                  events.push(newEvent);
                }
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
              });
            });
            console.log(events);
            this.events = events;
          },
          error => {
            console.log(error);
          }
        );
    }
  },
  created: async function() {
    this.getAllEvents();
   
      console.log("Emiting data for piechart");
      await this.$root.$emit("dataForPieChart", this.events[0]);
      
   
  }
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