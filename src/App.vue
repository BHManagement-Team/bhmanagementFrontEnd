<template>
  <v-app>
      <Sidebar v-if="$route.name !== 'Login' "/>
      <v-content>
        <router-view/>
      </v-content>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";


export default {
  name: "App",
  components:{
    Sidebar
  }
 
};
</script>