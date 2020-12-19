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
   </div>
</template>

<script>
export default {
   name: "CardOverlayComp",
   data() {
      return {
         game_start_countdown: 5,
         interval_id: null
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
      }
   },
   watch: {
      game_starting: {
         handler: function (val) {
            if (val) {
               this.interval_id = setInterval(() => {
                  if (this.game_start_countdown === 0) {
                     clearInterval(this.interval_id);
                     if (this.player_1_display_name === this.my_display_name) {
                        return window.socket.emit('start-game', { 
                           room_id: this.room_infor._id, 
                           room_number: this.room_infor.room_number
                        });
                     } else {
                        return
                     }
                  }
                  this.game_start_countdown--;
               }, 1000);
            } else {
               clearInterval(this.interval_id);
               this.game_start_countdown = 5;
            }
         },
         immediate: true,
      },
   },
   mounted() {
      console.warn(this.room_infor);
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