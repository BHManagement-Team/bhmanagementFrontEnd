<template>
  <div id="app">
    <span class="bg"></span>
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md5>
              <v-card class="elevation-12">
                <v-card-text>
                  <v-form>
                    <center>
                      <img src="~@/assets/bhmLogo.png" />
                      <h3>BHManagement System</h3>
                    </center>
                    <v-text-field
                      v-model="username"
                      label="username"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <center><p>hi</p></center>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- <router-link class="btnLogin" :to="'/toDashboard'"> -->
                  <v-btn v-on:click="login" color="primary">Login</v-btn>
                  <!-- @click='login()' -->
                  <br />
                  <br />
                  <!-- </router-link> -->
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
console.log(localStorage.token)
export default {
  name: "Login",
  data() {
    return {
      warning:"",
      username: "",
      password: ""
    };
  },
  methods: { 
      login: function () {
        let email = this.username
        let password = this.password
        this.$store.dispatch('login', { email, password })
       .then((res) =>{
        this.warning=JSON.stringify(res.data.message),
         this.$router.push('/dashboard')
       }
       )
       .catch(err => console.log(err))
      }
            
  },
  props: {}
};
</script>
<style>
img {
  height: 100px;
  width: auto;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  transform: scale(1.1);
}
p{
  color: red;
}
</style>
