<template>
 <div id="body">
    <div>
    <v-card class="mb-4" id="top">
      <v-form id="form">
        <center>
          <img src="~@/assets/bhmLogo.png">
          <h3>Password Settings</h3>
        </center>
        <v-text-field
          v-model="username"
          label="New Username"
          name="current_username"
          prepend-icon="mdi-lock"
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="oldPassword"
          label="Current Password"
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="newPassword"
          label="New Password"
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="confirmPassword"
          :rules="[rules.matchPassword]"
          label="Confirm New Password"
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>
      </v-form>
      <v-spacer></v-spacer>
      <v-btn color="success" id="btnSave" @click="save()">Save Changes</v-btn>
      <v-spacer></v-spacer>
      <v-snackbar v-model="snackbar">
        {{ text }}
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-card>
  </div>
 </div>
</template>
<style scoped>
#top {
  position: absolute;
  top: 130px !important;
  left: 300px !important;
  width: 550px !important;
}
#form {
  padding: 20px;
}
#btnSave {
  margin-left: 180px;
  margin-bottom: 20px;
}
#body{
  background-color: rgb(224, 224, 224);
  height: 100%  ;
}
</style>
<script>
import axios from "axios";
export default {
  name: "settings",
  data() {
    return {
      snackbar: false,
      text: "",
      e1: 1,
      steps: 2,
      username: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        nameRules: v => /^[A-Z a-z]+$/.test(v) || "Name must be valid",
        matchPassword: () =>
          this.newPassword === this.confirmPassword || "Passwords don't match !"
      },
      watch: {
        steps(val) {
          if (this.e1 > val) {
            this.e1 = val;
          }
        }
      }
    };
  },
  mounted() {
    var id = sessionStorage.getItem("id");
    axios
      .post("http://localhost:3000/bhm/retrievebyId/" + id)
      .then(response => {
        console.log(response);
        this.username = response.data.data.username;
      });
  },
  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
    save() {
        axios
          .post("http://localhost:3000/bhm/update", {
            username: this.username,
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          })
          .then(response => {
            console.log(response);
            if (response.data.error) {
              this.text = "Old Password is incorrect!!";
              this.snackbar = true;
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
};
</script>
<style>
#body{
  background-color: rgb(224, 224, 224);
  height: 100%  ;
}
template {
  text-align: center;
}
#margin {
  margin: auto;
  max-width: 900px;
  margin-top: 100px;
}
.padding {
  max-width: 600px !important;
  font-size: 50px !important;
  padding: 20px !important;
}
.space {
  font-size: 5px !important;
  padding: 25px;
}
</style>