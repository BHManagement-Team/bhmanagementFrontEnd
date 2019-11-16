
<template>
  <v-card-text>
    <br>
    <h3>ADD ROOM</h3>
    <v-text-field label="Name" v-model="roomName" prepend-icon="mdi-home-edit"></v-text-field>
    <v-text-field label="Room Number" v-model="roomType" prepend-icon="mdi-lock"></v-text-field>
    <v-text-field label="Floor Number" v-model="roomSize" prepend-icon="mdi-lock"></v-text-field>
    <v-text-field label="email" v-model="roomSharing" prepend-icon="mdi-account-group"></v-text-field>
    <small class="grey--text">*This details will be save.</small>
  </v-card-text>
</template>
    
    <script>
export default {
  name: "Modal"
};
</script>
    