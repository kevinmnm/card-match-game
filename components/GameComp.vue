<template>
   <v-sheet
      style="position: absolute; top:0; left:0;"
      class="ma-0 pa-0"
      tag="div"
      width="100%"
      height="100%"
   >
      <v-img
         height="100%"
         width="100%"
         style="position:absolute; left:0; top:0;"
         :src="require('@/assets/img/main/sky.png')"
      >
         <v-sheet
            class="ma-0 pa-0 d-flex flex-column align-center justify-center"
            width="100%"
            height="100%"
            tag="div"
            style="background: transparent;"
         >
            <!-- Title Bar -->
            <v-card 
               class="pa-0 ma-0 d-flex flex-row text-center flex-wrap"
               style="font-size:16px;"
               :width="room_title_width"
               height="25px"
               flat
               tile
            >

               <v-card width="80%" class="pa-0 ma-0" flat tile color="red">

                  <v-menu v-if="!room_info.start" :close-on-content-click="false" min-width="30px" transition="fab-transition" auto offset-y>
                     <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" style="position:absolute; left:0; cursor:pointer; height:100%; background:transparent;" color="#404040">mdi-cog</v-icon>
                     </template>
                     <v-sheet class="d-flex flex-column justify-space-between pa-3">
                        <v-card>
                           <v-card-text>Sound</v-card-text>
                           <v-slider></v-slider>
                        </v-card>
                        <v-card class="ma-auto">
                           <v-card-text>Music</v-card-text>
                        </v-card>
                     </v-sheet>
                  </v-menu>

                  <v-card v-else class="font-weight-bold" color="yellow" style="position:absolute; left:0;" width="30px" height="100%">{{ countdown_time }}</v-card>

                  <div>{{ room_number }}</div>

               </v-card>
               <v-btn width="20%" tile style="font-size:16px;" height="100%" @click="confirm_leave()">leave</v-btn>

            </v-card>

            <v-sheet
               class="ma-0 pa-0 d-flex align-center justify-center"
               :class="flex_direction"
               width="100%"
               tag="div"
               style="background: transparent;"
            >
            
               <!-- Card Board -->
               <v-sheet
                  :width="board_card_size"
                  :height="board_card_size"
                  class="pa-0 ma-0 d-flex flex-wrap"
                  style="position:relative;"
               >
                  
                  <CardSet :my-turn="my_turn" />

                  <v-fade-transition v-if="!room_info.start">
                     <CardOverlay />
                  </v-fade-transition>

               </v-sheet>

               <!-- Info Board -->
               <v-sheet
                  :style="
                     [
                        ($vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm') ? {width: board_card_size, height: 'calc(100% - 360px)'} 
                        : ($vuetify.breakpoint.name === 'md') ? {height: board_card_size} 
                        : {height: board_card_size},
                     ]
                  "
                  class="d-flex flex-column flex-wrap"
                  :width="board_info_size"
                  :height="board_info_size"
                  color="green"
               >
                  <!-- Players info of info-board -->
                  <v-sheet :height="card_size" class="d-flex flex-row pa-0 ma-0" width="100%">

                     <v-sheet v-for="(player, ind) in Object.values(all_players)" :key="player + ind" width="50%" class="d-flex flex-row pa-0 ma-0 font-weight-bold">
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-card class="pa-0 ma-0" :width="card_size" color="yellow" v-bind="attrs" v-on="on">
                                 <v-img :src="require(`~/assets/img/rank/${player.rank}.png`)"></v-img>
                              </v-card>
                           </template>
                           <span>{{ player.guest ? 'STONE' : player.rank }}</span>
                        </v-tooltip>
                           <v-sheet class="d-flex flex-column pa-0 ma-0 flex-grow-1 text-center">
                              <v-hover v-slot="{ hover }">
                                 <v-card class="pa-0 ma-0 align-center d-flex" width="100%" height="50%" color="grey" style="cursor:pointer;" @click="open_player_info(player)" :class="{ 'on-hover': hover, 'text-shadow': hover }">
                                    <div class="ma-auto">{{ player.displayName }}</div>
                                 </v-card>
                              </v-hover>
                           <v-card class="pa-0 ma-0 d-flex flex-row" height="50%" color="red" style="font-size:20px;">
                              <div class="flex-grow-1 align-self-center">{{ player.score }}</div>
                              <div class="align-center d-flex text-left" style="position:absolute; right:0; height:100%; width: 30%;">

                                 <div class="font-weight-medium animate__animated animate__fadeOutUp" style="position: absolute; left:0; background:green;" :key="player.score">
                                    {{ +10 }}
                                 </div>

                              </div>
                           </v-card>
                        </v-sheet>
                     </v-sheet>

                  </v-sheet>

                  <!-- Chat of info-board -->
                  <v-sheet class="d-flex flex-column flex-grow-1" style="overflow:auto;">
                     <!-- <v-sheet style="overflow:auto;" color="#303030" class="d-flex flex-column flex-grow-1 pa-1" min-height="100px" :max-height="chat_max_height" v-chat-scroll="{always: false}"> -->
                     <v-sheet style="overflow:auto;" color="#303030" class="d-flex flex-column flex-grow-1 pa-1" :height="chat_max_height" v-chat-scroll="{always: false}">

                        <div v-for="(chat, ind) in room_chat" :style="chat.chat_style" :key="chat+ind">
                           {{
                              (chat.chat_sender) ?
                                 chat.chat_sender + ' : ' + chat.chat_val :
                                 chat.chat_val
                           }}
                        </div>

                     </v-sheet>
                     <v-sheet class="chat-form d-flex pa-0" height="40px">
                        <v-text-field @keydown="enable_enter($event)" v-model="chat_value" class="pa-0 ma-0" style="font-size:18px;" width="80%" autocomplete="off" dense filled hide-details single-line outlined solo></v-text-field>
                        <v-btn @click="chatting()" width="20%" height="100%" :disabled="chat_button_disabled">enter</v-btn>
                     </v-sheet>
                  </v-sheet>

               </v-sheet>
            </v-sheet>

         </v-sheet>
      </v-img>
      <v-dialog v-model="player_info_dialog" class="pa-0 ma-0" overlay-opacity="0.8" :width="window_inner_width <= 600 ? '100%' : '60%'">
         <PlayerInfo v-if="player_info_dialog" :player-info="player_info_prop" :img-size="card_size" @player-info-dialog-close="player_info_dialog = false" />
      </v-dialog>
      <BottomSheet :show-comp="leave_confirm" @closeSheet="leave_confirm = false;" />
   </v-sheet>
</template>

<script>
import BottomSheet from "@/components/BottomSheet.vue";
import CardOverlay from "@/components/CardOverlay.vue";
import CardSet from "@/components/CardSet.vue";
import PlayerInfo from "@/components/PlayerInfo.vue";

export default {
   name: "GameComp",
   components: { BottomSheet, CardOverlay, CardSet, PlayerInfo },
   data() {
      return {
         chat_max_height_updater: 0,
         leave_confirm: false,
         chat_value: '',
         chat_button_disabled: false,
         player_info_dialog: false,
         player_info_prop: null
      }
   },
   computed: {
      window_inner_height() {
         this.chat_max_height_updater;
         return window.innerHeight;
      },
      window_inner_width() {
         this.chat_max_height_updater;
         return window.innerWidth;
      },
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
      room_info() {
         return this.$store.state.room.room_info;
      },
      room_number() {
         return this.$store.state.room.room_info.room_number;
      },
      all_players() { // Object;
         return this.$store.state.room.room_info.players;
      },
      room_title_width(){
         if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
            return this.board_card_size
         } else {
            return '100%'
         }
      },
      chat_max_height(){
         this.chat_max_height_updater;

         if (this.$vuetify.breakpoint.name === 'xs') {
            if (window.innerHeight <= 650) {
               return '100px'
            } else {
               return '180px'
            }
         } else if (this.$vuetify.breakpoint.name === 'sm') { // Width 600 to 960;
            if (window.innerHeight <= 960) {
               // return '100px'
               // return +this.board_info_size.replace('px','') - +this.card_size.replace('px','') - 40 + 'px'
               // return (+this.board_card_size.replace('px','') - (+this.card_size.replace('px','') * 7)) - 40 + 'px';
               return this.window_inner_height - 25 - (+this.card_size.replace('px','') * 7) - 40 + 'px';
            } else {
               // return '180px'
               // return +this.board_info_size.replace('px','') - +this.card_size.replace('px','') - 40 + 'px'
               // return (+this.board_card_size.replace('px','') - (+this.card_size.replace('px','') * 7)) - 40 + 'px';
               return this.window_inner_height - 25 - (+this.card_size.replace('px','') * 7) - 40 + 'px';
            }
         } else { // Will change to vertical view (md);
            // return 500 - 40 + 'px'
            return +this.board_card_size.replace('px','') - +this.card_size.replace('px','') - 40 + 'px';
         }
      },
      flex_direction() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs": // < 600px -- 60px
               return "flex-column"; 
            case "sm": // 600px > < 960px -- 80px
                return "flex-column"; 
            case "md": // 960px > < 1264px* -- 100px
               return "flex-row"; 
            case "lg": // 1264px > < 1904px* -- 100px
               return "flex-row"; 
            case "xl": // > 1904px* -- 100px
               return "flex-row"; 
         }
      },
      board_card_size() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return "360px"; // < 600px -- 60px
            case "sm":
               // return "600px"; // 600px > < 960px -- 80px
               return "480px"
            case "md":
               return "600px"; // 960px > < 1264px* -- 100px
            case "lg":
               return "720px"; // 1264px > < 1904px* -- 100px
            case "xl":
               return "720px"; // > 1904px* -- 100px
         }
      },
      board_info_size() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return "calc(100% - 360px)"; // < 600px -- 60px
            case "sm":
               // return "calc(100% - 600px)"; // 600px > < 960px -- 80px
               return "calc(100% - 480px)"
            case "md":
               return "calc(100% - 600px)"; // 960px > < 1264px* -- 100px
            case "lg":
               return "calc(100% - 720px)"; // 1264px > < 1904px* -- 100px
            case "xl":
               return "calc(100% - 720px)"; // > 1904px* -- 100px
         }
      },
      card_size() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return "60px"; // < 600px -- 60px
            case "sm":
               // return "100px"; // 600px > < 960px -- 80px
               return "80px"
            case "md":
               return "100px"; // 960px > < 1264px* -- 100px
            case "lg":
               return "120px"; // 1264px > < 1904px* -- 100px
            case "xl":
               return "120px"; // > 1904px* -- 100px
         }
      },
      countdown_time() {
         return this.$store.state.card.countdown;
      },
      game_started() {
         return this.$store.state.room.room_info.start;
      }
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
      chat_max_height_updater_handler() {
         this.chat_max_height_updater++
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
   created() {
      window.addEventListener('resize', this.chat_max_height_updater_handler);
   },
   destroyed() {
      window.removeEventListener('resize', this.chat_max_height_updater_handler);
      this.$store.commit('room/ROOM_TYPE', '');
      this.$store.commit("general/CLOSE_END_GAME_SCREEN");
   },
};
</script>

<style scoped>

.text-shadow {
   text-shadow: 0 0 3px white;
}

.my-chat {
   text-align: right;
   border: 1px solid blue;
}

.opponent-chat {
   text-align: left;
   border: 1px solid red;
}

</style>
