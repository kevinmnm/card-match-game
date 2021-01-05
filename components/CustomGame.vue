<template>
   <v-sheet class="two-vs-two ma-0 pa-0" width="100%" height="100%">
      <!-- Grand Wrapper -->
      <v-sheet class="ma-0 pa-0 d-flex flex-column" width="100%" height="100%">
         <v-sheet class="ma-0 pa-0 d-flex flex-row" width="100%" height="max-content">
            <v-col
               cols="12"
               class="ma-0 pa-0 d-flex flex-row"
               style="background: red; height: 40px"
            >
               <v-col cols="5" class="ma-0 pa-0">{{ room_info.title }}</v-col>
               <v-col cols="2" class="ma-0 pa-0" style="background: green"
                  >{{ countdown_time }}</v-col
               >
               <v-col cols="5" class="ma-0 pa-0">
                  <v-btn @click="confirm_leave()">Leave</v-btn>
               </v-col>
            </v-col>
         </v-sheet>
         <!-- Card Set + Info Set + Chat -->
         <v-sheet  width="100%" :height="screen_layout === 'vertical' ? 'auto' : '70%'" color="primary" class="d-flex flex-wrap" :class="screen_layout === 'vertical' ? 'flex-column' : 'flex-row'">
            <!-- Card Set -->
            <v-sheet width="100%" :height="screen_layout === 'vertical' ? 'auto' : '100%'" :class="screen_layout === 'vertical' ? 'ma-0' : 'd-flex flex-row'">
               <v-sheet class="d-flex flex-column flex-grow-1" v-if="screen_layout === 'horizontal'">
                  <v-card width="max-content">team 1 score</v-card>
                  <v-card class="flex-grow-1">
                     player 1
                  </v-card>
                  <v-card class="flex-grow-1">
                     player 2
                  </v-card>
               </v-sheet>

               <CardSet :my-turn="my_turn" />

               <v-sheet class="d-flex flex-column flex-grow-1" v-if="screen_layout === 'horizontal'">
                  <v-card width="max-content">team 2 score</v-card>
                  <v-card class="flex-grow-1">
                     player 3
                  </v-card>
                  <v-card class="flex-grow-1">
                     player 4
                  </v-card>
               </v-sheet>
            </v-sheet>
            <!-- Info Set -->
            <v-sheet class="ma-0 pa-0 d-flex flex-row" width="100%" height="max-content" color="green" v-if="screen_layout == 'vertical'">
               <v-sheet width="50%">
                  <v-card>team score 1</v-card>
                  <v-sheet class="d-flex flex-row">
                     <v-card width="50%">player 1</v-card>
                     <v-card width="50%">player 2</v-card>
                  </v-sheet>
               </v-sheet>
               <v-sheet width="50%">
                  <v-card>team score 2</v-card>
                  <v-sheet class="d-flex flex-row">
                     <v-card width="50%">player 3</v-card>
                     <v-card width="50%">player 4</v-card>
                  </v-sheet>
               </v-sheet>
            </v-sheet>
          
         </v-sheet>
         <!-- Chat Set -->
         <v-sheet class="flex-grow-1" color="primary">
            
         </v-sheet>
      </v-sheet>
   </v-sheet>
</template>

<script>
import CardSet from "@/components/CardSet.vue"
import BottomSheet from "@/components/BottomSheet.vue";
import PlayerInfo from "@/components/PlayerInfo.vue";

export default {
   name: "CustomGame",
   components: { BottomSheet, CardSet, PlayerInfo },
   data: () => ({
      leave_confirm: false,
      chat_value: '',
      chat_button_disabled: false,
      player_info_dialog: false,
      player_info_prop: null
   }),
   computed: {
      card_size_horizontal() {
         return (this.window_height * 0.7) / 6 + 'px';
      },
      screen_layout() {
         if (this.window_width > this.window_height) { // If device is horizontal (likely a PC),
            return 'horizontal';
         } else if (this.window_width <= this.window_height) { // If device is vertical (likely a phone),
            return 'vertical';
         }
      },
      window_width() {
         return this.$vuetify.breakpoint.width;
      },
      window_height() {
         return this.$vuetify.breakpoint.height;
      },
      room_info() {
         return this.$store.state.room.room_info;
      },
// COPYING FROM GAMECOMP //
      my_turn() {
         if (this.room_info.start) { // If game started and server assigned turn to player_1;
            if (this.room_info.players[this.room_info.turn].displayName === this.my_display_name) { // If turn player's display name matches mine;
               return true;
            }
            return false;
         } else { // If game ended or not started;
            return false;
         }
      },
      my_display_name(){
         return this.$store.state.general.my_display_name; 
      },
      room_chat() {
         // return this.$store.state.room.room_chat.join('');
         return this.$store.state.room.room_chat;
      },
      room_number() {
         return this.$store.state.room.room_info.room_number;
      },
      all_players() { // Object;
         return this.$store.state.room.room_info.players;
      },
      countdown_time() {
         return this.$store.state.card.countdown;
      },
      game_started() {
         return this.$store.state.room.room_info.start;
      }
   },
   methods: {
      confirm_leave(){
         if (this.room_info.start) {
            return this.leave_confirm = true;
         }

         let myInfo;

         Object.values(this.room_info.players).forEach( value => { 
            if (value.displayName === this.$store.state.general.my_display_name) {
               myInfo = value;
            }
         });

         socket.emit('leave-game', [this.room_number, myInfo, null]);
         this.$store.commit('card/INITIAL_STATE_CARD');

      }
   },
   destroyed() {
      this.$store.commit('room/ROOM_TYPE', '');
   }
   
};
</script>

<style lang="scss" scoped>

.responsive-content-class {
   background: red;
   width: 100%;
   height: 100%;
   display: flex;
   flex-wrap: wrap;
}

.flip-enter {
   transform: rotateY(94deg);
}

.flip-enter-active {
   transition: all 0.1s;
   // box-shadow: -20px 0 20px black;
   box-shadow: -10px 0 10px black;

   position: absolute;
}

.flip-enter-to {
   box-shadow: none;
}

.flip-leave-active {
   transition: all 0.1s;
   position: absolute;
   transform: rotateY(86deg);
   // box-shadow: 20px 0 5px black;
   box-shadow: 10px 0 5px black;
}

.flip-leave-to {
   box-shadow: none;
}


</style>