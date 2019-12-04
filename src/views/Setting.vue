<template>
  <div id="top">
    <v-card class="mb-4">
    </v-card>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
          >
            Step {{ n }}
          </v-stepper-step>

          <v-divider
            v-if="n !== steps"
            :key="n"
          ></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="n in steps"
          :key="`${n}-content`"
          :step="n"
        >
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn
            color="primary"
            @click="nextStep(n)"
          >
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<style scoped>
  #top{
    margin-top:10px!important;
    max-width: 400px!important;
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
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      },
    },
    };
    
  },
  methods: {
    nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
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