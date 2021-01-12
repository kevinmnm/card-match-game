<template>
   <v-sheet class="two-vs-two ma-0 pa-0" width="100%" height="100%" max-height="100%">
      <!-- Grand Wrapper -->
      <v-sheet class="ma-0 pa-0 d-flex flex-column" width="100%" height="100%">
         <v-sheet ref="top_wrapper" class="top-wrapper ma-0 pa-0 d-flex flex-row" width="100%" height="max-content">
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

         <v-sheet ref="middle_wrapper" class="middle-wrapper d-flex flex-wrap"   width="100%" :height="screen_layout === 'vertical' ? 'auto' : '70%'" color="primary" :class="screen_layout === 'vertical' ? 'flex-column' : 'flex-row'">
            
<!--------------------------->
<!-- MIDDLE FOR HORIZONTAL -->
<!--------------------------->
            <v-sheet width="100%" :height="screen_layout === 'vertical' ? 'auto' : '100%'" :class="screen_layout === 'vertical' ? 'ma-0' : 'd-flex flex-row'">

               <v-sheet class="d-flex flex-column flex-grow-1 text-center" v-if="screen_layout === 'horizontal' && room_info.capacity === 4">
                  <v-card width="100%">{{ score_1 }}</v-card>
   <!-- HORIZONTAL && CAPACITY === 4 (2vs2) -->
                  <v-sheet class="flex-grow-1">
                     <v-sheet v-if="all_players.player_1" class="d-flex flex-column">
                        <v-card class="flex-grow-1 d-flex flex-column text-center" height="50%">
                           <v-responsive :aspect-ratio="1/1" width="100%" max-width="100px" max-height="100px" class="ma-auto red">
                              <v-img :src="require(`@/assets/img/rank/${all_players.player_1.rank}.png`)"></v-img>
                           </v-responsive>
                        </v-card>
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card class="display-name text-truncate d-flex flex-row justify-center" v-on="on" v-bind="attrs" @click="open_player_info(all_players.player_1)">
                                 {{ all_players.player_1.displayName }}
                                 <DisplayNameIcon :player-prop="all_players.player_1" />
                              </v-card>
                           </template>
                           <span>{{ all_players.player_1.displayName }}</span>
                        </v-tooltip>
                     </v-sheet>
                     <v-sheet v-if="all_players.player_2" class="d-flex flex-column">
                        <v-card class="flex-grow-1 d-flex flex-column text-center" height="50%">
                           <v-responsive :aspect-ratio="1/1" width="100%" max-width="100px" max-height="100px" class="ma-auto red">
                              <v-img :src="require(`@/assets/img/rank/${all_players.player_2.rank}.png`)"></v-img>
                           </v-responsive>
                        </v-card>
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card class="display-name text-truncate d-flex flex-row justify-center" v-on="on" v-bind="attrs" @click="open_player_info(all_players.player_2)">
                                 {{ all_players.player_2.displayName }}
                                 <DisplayNameIcon :player-prop="all_players.player_2" />
                              </v-card>
                           </template>
                           <span>{{ all_players.player_2.displayName }}</span>
                        </v-tooltip>
                     </v-sheet>
                  </v-sheet>
               </v-sheet>
               
   <!-- HORIZONTAL && CAPACITY === 2 (1vs1) <player_1> -->
               <v-sheet class="d-flex flex-column flex-grow-1 text-center" :height="card_size_horizontal*6+'px'" v-if="screen_layout === 'horizontal' && room_info.capacity === 2 && all_players.player_1" :max-width="(window_width - card_size_horizontal*6) / 2">
                  <v-card width="100%" height="max-content">{{ all_players.player_1.score }}</v-card>
                  <v-sheet class="d-flex flex-column flex-grow-1" width="100%" color="primary">
                     <v-sheet class="mt-2 mb-2" height="40%">
                        <v-responsive height="100%" :aspect-ratio="1/1" class="red">
                           <v-img class="purple" height="100%" contain :src="require(`@/assets/img/rank/${all_players.player_1.rank}.png`)"></v-img>
                        </v-responsive>
                     </v-sheet>
                     <v-sheet class="d-flex flex-column flex-grow-1" width="100%" color="primary">
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card class="display-name text-truncate d-flex flex-row justify-center" style="font-size: 18px;" v-on="on" v-bind="attrs" @click="open_player_info(all_players.player_1)">
                                 {{ all_players.player_1.displayName }}
                                 <DisplayNameIcon :player-prop="all_players.player_1" />
                              </v-card>
                           </template>
                           <span>{{ all_players.player_1.displayName }}</span>
                        </v-tooltip>
                     </v-sheet>
                  </v-sheet>
               </v-sheet>

               <CardSet :my-turn="my_turn" />

   <!-- HORIZONTAL && CAPACITY === 2 (1vs1) <player_2> -->
               <v-sheet class="d-flex flex-column flex-grow-1 text-center" :height="card_size_horizontal*6+'px'" v-if="screen_layout === 'horizontal' && room_info.capacity === 2 && all_players.player_2" :max-width="(window_width - card_size_horizontal*6) / 2">
                  <v-card width="100%" height="max-content">{{ all_players.player_2.score }}</v-card>
                  <v-sheet class="d-flex flex-column flex-grow-1" width="100%" color="primary">
                     <v-sheet class="mt-2 mb-2" height="40%">
                        <v-responsive height="100%" :aspect-ratio="1/1" class="red">
                           <v-img class="purple" height="100%" contain :src="require(`@/assets/img/rank/${all_players.player_2.rank}.png`)"></v-img>
                        </v-responsive>
                     </v-sheet>
                     <v-sheet class="d-flex flex-column flex-grow-1" width="100%" color="primary">
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card class="display-name text-truncate d-flex flex-row justify-center" style="font-size: 18px;" v-on="on" v-bind="attrs" @click="open_player_info(all_players.player_2)">
                                 {{ all_players.player_2.displayName }}
                                 <DisplayNameIcon :player-prop="all_players.player_2" />
                              </v-card>
                           </template>
                           <span>{{ all_players.player_2.displayName }}</span>
                        </v-tooltip>
                     </v-sheet>
                  </v-sheet>
               </v-sheet>
               
   <!-- HORIZONTAL && CAPACITY === 4 (2vs2) -->
               <v-sheet class="d-flex flex-column flex-grow-1 text-center" v-if="screen_layout === 'horizontal' && room_info.capacity === 4">
                  <v-card width="100%">{{ score_2 }}</v-card>
                  <v-sheet class="flex-grow-1">
                     <v-sheet v-if="all_players.player_3" class="d-flex flex-column">
                        <v-card class="flex-grow-1 d-flex flex-column text-center" height="50%">
                           <v-responsive :aspect-ratio="1/1" width="100%" max-width="100px" max-height="100px" class="ma-auto red">
                              <v-img :src="require(`@/assets/img/rank/${all_players.player_3.rank}.png`)"></v-img>
                           </v-responsive>
                        </v-card>
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card class="display-name text-truncate d-flex flex-row justify-center" v-on="on" v-bind="attrs" @click="open_player_info(all_players.player_3)">
                                 {{ all_players.player_3.displayName }} <DisplayNameIcon :player-prop="all_players.player_3" />
                              </v-card>
                           </template>
                           <span>{{ all_players.player_3.displayName }}</span>
                        </v-tooltip>
                     </v-sheet>
                     <v-sheet v-if="all_players.player_4" class="d-flex flex-column">
                        <v-card class="flex-grow-1 d-flex flex-column text-center" height="50%">
                           <v-responsive :aspect-ratio="1/1" width="100%" max-width="100px" max-height="100px" class="ma-auto red">
                              <v-img :src="require(`@/assets/img/rank/${all_players.player_4.rank}.png`)"></v-img>
                           </v-responsive>
                        </v-card>
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card class="display-name text-truncate d-flex flex-row justify-center" v-on="on" v-bind="attrs" @click="open_player_info(all_players.player_4)">
                                 {{ all_players.player_4.displayName }} <DisplayNameIcon :player-prop="all_players.player_4" />
                              </v-card>
                           </template>
                           <span>{{ all_players.player_4.displayName }}</span>
                        </v-tooltip>
                     </v-sheet>
                  </v-sheet>
               </v-sheet>

            </v-sheet>
         
