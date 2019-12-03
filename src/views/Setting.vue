<template>
  <div id="margin">
    <v-card>
      <v-tabs horizontal>
        <v-tab class="padding">
          <v-icon left>mdi-account</v-icon>Profile Setting
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text class="space">
              <v-form class="size">
                <v-toolbar-title>Username</v-toolbar-title>
                <br />
                <v-text-field
                  label="Current username"
                  prepend-icon="mdi-account"
                  outlined
                  v-model="username"
                ></v-text-field>
        
                <br />
                <v-text-field
                  label="New username"
                  prepend-icon="mdi-account"
                  outlined
                  v-model="username"
                ></v-text-field>
                <v-toolbar-title>Password</v-toolbar-title>
                <br />
                <v-text-field
                  label="Current password"
                  prepend-icon="mdi-lock"
                  outlined
                  v-model="currentPassword"
                ></v-text-field>
                <v-text-field
                  label="New password"
                  prepend-icon="mdi-account-lock"
                  outlined
                  v-model="newPassword"
                ></v-text-field>
                <v-text-field
                  label="Confirm password"
                  prepend-icon="mdi-lock"
                  outlined
                  v-model="confirmPassword"
                ></v-text-field>
                <center>
                  <v-btn class="ma-2" outlined color="success" @click="save()"> Save Changes</v-btn>
                </center>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "settings",
  data() {
    return {
      username: "",
      currentPassword:"",
      newPassword:"",
      confirmPassword:""
    };
  },
  methods:{
    save(){
      if(this.newPassword === this.confirmPassword){
        axios
          .post("http://localhost:3000/bhm/update", {username:this.username,oldPassword:this.currentPassword,newPassword:this.newPassword})
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
template{
  text-align: center
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