<template>
  <v-container fluid id="text">
    <v-row>
      <v-card class="total">
        <span>
          <h2 color="black">Total Occupants : {{total}}</h2>
        </span>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="female">
        <img src="~@/assets/girl.png" id="girl" />
        <h3>Female Occupants:</h3>
        <strong class="numFemale">{{female}}</strong>
      </v-card>
    </v-row>
    <v-row>
      <div id="Male">
        <v-card class="class">
          <img src="~@/assets/boy.png" id="man" />
          <h3>Male Occupants:</h3>
          <strong class="numFemale">{{male}}</strong>
        </v-card>
      </div>
    </v-row>
    <hr />
    <v-card class="totalRevenue">
      <span>
        <h2 color="black">Total Revenue : <strong class="numRevenue">{{totalRevenue}}</strong></h2>
      </span>
    </v-card>
  </v-container>
</template>
<style>
.numFemale {
  margin-left: 50px;
  font-size: 30px;
  color: green;
}
.numRevenue {
  margin-left: 80px;
  font-size: 30px;
  color: green;
}
.class {
  width: 500px !important;
  padding: 20px;
  padding: 20px;
  height: 130px;
  padding-left: 150px !important;
}
.female {
  position: absolute;
  top: 300px;
  left: 350px;
  padding: 20px;
  padding-left: 150px !important;
  width: 350px !important;
  height: 130px;
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
  top: 200px;
  left: 350px;
  width: 290px;
  padding: 10px;
}
.totalRevenue {
  position: absolute;
  top: 500px;
  left: 350px;
  width: 290px;
  padding: 10px;
}
#girl {
  position: absolute;
  top: 10px;
  left: 20px;
}
#man {
  position: absolute;
  top: 15px;
  left: 30px;
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
      totalRevenue: "",
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

      Axios.post("http://localhost:3000/bhm/retrieveTotalOcc", {
        token: localStorage.token
      })
        .then(response => {
          console.log(response);
          this.total = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
      Axios.post("http://localhost:3000/bhm/retrieveAmounts", {
        token: localStorage.token
      })
        .then(response => {
          this.totalRevenue = response.data.data[0].payments;
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