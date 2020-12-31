<template>
   <v-sheet class="d-flex align-self-center" height="100%" width="100%">
      <v-card>{{ end_game_message }}</v-card>
      <br />
      <v-btn @click="closeEndGame()">CLOSE</v-btn>
   </v-sheet>
</template>

<script>
export default {
   name: "EndGameScreen",
   computed: {
      end_game_message(val) {
         return this.$store.state.general.end_game_message;
      }
   },
   methods: {
      closeEndGame() {
         this.$store.commit("general/CLOSE_END_GAME_SCREEN");
      }
   },
   // watch: {
   //    end_game_message(newVal) {
   //       console.log(newVal);
   //       if (newVal === 'VICTORY') {
   //          this.$store.commit('audio/PLAY_SOUND', 'victory');
   //       } else if (newVal === 'DEFEAT') {
   //          this.$store.commit('audio/PLAY_SOUND', 'game_over_1');
   //       } else { // Draw;
   //          this.$store.commit('audio/PLAY_SOUND', 'draw');
   //       }
   //    }
   // },
   mounted() {
      this.$store.commit('audio/PAUSE_BGM'); // Pause current BGM;
      if (this.end_game_message === 'VICTORY') {
         this.$store.commit('audio/PLAY_SOUND', 'victory');
      } else if (this.end_game_message === 'DEFEAT') {
         this.$store.commit('audio/PLAY_SOUND', 'game_over_1');
      } else { // Draw;
         this.$store.commit('audio/PLAY_SOUND', 'draw');
      }
      // setTimeout( () => this.$store.commit('audio/PLAY_BGM', 'elinia'), 2000);
   },
   destroyed() {
      this.$store.commit("general/CLOSE_END_GAME_SCREEN");
   }
};
</script>

<style>
</style>