<!--------------------------->
<!-- MIDDLE FOR VERTICAL ---->
<!--------------------------->

   <!-- VERTICAL && CAPACITY === 4 (2vs2) -->
            <v-sheet class="ma-0 pa-0 d-flex flex-row text-center" width="100%" height="max-content" color="green" v-if="screen_layout == 'vertical' && room_info.capacity === 4">
               <v-sheet width="50%">
                  <v-card>{{ score_1 }}</v-card>
                  <v-sheet class="d-flex" :class="(window_width < 600) ? 'flex-column' : 'flex-row'">

                     <v-card v-if="room_info.players.player_1" :width="(window_width < 600) ? '100%' : '50%'" class="d-flex flex-row">
                        <v-responsive v-if="window_width >= 600" :aspect-ratio="1/1" width="100%" max-width="50px" max-height="50px" class="ma-auto">
                           <v-img :src="require(`@/assets/img/rank/${all_players.player_1.rank}.png`)"></v-img>
                        </v-responsive>
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card class="display-name text-truncate d-flex flex-row justify-center" width="100%" v-bind="attrs" v-on="on" @click="open_player_info(all_players.player_1)">{{ all_players.player_1.displayName }} <DisplayNameIcon :player-prop="all_players.player_1" /></v-card>
                           </template>
                           <span>{{ all_players.player_1.displayName }}</span>
                        </v-tooltip>
                     </v-card>

                     <v-card v-if="room_info.players.player_2" :width="(window_width < 600) ? '100%' : '50%'" class="d-flex flex-row">
                        <v-responsive v-if="window_width >= 600" :aspect-ratio="1/1" width="100%" max-width="50px" max-height="50px" class="ma-auto">
                           <v-img :src="require(`@/assets/img/rank/${all_players.player_2.rank}.png`)"></v-img>
                        </v-responsive>
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card class="display-name text-truncate d-flex flex-row justify-center" width="100%" v-bind="attrs" v-on="on" @click="open_player_info(all_players.player_2)">{{ all_players.player_2.displayName }} <DisplayNameIcon :player-prop="all_players.player_2" /></v-card>
                           </template>
                           <span>{{ all_players.player_2.displayName }}</span>
                        </v-tooltip>
                     </v-card>

                  </v-sheet>
               </v-sheet>
               <v-sheet width="50%">
                  <v-card>{{ score_2 }}</v-card>
                  <v-sheet class="d-flex flex-row">

                     <v-card v-if="room_info.players.player_3" :width="(window_width < 600) ? '100%' : '50%'" class="d-flex flex-row">
                        <v-responsive v-if="window_width >= 600" :aspect-ratio="1/1" width="100%" max-width="50px" max-height="50px" class="ma-auto">
                           <v-img :src="require(`@/assets/img/rank/${all_players.player_3.rank}.png`)"></v-img>
                        </v-responsive>
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card class="display-name text-truncate d-flex flex-row justify-center" width="100%" v-bind="attrs" v-on="on" @click="open_player_info(all_players.player_3)">{{ all_players.player_3.displayName }} <DisplayNameIcon :player-prop="all_players.player_3" /></v-card>
                           </template>
                           <span>{{ all_players.player_3.displayName }}</span>
                        </v-tooltip>
                     </v-card>

                     <v-card v-if="room_info.players.player_4" :width="(window_width < 600) ? '100%' : '50%'" class="d-flex flex-row">
                        <v-responsive v-if="window_width >= 600" :aspect-ratio="1/1" width="100%" max-width="50px" max-height="50px" class="ma-auto">
                           <v-img :src="require(`@/assets/img/rank/${all_players.player_4.rank}.png`)"></v-img>
                        </v-responsive>
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card class="display-name text-truncate d-flex flex-row justify-center" width="100%" v-bind="attrs" v-on="on" @click="open_player_info(all_players.player_4)">{{ all_players.player_4.displayName }} <DisplayNameIcon :player-prop="all_players.player_4" /></v-card>
                           </template>
                           <span>{{ all_players.player_4.displayName }}</span>
                        </v-tooltip>
                     </v-card>

                  </v-sheet>
               </v-sheet>
            </v-sheet>
   <!-- VERTICAL && CAPACITY === 2 (1vs1) -->
            <v-sheet class="ma-0 pa-0 d-flex flex-row text-center" width="100%" color="green" v-if="screen_layout == 'vertical' && room_info.capacity === 2">
      <!-- player_1 -->
               <v-sheet width="50%" v-if="all_players.player_1">
                  <v-sheet class="d-flex flex-row" height="100%">
                     <v-responsive max-width="60px" :aspect-ratio="1/1">
                        <v-img :src="require(`@/assets/img/rank/${all_players.player_1.rank}.png`)"></v-img>
                     </v-responsive>
                     <v-sheet class="d-flex flex-column" height="100%" width="100%" color="primary">
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card height="50%" class="display-name text-truncate d-flex flex-row justify-center" style="font-size: 18px;" v-on="on" v-bind="attrs" @click="open_player_info(all_players.player_1)">
                                 {{ all_players.player_1.displayName }}
                                 <DisplayNameIcon :player-prop="all_players.player_1" />
                              </v-card>
                           </template>
                           <span>{{ all_players.player_1.displayName }}</span>
                        </v-tooltip>
                        <v-card height="50%">{{ all_players.player_1.score }}</v-card>
                     </v-sheet>
                  </v-sheet>
               </v-sheet>
      <!-- player_2 -->
               <v-sheet width="50%" v-if="all_players.player_2">
                  <v-sheet class="d-flex flex-row" height="100%">
                     <v-responsive max-width="60px" :aspect-ratio="1/1">
                        <v-img :src="require(`@/assets/img/rank/${all_players.player_2.rank}.png`)"></v-img>
                     </v-responsive>
                     <v-sheet class="d-flex flex-column" height="100%" width="100%" color="primary">
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card height="50%" class="display-name text-truncate d-flex flex-row justify-center" style="font-size: 18px;" v-on="on" v-bind="attrs" @click="open_player_info(all_players.player_2)">
                                 {{ all_players.player_2.displayName }}
                                 <DisplayNameIcon :player-prop="all_players.player_2" />
                              </v-card>
                           </template>
                           <span>{{ all_players.player_2.displayName }}</span>
                        </v-tooltip>
                        <v-card height="50%">{{ all_players.player_2.score }}</v-card>
                     </v-sheet>
                  </v-sheet>
               </v-sheet>

            </v-sheet>
          
         </v-sheet>

         <v-sheet ref="chat_wrapper" class="bottom-wrapper flex-grow-1 d-flex flex-column" style="overflow:auto;" :height="chat_height">
            <v-sheet style="overflow:auto;" color="#303030" class="d-flex flex-column flex-grow-1 pa-1" v-chat-scroll="{always: false}">
            <div v-for="(chat, ind) in room_chat" :style="chat.chat_style" :key="chat+ind" :height="chat_height">
               {{
                  (chat.chat_sender) ?
                     chat.chat_sender + ' : ' + chat.chat_val :
                     chat.chat_val
               }}
            </div>
            </v-sheet>
         </v-sheet>
         <v-sheet ref="bottom_wrapper" class="chat-form d-flex pa-0" height="40px">
            <v-text-field @keydown="enable_enter($event)" v-model="chat_value" class="pa-0 ma-0" style="font-size:18px;" width="80%" autocomplete="off" dense filled hide-details single-line outlined solo></v-text-field>
            <v-btn @click="chatting()" width="20%" height="100%" :disabled="chat_button_disabled">enter</v-btn>
         </v-sheet>
      </v-sheet>
      <BottomSheet :show-comp="leave_confirm" @closeSheet="leave_confirm = false;" />
      <v-dialog v-model="player_info_dialog" class="pa-0 ma-0" overlay-opacity="0.9" :width="window_width <= 600 ? '100%' : '60%'">
         <PlayerInfo v-if="player_info_dialog" :player-info="player_info_prop" :img-size="window_width / 6 + 'px'" @player-info-dialog-close="player_info_dialog = false" />
      </v-dialog>
   </v-sheet>
