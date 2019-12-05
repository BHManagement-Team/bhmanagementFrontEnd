<template>
  <div id="top">
    <v-card class="mb-4">
      <v-form id="form">
        <center>
          <img src="~@/assets/bhmLogo.png">
          <h3>Password Settings</h3>
        </center>

        <v-text-field
          v-model="password"
          id="current_password"
          label="Current Password"
          name="current_password"
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="password"
          id="new_password"
          label="New Password"
          name="new_password"
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="password"
          id="confirm_password"
          label="Confirm Password"
          name="confirmpassword"
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>
      </v-form>
      <v-spacer></v-spacer>
      <v-btn color="success" id="btnSave" outline>Save Changes</v-btn>
      <v-spacer></v-spacer>
    </v-card>
    
  </div>
</template>
<style scoped>
#top {
  margin-top: 130px !important;
  margin-left: 300px !important;
  max-width: 400px !important;
}
#form{
  padding: 20px;
}
#btnSave{
  margin-left: 120px;
  margin-bottom: 20px;
}
</style>
<script>
import axios from "axios";
export default {
  name: "settings",
  data() {
    return {
      e1: 1,
      steps: 2,
      username: "",
      newUsername: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        nameRules: v => /^[A-Z a-z]+$/.test(v) || "Name must be valid",
        matchPassword: () =>
          this.credentials.password === this.confirm_password ||
          "Passwords don't match !"
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
  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
    save() {
      if (this.newPassword === this.confirmPassword) {
        axios
          .post("http://localhost:3000/bhm/update", {
            username: this.username,
            oldPassword: this.currentPassword,
            newPassword: this.newPassword
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
<style>
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