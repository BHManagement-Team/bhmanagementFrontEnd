<template>
  <v-container fluid id="text">
    <v-row>
      <v-card class="total">
        <h2>Total Occupants:</h2>
        <v-text-field
          v-model="total"
          prepend-icon="mdi-account-group"
          type="text"
          class="Text"
          disabled
        ></v-text-field>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="female">
        <img src="~@/assets/girl.png" id="girl" />

        <h3>Female Occupants:</h3>
        <v-text-field
          v-model="female"
          type="text"
          class="Text"
          disabled
        ></v-text-field>
      </v-card>
    </v-row>
    <v-row>
      <div id="Male">
        <v-card class="class">
        <img src="~@/assets/man.png" id="man" />
          <h3>Male Occupants:</h3>
          <v-text-field
            v-model="male"
            type="text"
            class="Text"
            disabled
          ></v-text-field>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>
<style>
.class {
  width: 500px !important;
  padding: 20px;
  padding: 20px;
  padding-left: 150px !important;
}
.female {
  position: absolute;
  top: 300px;
  left: 350px;
  padding: 20px;
  padding-left: 150px !important;
  max-width: 350px !important;

}
#Male {
  position: absolute;
  top: 300px;
  left: 790px;
  max-width: 350px !important;

}
.Text {
  font-size: 20px !important;
  color: black !important;
}
#text {
  background-color: rgb(224, 224, 224);
  height: 100%;
}
.total {
  position: absolute;
  top: 150px;
  left: 600px;
  max-height: 130px;
  max-width: 550px !important;
  padding: 10px;
}
#girl{
  position: absolute;
  top: 10px;
  left:20px;
}
#man{
  position: absolute;
  top: 15px;
  left:30px;
}
</style>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      female: "",
      male: "",
      total: "",
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

      Axios.post("http://localhost:3000/bhm/total", {
        token: localStorage.token
      })
        .then(response => {
          console.log(response);
          this.total = response.data.data;
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