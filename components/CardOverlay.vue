<template>
   <div
      class="card-board-overlay d-flex flex-column justify-center align-center"
   >
      <v-card v-show="game_starting">Game starting in..</v-card>
      <br />
      <v-card
         v-if="game_starting"
         width="80px"
         height="80px"
         class="pa-0 ma-0 text-center d-flex align-self-center"
         color="primary"
      >
         <div class="ma-auto" style="font-size: 50px">
            {{ game_start_countdown }}
         </div>
      </v-card>

      <v-card v-if="room_type === 'custom' && room_infor.room_master && !game_starting">
         <v-btn 
            v-if="my_display_name === room_infor.room_master.displayName"
            :disabled="disable_start_button"
            @click="custom_game_start()"
         >
            Start
         </v-btn>
         <v-btn 
            v-else
            @click="ready()"
            :disabled="ready_button_disabled"
         >
            Ready
         </v-btn>
      </v-card>
   </div>
</template>

<script>
export default {
   name: "CardOverlayComp",
   data() {
      return {
         game_start_countdown: 5,
         interval_id: null,
         ready_button_disabled: false,
      };
   },
   computed: {
      my_display_name() {
         return this.$store.state.general.my_display_name;
      },
      player_1_display_name() {
         return this.$store.state.room.room_info.players.player_1.displayName;
      },
      game_starting() {
         return this.$store.state.room.game_starting;
      },
      room_infor() {
         return this.$store.state.room.room_info;
      },
      room_type() {
         return this.$store.state.room.room_type;
      },
      disable_start_button() {
         let playersValues = Object.values(this.room_infor.players);
         let readyPlayers = 0;
         playersValues.forEach( ea => {
            if (ea.ready) { readyPlayers++ }
         });

         if (readyPlayers === this.room_infor.capacity - 1) {
            return false;
         } else {
            return true;
         }
      }
   },
   methods: {
      ready() {
         this.ready_button_disabled = true;
         window.socket.emit('custom-ready', { displayName: this.my_display_name, ready: true, roomInfo: this.room_infor });
      },
      custom_game_start() {
         window.socket.emit('custom-start', {roomInfo: this.room_infor});
      }
   },
   watch: {
      game_starting: {
         handler: function (val) {
            if (val && !this.room_infor.terminate) { // If store room_starting is true and room is not terminating,
               this.interval_id = setInterval(() => {
                  if (this.game_start_countdown === 0) {
                     clearInterval(this.interval_id);
                     if (this.player_1_display_name === this.my_display_name) {
                        this.$store.commit('room/RESET_SCORE'); // TEMPORARY QUICK-FIX FOR NOW;
                        return window.socket.emit('start-game', { 
                           room_id: this.room_infor._id, 
                           room_number: this.room_infor.room_number
                        });
                     } else {
                        return
                     }
                  }
                  this.game_start_countdown--;
                  this.$store.commit('audio/PLAY_SOUND', 'countdown');
               }, 1000);
            } else {
               clearInterval(this.interval_id);
               this.game_start_countdown = 5;
            }
         },
         immediate: true
      },
   },
   beforeDestroy() {
      if (this.interval_id) {
         clearInterval(this.interval_id);
      }
   }
};
</script>

<style scoped>

.card-board-overlay {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: black;
}

</style>