<template>
    <v-navigation-drawer 
      app
      expand-on-hover
      hide-overlay 
    >
      <template v-slot:prepend>
        <v-list>
          <v-list-item
            link
            two-line
          >
          <v-list-item-avatar>
              <v-img src="~@/assets/bhmLogo.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">BH Management</v-list-item-title>
              <v-list-item-subtitle>we make your day</v-list-item-subtitle>
            </v-list-item-content>
            
          </v-list-item>
        </v-list>
      </template>

      <v-divider></v-divider>

      <v-list
        nav
        
      >
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-blur-linear</v-icon>
          </v-list-item-icon>
          <v-list-item-title  @click="goto('/dashboard')">Room Management</v-list-item-title>
        </v-list-item>
        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="goto('/occupantmanagement')">Occupant Management</v-list-item-title>
        </v-list-item>
        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="goto('/settings')">Settings</v-list-item-title>
        </v-list-item>
        <v-list-item link >
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="goto('/')">LogOut</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  
</template>
<script>
export default {
    name: 'Sidebar',
    methods:{
      goto(link){   
          if(link=='/'){
            this.logout();
            
          }
      },
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
      }
    }, 
}
</script>