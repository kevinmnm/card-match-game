<template>
   <v-container class="text-center pa-0" fluid style="height:100%">
      <!-- <v-img class="d-lg-none" width="100%" contain :src="require('@/assets/img/main/theme.gif')" max-height="50%"></v-img> -->
      <v-img width="100%" contain :src="require('@/assets/img/main/theme.gif')" max-height="50%" class="mb-2"></v-img>
      <v-row class="d-md">
         <v-col cols="6" class="col-sm-3">
            <v-btn width="140px" disabled>ranked game</v-btn>
         </v-col>
         <v-col cols="6" class="col-sm-3">
            <v-btn width="140px" disabled>create game</v-btn> 
         </v-col>
         <v-col cols="6" class="col-sm-3">
            <v-btn width="140px" disabled>join game</v-btn>
         </v-col>
         <v-col cols="6" class="col-sm-3">
            <v-btn width="140px" @click="quickGame()" :disabled="loading_comp">quick game</v-btn>
         </v-col>
      </v-row>
      <Loading v-show="loading_comp">
         <template v-slot:text>
            {{ loading_text }}
         </template>
      </Loading>
      <v-spacer></v-spacer>

      <v-btn style="position:absolute; right:0; bottom:201px;" @click="show_my_info = true;">
         <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-dialog v-model="show_my_info">
         <MyInfo @hide-my-info="show_my_info = false;" />
      </v-dialog>

      <div class="all-chat-wrapper">
         <div class="all-chat-title">GLOBAL CHAT</div>
         <div class="all-chat" v-chat-scroll="{always: false}">
            <div 
               v-for="(chat, ind) in all_global_chats" 
               :key="chat + ind"
               :style="chat.style"
            >
               {{
                  (chat.type === 'all-other-chat') ? 
                     chat.displayName + ' : ' + chat.chat :
                     chat.chat
               }}
            </div>
         </div>
         <div class="all-chat-input-wrapper">
            <!-- <v-text-field @keydown="enter_pressed($event)" class="all-chat-input ma-0 pa-0" background-color="red" height="20px" v-model="global_chat" filled outlined hide-details dense></v-text-field> -->
            <input @keydown="enter_pressed($event)" v-model="global_chat" type="text" class="all-chat-input" />
            <button @click="global_chat_enter()" class="all-chat-enter ma-0 pa-0" :disabled="enter_button_disabled">
               {{ enter_button }}
            </button>
         </div>
      </div>
   </v-container>
</template>

<script>
import Loading from "@/components/Loading.vue";
import MyInfo from "@/components/MyInfo.vue";

export default {
   name: "IdleRoomChild",
   components: {
      Loading, MyInfo
   },
   data(){
      return{
         loading_comp: false,
         loading_text: 'Searching...',
         enter_button: 'ENTER',
         enter_button_disabled: false,
         global_chat: '',
         show_my_info: false
      }
   },
   computed: {
      my_display_name() {
         return this.$store.state.general.my_display_name;
      },
      all_global_chats() {
         return this.$store.state.chat.global_chat; // []
      }
   },
   methods: {
      quickGame(){
         this.loading_comp = true;
         window.socket.emit('quick-game');
      },
      global_chat_enter(){
         if (!this.global_chat) return;

         window.socket.emit('global-chat', { 
            type: 'all-other-chat',
            displayName: this.my_display_name, 
            chat: this.global_chat, 
            style: {
               position: 'relative',
               'font-size': '14px',
               width: '100%',
               padding: '2px',
               'text-align': 'left'
            } 
         });
         
         this.$store.commit("chat/GLOBAL_CHAT", {
            type: 'all-my-chat',
            displayName: this.my_display_name,
            chat: this.global_chat,
            style: {
               position: 'relative',
               'font-size': '14px',
               width: '100%',
               padding: '2px',
               'text-align': 'right'
            }     
         });
         this.global_chat = '';
      },
      enter_pressed(e){
         if (e.key === 'Enter' || e.keyCode === 13) {
            this.global_chat_enter();
         }
      }
   },
   mounted() {
      window.socket.emit('join-global-room');
   },
   destroyed() {
      window.socket.emit('leave-global-room');
   }
};
</script>

<style lang="scss" scoped>
$text-field-border-radius: 0;
   .all-chat-wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      min-height: 200px;
      background: green;

      .all-chat-title {
         position: relative;
         height: 25px;
         width: 100%;
         background: yellow;
      }

      .all-chat {
         position: absolute;
         height: calc(100% - 50px);
         width: 100%;
         background: grey;
         overflow-y: auto;
         bottom: 25px;
      }

      .all-chat-input-wrapper {
         position: absolute;
         bottom: 0;
         padding: 0;
         margin: 0;
         width: 100%;
         height: 25px;
         display: flex;
         flex-direction: row;
         background: pink;

         .all-chat-input {
            width: 80%;
            background: white;
            padding-left: 3px;
         }

         .all-chat-enter {
            width: 20%;
         }
      }
   }
</style>>