<template>
  <v-container fluid id="text">
    <v-row>
      <v-card class="class female">
        <h1>Number of Female Occupants:</h1>
        <v-text-field v-model="female" prepend-icon="mdi-account-group" type="text" class="Text" disabled></v-text-field>
      </v-card>
    </v-row>
    <v-row>
      <div id="Male">
        <v-card class="class">
        <h1>Number of Male Occupants:</h1>
          <v-text-field v-model="male" prepend-icon="mdi-account-group-outline" type="text" class="Text" disabled></v-text-field>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>
<style>
.class {
  width: 500px !important;
  padding: 20px;
}
.female {
  position: absolute;
  top: 300px;
  left: 250px;
}
#Male {
  position: absolute;
  top: 300px;
  left: 850px;
}
.Text{
    font-size: 20px!important;
    color: black!important;
}
#text{
  background-color: rgb(224, 224, 224);
  height: 100%  ;
}
</style>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      female: "",
      male:"",
      headers: [
        {
          text: "Number of Female Occupants",
          align: "left",
          value: "female"
        },
        { text: "Number of Male Occupants", value: "male" }
      ]
    };
  },
  mounted() {
    if (localStorage.token != "null") {
      Axios.post("http://localhost:3000/bhm/retrieveFemaleOcc", {
        token: localStorage.token
      })
        .then(response => {
          console.log(response);
          this.female = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
      Axios.post("http://localhost:3000/bhm/retrieveMaleOcc", {
        token: localStorage.token
      })
        .then(response => {
          console.log(response);
          this.male = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.$router.push({ path: "/" });
    }
  }
};
</script>