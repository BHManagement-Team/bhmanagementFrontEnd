<template>
  <v-app>
      <Sidebar v-if="LoginPage()"/>
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
  },
  methods: {
      LoginPage() {
        if(this.$route.path == "/") {
          return false
        } else {
          return true
        }
      }
    }
};
</script>