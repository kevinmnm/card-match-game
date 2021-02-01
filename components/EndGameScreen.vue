<template>
   <v-sheet class="d-flex flex-column justfiy-space-around align-self-center" height="100%" width="100%">
      <v-card class="text-center d-flex align-self-center justify-center pink" height="15%" width="100%" style="font-size:5vw; font-family: 'Potta One', cursive;" flat tile>
         <v-card class="align-self-center text-center font-weight-bold" color="transparent orange--text" style="height:max-content;" flat tile>{{ end_game_message }}</v-card>
      </v-card>
      <TerminateScreen v-if="terminate_room" />
      <EndScreen />
      <v-btn @click="closeEndGame()" v-if="!terminate_room" color="error white--text" tile>CLOSE</v-btn>
   </v-sheet>
</template>

<script>
import TerminateScreen from "@/components/TerminateScreen.vue";
import EndScreen from "@/components/EndScreen.vue";

export default {
   name: "EndGameScreen",
   components: { TerminateScreen, EndScreen },
   // data(){
   //    return {
   //       terminate_countdown: 60,
   //       terminate_countdown_id: null
   //    }
   // },
   computed: {
      end_game_message() {
         return this.$store.state.general.end_game_message;
      },
      terminate_room() {
         return this.$store.state.room.room_info.terminate;
      },
      end_game_img() {
         return this.end_game_message.toLowerCase();
      },
      end_game_color() {
         if (this.end_game_message.toLowerCase() === 'victory') {
            return 'warning'
         }
      }
   },
   methods: {
      closeEndGame() {
         this.$store.commit("general/CLOSE_END_GAME_SCREEN");
      }
   },
   mounted() {
      this.$store.commit('audio/PAUSE_BGM'); // Pause current BGM;
      if (this.end_game_message === 'VICTORY') {
         this.$store.commit('audio/PLAY_SOUND', 'victory');
      } else if (this.end_game_message === 'DEFEAT') {
         this.$store.commit('audio/PLAY_SOUND', 'game_over_1');
      } else { // Draw;
         this.$store.commit('audio/PLAY_SOUND', 'draw');
      }
      setTimeout( () => this.$store.commit('audio/PLAY_BGM', 'elinia'), 2000);
   },
   beforeDestroy() {
      // if (this.terminate_countdown_id) {
      //    clearInterval(this.terminate_countdown_id);
      // }
      this.$store.commit("general/CLOSE_END_GAME_SCREEN");
   }
};
</script>

<style>
</style>