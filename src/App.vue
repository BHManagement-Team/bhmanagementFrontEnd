<template>
  <v-app>
      <Sidebar v-if="token !== 'null' || $route.name === 'Login'"/>
      <v-content>
        <router-view v-if="token !== 'null' || $route.path === '/'"/>
      </v-content>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
console.log(localStorage.token)
export default {
  name: "App",
  components:{
    Sidebar
  },
  data: () => ({
    token:localStorage.token
  }),
  methods: {
    }
};
</script>