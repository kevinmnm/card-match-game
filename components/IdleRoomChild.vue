<template>
   <v-container class="text-center" fluid style="height:100%">
      <h1>IdleRoomChild</h1>
      <v-row>
         <v-col cols="12">
            <v-btn disabled>ranked game</v-btn>
         </v-col>
         <v-col cols="12">
            <v-btn disabled>create a game</v-btn>
         </v-col>
         <v-col cols="12">
            <v-btn @click="quickGame()">quick game</v-btn>
         </v-col>
         <v-col cols="12">
            <v-btn disabled>join a game</v-btn>
         </v-col>
      </v-row>
      <Loading v-show="loading_comp">
         <template v-slot:text>
            {{ loading_text }}
         </template>
      </Loading>
   </v-container>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
   name: "IdleRoomChild",
   components: {
      Loading,
   },
   data(){
      return{
         loading_comp: false,
         loading_text: 'Searching...'
      }
   },
   methods: {
      quickGame(){
         this.loading_comp = true;
         window.socket.emit('quick-game');
      }
   },
};
</script>

<style>
</style>