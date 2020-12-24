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
      },
      room_info() {
         return this.$store.state.room.room_info;
      }
   },
   methods: {
      leave_room(){
         let roomNumber = this.$store.state.room.room_info.room_number;
         
         this.room_info.players
         
         let opponentInfo = [];
         let myInfo;

         Object.values(this.room_info.players).forEach( value => { 
            if (value.displayName === this.$store.state.general.my_display_name) {
               myInfo = value;
            } else {
               opponentInfo.push(value);
            }
         });

         socket.emit('leave-game', [roomNumber, myInfo, opponentInfo]);
         this.$store.commit('card/INITIAL_STATE_CARD');
      }
   }
};
</script>