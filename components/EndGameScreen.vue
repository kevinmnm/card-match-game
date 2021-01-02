<template>
   <v-sheet class="d-flex flex-column justfiy-space-around align-self-center" height="100%" width="100%">
      <v-card class="text-center d-flex align-self-center" height="15%" style="font-size:5vw;">
         <v-card class="align-self-center" style="height:max-content;">{{ end_game_message }}</v-card>
      </v-card>
      <v-card class="d-flex flex-column align-self-center" width="100%" height="max-content" v-if="terminate_room">
         <v-card class="text-center" width="100%" height="max-content">Room will terminate in..</v-card>
         <v-card class="text-center" width="100%" height="max-content">{{ terminate_countdown }}</v-card>
      </v-card>
      <v-card class="ads-section flex-grow-1" width="100%" height="max-content" v-else>

      </v-card>
      <v-sheet class="ads-section flex-grow-1">

      </v-sheet>
      <v-btn @click="closeEndGame()" v-if="!terminate_room" color="primary">CLOSE</v-btn>
   </v-sheet>
</template>

<script>
export default {
   name: "EndGameScreen",
   data(){
      return {
         terminate_countdown: 60,
         terminate_countdown_id: null
      }
   },
   computed: {
      end_game_message(val) {
         return this.$store.state.general.end_game_message;
      },
      terminate_room() {
         return this.$store.state.room.room_info.terminate;
      },
      room_inform() {
         return this.$store.state.room.room_info;
      }
   },
   methods: {
      closeEndGame() {
         this.$store.commit("general/CLOSE_END_GAME_SCREEN");
      }
   },
   watch: {
      terminate_room: {
         handler: function(newVal) {
            if (newVal) {
               this.terminate_countdown_id = setInterval( () => {
                  this.terminate_countdown--;
                  if (this.terminate_countdown === 0) { // When countdown is done,
                     clearInterval(this.terminate_countdown_id);
                     let myInfo;
                     Object.values(this.room_inform.players).forEach( value => { 
                        if (value.displayName === this.$store.state.general.my_display_name) {
                           myInfo = value;
                        }
                     });
                     socket.emit('leave-game', [this.room_inform.room_number, myInfo, null]);
                     this.$store.commit('card/INITIAL_STATE_CARD');
                  }
               }, 1000);
            }
         },
         immediate: true,
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
      if (this.terminate_countdown_id) {
         clearInterval(this.terminate_countdown_id);
      }
      this.$store.commit("general/CLOSE_END_GAME_SCREEN");
   }
};
</script>

<style>
</style>