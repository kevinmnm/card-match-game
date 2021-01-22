<template>
   <v-card
      class="d-flex flex-column align-self-center"
      width="100%"
      height="max-content"
      v-if="terminate_room"
   >
      <v-card class="text-center" width="100%" height="max-content"
         >Room will terminate in..</v-card
      >
      <v-card class="text-center" width="100%" height="max-content">{{
         terminate_countdown
      }}</v-card>
   </v-card>
</template>

<script>
export default {
   name: "TerminateScreen",
   data() {
      return {
         terminate_countdown: 60,
         terminate_countdown_id: null,
      };
   },
   computed: {
      terminate_room() {
         return this.$store.state.room.room_info.terminate;
      },
      room_inform() {
         return this.$store.state.room.room_info;
      },
      im_spectator() {
         let spectators_array = this.room_infom.spectators;
         let imSpectator = false;
         for (let i=0; i<spectators_array.length; i++) {
            if (spectators_array[i].displayName === this.my_display_name) {
               imSpectator = true;
               break;
            }
         }
         return imSpectator;
      },
   },
   watch: {
      terminate_room: {
         handler: function (newVal) {
            if (newVal) {
               this.terminate_countdown_id = setInterval(() => {
                  this.terminate_countdown--;
                  if (this.terminate_countdown === 0) {
                     // When countdown is done,
                     clearInterval(this.terminate_countdown_id);
                     let myInfo;
                     Object.values(this.room_inform.players).forEach(
                        (value) => {
                           if (
                              value.displayName ===
                              this.$store.state.general.my_display_name
                           ) {
                              myInfo = value;
                           }
                        }
                     );
                     if (this.im_spectator) { // If I'm a spectator,
                        socket.emit("spectate-leave",{
                           spectatorInfo: this.$store.state.user.user_info,
                           roomInfo: this.room_inform
                        });
                     } else { // If I'm not a spectator,
                        socket.emit("leave-game", [
                           this.room_inform.room_number,
                           myInfo,
                           null,
                        ]);
                     }
                     
                     this.$store.commit("card/INITIAL_STATE_CARD");
                  }
               }, 1000);
            }
         },
         immediate: true,
      },
   },
   beforeDestroy() {
      if (this.terminate_countdown_id) {
         clearInterval(this.terminate_countdown_id);
      }
   },
};
</script>

<style>
</style>