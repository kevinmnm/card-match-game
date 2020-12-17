<template>
   <v-sheet
      style="position: absolute"
      class="ma-0 pa-0"
      tag="div"
      width="100%"
      height="100%"
   >
      <v-img
         height="100%"
         width="100%"
         :src="require('@/assets/img/main/sky.png')"
      >
         <v-sheet
            class="ma-0 pa-1 d-flex flex-column align-center justify-center"
            width="100%"
            height="100%"
            tag="div"
            style="background: transparent;"
         >
            <v-card 
               class="pa-0 ma-0 d-flex flex-row text-center"
               style="font-size:16px"
               :width="room_title_width"
               height="25px"
               flat
               tile
            >
               <v-card width="80%" class="pa-0 ma-0" flat tile color="red">room title</v-card>
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
                  <v-card class="pa-0 ma-0" flat v-for="all in 36" :key="all" :width="card_size" :height="card_size" color="primary"></v-card>
                  <!-- <div style="background:green; position: absolute; left:0; top:0; width:100%; height:100%">sdf</div> -->
                  <v-fade-transition>
                     <div class="card-board-overlay d-flex justify-center align-center" v-if="!game_started">
                        <v-card :width="card_size" :height="card_size">5</v-card>
                     </div>
                  </v-fade-transition>

               </v-sheet>

               <!-- Info Board -->
               <v-sheet
                  :style="
                     ($vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm') ? {width: board_card_size, height: 'calc(100% - 360px)'} 
                     : ($vuetify.breakpoint.name === 'md') ? {height: board_card_size, width: 'calc(100% - 600px)'} 
                     : {height: board_card_size, width: 'calc(100% - 720px)'}
                  "
                  class="d-flex flex-column flex-wrap"
               >
                  <!-- Players info of info-board -->
                  <v-sheet :height="card_size" class="d-flex flex-row pa-0 ma-0" width="100%">
                     <v-sheet v-for="(player, ind) in Object.values(all_players)" :key="player + ind" width="50%" class="d-flex flex-row pa-0 ma-0 font-weight-bold">
                        <v-card class="pa-0 ma-0" :width="card_size" color="yellow">rank icon1</v-card>
                        <v-sheet class="d-flex flex-column pa-0 ma-0 flex-grow-1 text-center" color="green">
                           <v-card class="pa-0 ma-0" height="50%" color="grey">{{ player.displayName }}</v-card>
                           <v-card class="pa-0 ma-0" height="50%" color="red">{{ player.score }}</v-card>
                        </v-sheet>
                     </v-sheet>
                  </v-sheet>

                  <!-- Chat of info-board -->
                  <v-sheet style="overflow:auto;" color="#303030" class="d-flex flex-column flex-grow-1 pa-1" min-height="100px" :max-height="chat_max_height" v-chat-scroll="{always: false}">
                     <!-- 
                     <div class="my-chat"></div>
                     <div class="opponent-chat"></div> 
                     <div class="system-chat"></div>
                     -->
                     <div v-for="(chat, ind) in room_chat" :style="chat.chat_style" :key="chat+ind">
                        {{
                           (chat.chat_sender) ?
                              chat.chat_sender + ' : ' + chat.chat_val :
                              chat.chat_val
                        }}
                     </div>

                  </v-sheet>
                  <v-sheet class="chat-form d-flex pa-0">
                     <v-text-field @keydown="enable_enter($event)" v-model="chat_value" class="pa-0 ma-0" style="font-size:18px;" width="80%" autocomplete="off" dense filled hide-details single-line outlined></v-text-field>
                     <v-btn @click="chatting()" width="20%" height="100%" :disabled="chat_button_disabled">enter</v-btn>
                  </v-sheet>

               </v-sheet>
            </v-sheet>

         </v-sheet>
      </v-img>
      <BottomSheet :show-comp="leave_confirm" @closeSheet="leave_confirm = false;" />
   </v-sheet>
</template>

<script>
import BottomSheet from "@/components/BottomSheet.vue";

export default {
   name: "GameComp",
   components: { BottomSheet },
   data() {
      return {
         chat_max_height_updater: 0,
         leave_confirm: false,
         chat_value: '',
         chat_button_disabled: false,
         game_started: false
      }
   },
   computed: {
      room_chat() {
         // return this.$store.state.room.room_chat.join('');
         return this.$store.state.room.room_chat;
      },
      room_number() {
         return this.$store.state.room.room_info.room_number;
      },
      all_players() {
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
         } else if (this.$vuetify.breakpoint.name === 'sm') {
            if (window.innerHeight <= 960) {
               return '100px'
            } else {
               return '180px'
            }
         }
      },
      chat_height(){
         return this.card_size / 2;
      },
      flex_direction() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return "flex-column"; // < 600px -- 60px
            case "sm":
               return "flex-column"; // 600px > < 960px -- 80px
            case "md":
               return "flex-row"; // 960px > < 1264px* -- 100px
            case "lg":
               return "flex-row"; // 1264px > < 1904px* -- 100px
            case "xl":
               return "flex-row"; // > 1904px* -- 100px
         }
      },
      board_card_size() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return "360px"; // < 600px -- 60px
            case "sm":
               return "600px"; // 600px > < 960px -- 80px
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
               return "calc(100% - 600px)"; // 600px > < 960px -- 80px
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
               return "100px"; // 600px > < 960px -- 80px
            case "md":
               return "100px"; // 960px > < 1264px* -- 100px
            case "lg":
               return "120px"; // 1264px > < 1904px* -- 100px
            case "xl":
               return "120px"; // > 1904px* -- 100px
         }
      },
      my_display_name(){
         return this.$store.state.general.my_display_name; // || user display name;
      },
      countdown_time() {
         return this.$store.state.room.room_info.countdown
      }
   },
   methods: {
      start_game(){
         this.game_started = true;
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
         this.leave_confirm = true;
      }
   },
   created() {
      window.addEventListener('resize', this.chat_max_height_updater_handler);
   },
   destroyed() {
      window.removeEventListener('resize', this.chat_max_height_updater_handler);
   },
   mounted() {
      console.log(this.all_players)
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

.my-chat {
   text-align: right;
   border: 1px solid blue;
}

.opponent-chat {
   text-align: left;
   border: 1px solid red;
}

</style>
