<template>
  <v-card color="basil " id="tabs">
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card flat>
          <v-card-text>{{text}}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<style>
#tabs {
  margin-top: 110px !important;
  margin-right: 200px !important;
  margin-left: 200px !important;
}
</style>
<script>
export default {
  data() {
    return {
      tab: null,
      items: ["Profile", "Password"],
      text:"Change something here...",
    };
  }
};
</script>
