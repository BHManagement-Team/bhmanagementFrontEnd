<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-container fluid>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Username</v-toolbar-title>
          </v-toolbar>
          <form id="usernameForm">
            <v-text-field
              v-model="username"
              :error-messages="nameErrors"
              :counter="10"
              label="Name"
              required
            ></v-text-field>

            <v-btn class="mr-4">Save username</v-btn>
          </form>
        </v-card>
      </v-container>
      <v-container fluid>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Password</v-toolbar-title>
          </v-toolbar>
          <form id="passwordForm">
            <v-text-field
              v-model="  currentPassword"
              :error-messages="nameErrors"
              :counter="10"
              label="Current Password"
              required
            ></v-text-field>
            <v-text-field
              v-model="  currentPassword"
              :error-messages="nameErrors"
              :counter="10"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="  currentPassword"
              :error-messages="nameErrors"
              :counter="10"
              label="Name"
              required
            ></v-text-field>

            <v-btn class="mr-4">Save username</v-btn>
          </form>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>
<style>
#img {
  width: 100px;
  height: auto;
}
#usernameForm {
  padding: 20px;
}
#passwordForm {
  padding: 20px;
}
</style>