</template>

<script>
import CardSet from "@/components/CardSet.vue"
import BottomSheet from "@/components/BottomSheet.vue";
import PlayerInfo from "@/components/PlayerInfo.vue";
import EndGameScreen from "@/components/EndGameScreen.vue";
import DisplayNameIcon from "@/components/DisplayNameIcon.vue";

export default {
   name: "CustomGame",
   components: { BottomSheet, CardSet, PlayerInfo, EndGameScreen, DisplayNameIcon },
   data: () => ({
      leave_confirm: false,
      chat_value: '',
      chat_button_disabled: false,
      player_info_dialog: false,
      player_info_prop: null,
      isMounted: false,
      player_info_dialog: false,
      player_info_prop: null
   }),
   computed: {
      score_1() {
         if (this.room_info.capacity === 4 || 6) {return this.room_info.team_1_score}
         return this.room_info.players.player_1.score
      },
      score_2() {
         if (this.room_info.capacity === 4 || 6) {return this.room_info.team_2_score}
         return this.room_info.players.player_2.score
      },
      card_size_horizontal() {
         return (this.window_height * 0.7) / 6;
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
      chat_height() {
         if (!this.isMounted) {return}
         this.window_width;
         let top_wrapper_height = this.$refs.top_wrapper.$el.clientHeight;
         let middle_wrapper_height = this.$refs.middle_wrapper.$el.clientHeight;
         let bottom_wrapper_height = this.$refs.bottom_wrapper.$el.clientHeight;
         return this.window_height - top_wrapper_height - middle_wrapper_height - bottom_wrapper_height + 'px';
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
      },
      show_endGameScreen() {
         return this.$store.state.general.end_game_screen;
      },
   },
   methods: {
      open_player_info(player) {
         this.player_info_dialog = true;
         this.player_info_prop = player;
      },
      chatting(){
         if (!this.chat_value || this.chat_button_disabled) return;
         let room_number = this.room_number;
         let my_display_name = this.my_display_name;
         let chat_value = this.chat_value;

         window.socket.emit('send-chat', { room_number, my_display_name, chat_value });
         this.$store.commit('room/MY_ROOM_CHAT', { chat_value });
         this.chat_value = '';
         this.chat_button_disabled = true;
         setTimeout( () => {
            this.chat_button_disabled = false;
         }, 1000);
      },
      enable_enter(e){
         if (e.key === 'Enter' || e.keyCode === 13) {
            this.chatting();
         }
      },
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
   mounted() {
      this.isMounted = true;
   },
   destroyed() {
      this.$store.commit('room/ROOM_TYPE', '');
      this.$store.commit("general/CLOSE_END_GAME_SCREEN");
   }
   
};
</script>

<style lang="scss" scoped>

.display-name {
   cursor: pointer;
   font-weight: bold;
   &:hover {
      text-shadow: 0 0 3px white;
   }
}

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