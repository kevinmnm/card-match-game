<template>
   <v-container class="text-center" fluid>
      <h1>GameComp</h1>
      <v-row>
         <v-col cols="12">
            <v-btn disabled>ranked game</v-btn>
         </v-col>
         <v-col cols="12">
            <v-btn disabled>create a game</v-btn>
         </v-col>
         <v-col cols="12">
            <v-btn>quick game</v-btn>
         </v-col>
         <v-col cols="12">
            <v-btn>join a game</v-btn>
         </v-col>
      </v-row>
      <Loading>
         <template v-slot:text>
            asdlfkjsdf
         </template>
      </Loading>
   </v-container>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
   name: "GameComp",
   components: {
      Loading,
   },
};
</script>

<style>
</style>