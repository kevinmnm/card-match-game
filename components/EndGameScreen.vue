<template>
   <v-sheet class="d-flex align-self-center" height="100%" width="100%">
      <v-card>{{ end_game_message }}</v-card>
      <v-btn @click="closeEndGame()">CLOSE</v-btn>
   </v-sheet>
</template>

<script>
export default {
   name: "EndGameScreen",
   computed: {
      end_game_message() {
         return this.$store.state.general.end_game_message;
      }
   },
   methods: {
      closeEndGame() {
         this.$store.commit("general/CLOSE_END_GAME_SCREEN");
      }
   },
   destroyed() {
      this.$store.commit("general/CLOSE_END_GAME_SCREEN");
   }
};
</script>

<style>
</style>