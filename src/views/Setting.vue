<template>
  <div id="body">
    <div>
      <v-alert dense text type="success" dismissible v-model="successIndicator">
        Account Successfully
        <strong>Updated</strong>
      </v-alert>
      <v-alert dense text type="error" dismissible v-model="errorIndicator">
        Account
        <strong>Un</strong>Successfully
        <strong>Updated</strong>
      </v-alert>
      <v-card class="mb-4" id="top">
        <v-form id="form">
          <center>
            <img src="~@/assets/bhmLogo.png" />
          </center>
          <span ><font  color="gray">Current username : </font><strong><i>{{username}}</i></strong></span>
          <v-text-field
            v-model="newUsername"
            label="Enter new username"
            name="new_username"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="oldPassword"
            label="Enter current password"
            prepend-icon="mdi-lock"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="newPassword"
            label="Enter your new password"
            prepend-icon="mdi-account-lock"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :rules="[rules.matchPassword]"
            label="Confirm your new password"
            prepend-icon="mdi-account-lock"
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
  width: 930px !important;
}
#form {
  padding: 20px;
}
#btnSave {
  margin-left: 380px;
  margin-bottom: 20px;
}
#body {
  background-color: rgb(224, 224, 224);
  height: 100%;
}
font{
  margin-left: 35px
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
      newUsername: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      show1: false,
      successIndicator: false,
      errorIndicator: false,
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
      .post("http://localhost:3000/bhm/retrieveOne/", {
        id: id,
        token: this.$store.state.token
      })
      .then(response => {
        console.log("shitty")
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
      if (this.newPassword == "") {
        this.text = "please input a new password!!";
              this.snackbar = true;
      }
      else {
        if (this.newUsername == "") {
          this.newUsername = this.username;
        }
        axios
          .post("http://localhost:3000/bhm/update", {
            username: this.username,
            newUsername: this.newUsername,
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          })
          .then(response => {
            console.log(response);
            if (response.data.message == "Password is incorrect!") {
              this.text = "Old Password is incorrect!!";
              this.snackbar = true;
            } else if (response.data.message == "No account found to update!") {
              this.text = "No account found to update!!";
              this.snackbar = true;
            } else {
              this.successIndicator = true;
              this.username = response.data.username;
            }
          })
          .catch(error => {
            this.errorIndicator = true;
            console.log(error);
          });
      }
    }
  }
};
</script>
<!-- <style>
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
#top{
  max-width:1000px!important;
}
</style> -->