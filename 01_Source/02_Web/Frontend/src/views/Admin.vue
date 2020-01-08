<template>
  <v-content>
    <v-container v-if="!isLogged" fluid style="margin-top:22vh">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="secondary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <span>Source</span>
              </v-tooltip>
              <v-tooltip right>
                <span>Codepen</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Login"
                  v-model="email"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary" v-on:click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-if="isLogged">
      <v-card>
        <v-card-title>
          <h2 v-if="addEventOperation">Add New Election Event</h2>
          <h2 v-else>Delete Election Event</h2>

          <v-menu transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" ripple=false text fab flat v-on="on">
                <v-icon>mdi-arrow-down-bold-hexagon-outline</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(operation, i) in operations" :key="i" @click="changeView(i)">
                <v-list-item-title>{{ operation }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>

        <v-card-text>
          <v-form v-if="addEventOperation">
            <v-text-field v-model="event.title" label="Title" outline></v-text-field>

            <v-combobox v-model="event.type" @click="refresh" :items="items" outline label="Type"></v-combobox>
            <v-container v-if="event.type==='Presidentials'">
              <v-text-field
                readonly
                v-model="numberOfAssociates"
                type="number"
                label="Number of Candidates"
                append-outer-icon="mdi-plus"
                @click:append-outer="incrementCandidates"
                prepend-icon="mdi-minus"
                @click:prepend="decrementCandidates"
              ></v-text-field>
              <div v-for="index in (0,numberOfAssociates)" :key="index">
                <v-text-field
                  v-model="event.candidates[index-1].name"
                  :label="'Name Candidate '+index"
                ></v-text-field>
                <v-text-field
                  v-model="event.candidates[index-1].face"
                  :label="'Picture Link for Candidate '+index"
                ></v-text-field>
                <v-text-field
                  v-model="event.candidates[index-1].description"
                  :label="'Description of Candidate '+index"
                ></v-text-field>
                <v-text-field
                  v-model="event.candidates[index-1].party"
                  :label="'Party of Candidate '+index"
                ></v-text-field>
                <v-divider></v-divider>
              </div>
            </v-container>
            <v-container v-else-if="event.type==='Parliamentary'">
              <v-text-field
                readonly
                v-model="numberOfAssociates"
                type="number"
                label="Number of Parties"
                append-outer-icon="mdi-plus"
                @click:append-outer="incrementParties"
                prepend-icon="mdi-minus"
                @click:prepend="decrementParties"
              ></v-text-field>
              <div v-for="index in (0,numberOfAssociates)" :key="index">
                <v-text-field v-model="event.parties[index-1].name" :label="'Name Party '+index"></v-text-field>
                <v-text-field
                  v-model="event.parties[index-1].logo"
                  :label="'Logo Link for Party '+index"
                ></v-text-field>
                <v-text-field
                  v-model="event.parties[index-1].description"
                  :label="'Description of Party '+index"
                ></v-text-field>
                <v-divider></v-divider>
              </div>
            </v-container>
            <v-container v-else-if="event.type==='Referendum'">
              <v-text-field
                readonly
                v-model="numberOfAssociates"
                type="number"
                label="Number of Questions"
                append-outer-icon="mdi-plus"
                @click:append-outer="incrementQuestions"
                prepend-icon="mdi-minus"
                @click:prepend="decrementQuestions"
              ></v-text-field>
              <div v-for="index in (0,numberOfAssociates)" :key="index">
                <v-text-field
                  v-model="event.questions[index-1].question"
                  :label="'Question '+index"
                ></v-text-field>
              </div>
            </v-container>

            <v-btn class="primary ml-0" v-on:click="registerEvent">Submit</v-btn>
          </v-form>
          <v-form v-else>
              <v-text-field v-model="event.title" label="Title" outline></v-text-field>
               <v-btn class="primary ml-0" v-on:click="deleteEvent">Delete</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
    <!-- <v-btn v-on:click="printEvents"></v-btn> -->+
    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
      >
      <h3 class="notificationText">
        {{ notificationText }}
        </h3>
      </v-snackbar>
  </v-content>
</template>

<script>
/*eslint-disable no-alert, no-console, no-unused-vars */
import axios from "axios";
export default {
  data() {
    return {
      drawer: null,
      isLogged: false,
      email: "",
      password: "",
      timeout:2000,
      snackbar:false,
      notificationText:"",
      event: {
        title: "",
        type: "",
        candidates: [],
        parties: [],
        questions: []
      },
      numberOfAssociates: 0,
      items: ["Presidentials", "Parliamentary", "Referendum"],
      addEventOperation:true,
      operations:["Add Event","Delete Event"]
    };
  },
  methods: {
    login() {
      axios
        .post("/api/adminUser/loginAdminUser", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response.data);
          if (response.data !== "Invalid Email or Password!") {
            this.isLogged = true;
            localStorage.setItem("adminLogged",true);
            this.notificationText="Login Successful";
            this.snackbar=true;
          } else {
            alert("Invalid Email or Password");
          }
        });
    },
    registerEvent() {
      axios
        .post(
          "/api/event/addEventWithAssociates",
          this.event
        )
        .then(response => {
          console.log(response.data);
           this.notificationText=response.data;
          this.snackbar=true;
        });
    },
    deleteEvent(){
      axios
      .post(
        "/api/event/deleteEventWithAssociates",
        {
          "name":this.event.title
        }
      )
      .then(
        response=>{
          console.log(response.data);
             this.notificationText=response.data;
          this.snackbar=true;
        }
      )
    },

    incrementCandidates() {
      this.event.candidates.push({});
      this.numberOfAssociates = parseInt(this.numberOfAssociates, 10) + 1;
    },
    decrementCandidates() {
      this.event.candidates.pop({});
      this.numberOfAssociates = parseInt(this.numberOfAssociates, 10) - 1;
    },
    incrementParties() {
      this.event.parties.push({});
      this.numberOfAssociates = parseInt(this.numberOfAssociates, 10) + 1;
    },
    decrementParties() {
      this.event.parties.pop({});
      this.numberOfAssociates = parseInt(this.numberOfAssociates, 10) - 1;
    },
    incrementQuestions() {
      this.event.questions.push({});
      this.numberOfAssociates = parseInt(this.numberOfAssociates, 10) + 1;
    },
    decrementQuestions() {
      this.event.questions.pop({});
      this.numberOfAssociates = parseInt(this.numberOfAssociates, 10) - 1;
    },
    refresh() {
      console.log("Refresh Associates");
      this.numberOfAssociates = 0;
      this.event.candidates = [];
      this.event.parties = [];
      this.event.questions = [];
    },
    printEvents() {
      console.log(this.event);
    },
    changeView(operationIndex)
    {
        console.log(operationIndex)
        if(operationIndex==0)
        {
            this.addEventOperation=true;
        }
        else
        {
            this.addEventOperation=false;
        }
        
    }
  }
};
</script>

<style>
.v-input /deep/ .v-input__slot {
  border-width: 1px !important;
  border-color: #c1cbd0 !important;
  border-radius: 0 !important;
}

.v-application--wrap {
  background-color: white;
}

.notificationText{
  text-align: center;
  width:100%;
}
</style>