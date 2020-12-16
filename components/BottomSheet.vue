<template>
   <v-bottom-sheet v-model="show_bottom_sheet" overlay-opacity="0.8" persistent>
      <v-sheet class="d-flex flex-column justify-space-around text-center pt-3 pb-3" :height="sheet_height">
         <div class="headline font-weight-bold">Are you sure you want to leave?</div>
         <v-card class="subtitle-1 ma-2 text--error ma-auto" width="70%" tile flat>
            Leaving during an active game will be counted as a loss.
         </v-card>
         <v-sheet class="d-flex flex-row justify-space-around" width="100%" color="red">
            <v-btn width="35%" @click="$emit('closeSheet')">cancel</v-btn>
            <v-btn width="35%" @click="leave_room()">leave</v-btn>
         </v-sheet>
      </v-sheet>
   </v-bottom-sheet>
</template>

<script>
export default {
   name: "BottomSheet",
   props: ["showComp"],
   computed: {
      show_bottom_sheet(){
         return this.showComp;
      },
      sheet_height() {
         return window.innerHeight / 3 + 'px';
      }
   },
   methods: {
      leave_room(){
         if (this.$store.state.guest.guest_info) { // If the player is a guest,
            let roomNumber = this.$store.state.room.room_info.room_number;
            let guestInfo = this.$store.state.guest.guest_info;
            socket.emit('leave-game', [roomNumber, guestInfo]);
         } else { // Else if the player is a user

         }
         
         this.$store.commit('room/SHOW_ROOM', false);
         this.$store.commit('room/ROOM_INFO_CREATE', null);

      }
   }
};
</script>