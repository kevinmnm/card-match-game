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
            <v-btn @click="quickGame()" :loading="quick_game_loading">quick game</v-btn>
         </v-col>
         <v-col cols="12">
            <v-btn disabled>join a game</v-btn>
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
   name: "IdleRoomChild",
   components: {
      Loading,
   },
   data(){
      return{
         quick_game_loading: false
      }
   },
   methods: {
      quickGame(){
         this.quick_game_loading = true;
         let payload = {
            ___mid: localStorage.___mid,
            ___sid: localStorage.___sid
         }
         window.socket.emit('quick-game', payload);
      }
   }
};
</script>

<style>
</style>