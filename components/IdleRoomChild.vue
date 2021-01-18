<template>
   <v-container class="text-center pa-0 d-flex flex-column" fluid style="height: 100%">
      <!-- <v-img class="d-lg-none" width="100%" contain :src="require('@/assets/img/main/theme.gif')" max-height="50%"></v-img> -->
      <!-- <v-img
         width="100%"
         contain
         :src="require('@/assets/img/main/theme.gif')"
         max-height="25%"
         class="mb-2"
         ref="child_img"
      ></v-img> -->

<!-- TOP -->
      <v-sheet class="main-title d-flex flex-column align-center justify-center" width="100%" height="20%" outlined>
         <v-card class="title" flat color="transparent white--text">MONSTER MATCHES</v-card>
         <v-card class="caption" flat color="transparent white--text">- Under Development -</v-card>
      </v-sheet>

<!-- MIDDLE -->
      <v-sheet class="d-flex flex-row" width="100%" height="calc(80% - 230px)">
         <v-sheet v-if="!my_display_name.toLowerCase().includes('guest') && my_friend_array.length > 0" width="40%">
            <FriendList :key="refresh_friend_list"/>
         </v-sheet>
         <v-sheet v-else class="caption d-flex flex-column align-center justify-center" width="40%" height="100%" outlined color="classic white--text">
            <div class="mb-3" style="font-size:20px;">😭</div>
            <div class="mb-3">NO FRIENDS</div>
            <v-btn v-if="my_display_name.toLowerCase().includes('guest')" class="caption" @click="refresh_page()" color="#adff2f" x-small text>Signup</v-btn>
         </v-sheet>
         <v-sheet class="d-flex flex-column align-center justify-space-around" width="20%">

            <v-sheet class="flex-grow-1" width="100%">
               <v-btn v-if="window_width > 350" width="100%" :small="window_width < 450" height="100%" tile disabled>ranked</v-btn>
               <v-btn v-else width="100%" :small="window_width < 400" height="100%" tile disabled>
                  <v-icon>mdi-sword-cross</v-icon>
               </v-btn>
            </v-sheet>
            
            <v-sheet class="flex-grow-1" width="100%">
               <v-dialog v-model="create_room_dialog">
                  <template v-slot:activator="{ on, attrs }">
                     <v-btn 
                        v-if="window_width > 350"
                        v-bind="attrs"
                        v-on="on"
                        width="100%" 
                        height="100%"
                        @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')"
                        :small="window_width < 400"
                        tile
                     >
                        create
                     </v-btn>
                     <v-btn
                        v-else
                        v-bind="attrs"
                        v-on="on"
                        width="100%"
                        :small="window_width < 400" 
                        height="100%"
                        tile
                     >
                        <v-icon>mdi-folder-plus</v-icon>
                     </v-btn>
                  </template>
                  <CreateRoom @close-create-room-dialog="create_room_dialog = false, create_room_key++" :key="create_room_key" />
               </v-dialog>
            </v-sheet>
            
            <v-sheet class="flex-grow-1" width="100%">
               <v-btn 
                  v-if="window_width > 350"
                  width="100%" 
                  @click="open_custom_dialog()" 
                  :loading="$store.state.custom.loading" 
                  @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')" 
                  :small="window_width < 400" 
                  height="100%"
               >
                  join
               </v-btn>
               <v-btn 
                  v-else
                  width="100%" 
                  @click="open_custom_dialog()" 
                  :loading="$store.state.custom.loading" 
                  :small="window_width < 400" 
                  height="100%"
               >
                  <v-icon>mdi-folder-search</v-icon>
               </v-btn>
            </v-sheet>

            <v-sheet class="flex-grow-1" width="100%">
               <v-btn
                  v-if="window_width > 350"
                  width="100%"
                  height="100%"
                  @click="quickGame()"
                  @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')"
                  :disabled="loading_comp"
                  :small="window_width < 400"
               >
                  quick
               </v-btn>
               <v-btn
                  v-else
                  width="100%"
                  height="100%"
                  @click="quickGame()"
                  @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')"
                  :disabled="loading_comp"
                  :small="window_width < 400"
               >
                  <v-icon>mdi-flash</v-icon>
               </v-btn>

            </v-sheet>

         </v-sheet>
         <v-sheet width="40%">
            <RankList />
         </v-sheet>
      </v-sheet>



       <!-- <v-row>
         <v-col cols="6" class="col-sm-3">
            <v-btn width="100%" disabled>ranked</v-btn>
         </v-col>
         <v-col cols="6" class="col-sm-3">
            <v-dialog v-model="create_room_dialog">
               <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                     v-bind="attrs"
                     v-on="on"
                     width="100%" 
                     @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')"
                  >
                     create
                  </v-btn>
               </template>
               <CreateRoom @close-create-room-dialog="create_room_dialog = false, create_room_key++" :key="create_room_key" />
            </v-dialog>
         </v-col>
         <v-col cols="6" class="col-sm-3">
            <v-btn width="100%" @click="open_custom_dialog()" :loading="$store.state.custom.loading" @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')">join</v-btn>
         </v-col>
         <v-col cols="6" class="col-sm-3">
            <v-btn
               width="100%"
               @click="quickGame()"
               @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')"
               :disabled="loading_comp"
               plain
            >
               quick
            </v-btn>
         </v-col>
      </v-row> -->


      <!-- <v-sheet class="" width="100%" height="20%" color="primary">

      </v-sheet>
      <v-sheet class="d-flex flex-row flex-wrap justify-center" width="100%">
         <v-sheet width="35%" height="100%" color="grey">

         </v-sheet>
         <v-sheet width="30%">
            <v-sheet class="d-flex flex-row flex-wrap" width="100%" height="100%" color="red">
               <v-btn width="100%">ranked</v-btn>
               <v-btn width="100%">ranked</v-btn>
               <v-btn width="100%">ranked</v-btn>
               <v-btn width="100%">ranked</v-btn>
            </v-sheet>
         </v-sheet>
         <v-sheet width="35%" height="100%" color="green">

         </v-sheet> 
      </v-sheet>-->
      <Loading v-show="loading_comp">
         <template v-slot:text>
            {{ loading_text }}
         </template>
      </Loading>

      <!-- <v-dialog v-model="custom_dialog" persistent fullscreen>
         <v-btn plain class="ma-0 pa-0" style="top:0; right:0;" text width="50px" height="50px" absolute @click="$store.commit('custom/SHOW_CUSTOM_DIALOG', false)">
            <v-icon class="ma-0 pa-0" color="red" x-large>mdi-close-box</v-icon>
         </v-btn>
         <RoomList />
      </v-dialog> -->

      <div class="custom-dialog d-flex flex-column justify-center" v-if="custom_dialog">
         <v-btn plain class="ma-0 pa-0" style="top:0; left:0;" text width="50px" height="50px" absolute>
            <v-icon class="ma-0 pa-0" color="primary" x-large @click="$store.dispatch('custom/fetch_custom_room_list')">mdi-reload</v-icon>
         </v-btn>
         <v-btn plain class="ma-0 pa-0" style="top:0; right:0;" text width="50px" height="50px" absolute @click="$store.commit('custom/SHOW_CUSTOM_DIALOG', false)">
            <v-icon class="ma-0 pa-0" color="red" x-large>mdi-close-box</v-icon>
         </v-btn>
         <RoomList @update-room-list-comp="$store.commit('custom/SHOW_CUSTOM_DIALOG', false)" />
      </div>

   <!-- VOLUME/SOUND BAR -->
      <v-card
         class="d-flex flex-row"
         style="position: absolute; right: 0; bottom: 201px"
         width="100%"
         ref="child_volume"
      >
         <AudioControl />

         <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
               <v-btn class="flex-grow-1" @click="show_my_info = true" v-bind="attrs" v-on="on" small>
                  <v-icon>mdi-account</v-icon>
               </v-btn>
            </template>
            <span>My Info</span>
         </v-tooltip>

      </v-card>

      <v-dialog v-model="show_my_info" persistent>
         <MyInfo @hide-my-info="show_my_info = false" />
      </v-dialog>

<!-- GLOBAL CHAT -->
      <v-sheet ref="child_chat" class="all-chat-wrapper ma-auto" width="100%">
         <div class="all-chat-title">
            <div
               class="text-left pl-1 pr-1"
               style="block-size: min-content; height: 100%; background: red"
            >
               LOBBY
            </div>
            <div class="text-center flex-grow-1">
               <v-dialog width="60%">
                  <template v-slot:activator="{ on, attrs }">
                     <v-btn
                        v-bind="attrs"
                        v-on="on"
                        height="100%"
                        width="100%"
                        text
                        tile
                     >
                        LOBBY: {{ global_room_clients.length }}
                     </v-btn>
                  </template>
                  <v-card>
                     <div class="text-center">LOBBY</div>
                     <hr />
                     {{ global_room_clients }}
                  </v-card>
               </v-dialog>
            </div>
         </div>
         <div class="all-chat" v-chat-scroll="{ always: false }">
            <div
               v-for="(chat, ind) in all_global_chats"
               :key="chat + ind"
               :style="chat.style"
            >
               <div>
                  {{
                     (chat.type === "all-other-chat")
                        ? (chat.displayName + " : " + chat.chat)
                        : (chat.chat)
                  }}
               </div>
            </div>
         </div>
         <div class="all-chat-input-wrapper">
            <!-- <v-text-field @keydown="enter_pressed($event)" class="all-chat-input ma-0 pa-0" background-color="red" height="20px" v-model="global_chat" filled outlined hide-details dense></v-text-field> -->
            <input
               @keydown="enter_pressed($event)"
               v-model="global_chat"
               type="text"
               class="all-chat-input"
            />
            <button
               @click="global_chat_enter()"
               class="all-chat-enter ma-0 pa-0"
               :disabled="enter_button_disabled"
            >
               {{ enter_button }}
            </button>
         </div>
      </v-sheet>
   </v-container>
</template>

<script>
import Loading from "@/components/Loading.vue";
import MyInfo from "@/components/MyInfo.vue";
import CreateRoom from "@/components/CreateRoom.vue";
import RoomList from "@/components/RoomList.vue";
import AudioControl from "@/components/AudioControl.vue";
import RankList from "@/components/RankList.vue";
import FriendList from "@/components/FriendList.vue";

export default {
   name: "IdleRoomChild",
   scrollToTop: true,
   components: {
      Loading,
      MyInfo,
      CreateRoom,
      RoomList,
      AudioControl,
      RankList,
      FriendList,
   },
   data() {
      return {
         loading_comp: false,
         loading_text: "Searching...",
         enter_button: "ENTER",
         enter_button_disabled: false,
         global_chat: "",
         show_my_info: false,
         create_room_dialog: false,
         create_room_key: 0,
         comp_mounted: false,
      };
   },
   computed: {
      window_width() {
         return this.$vuetify.breakpoint.width;
      },
      window_height() {
         return this.$vuetify.breakpoint.height;
      },
      global_room_clients() {
         return this.$store.state.chat.global_room_clients;
      },
      my_display_name() {
         return this.$store.state.general.my_display_name;
      },
      all_global_chats() {
         return this.$store.state.chat.global_chat; // []
      },
      my_chat_style() {
         return this.$store.state.chat.my_chat_style;
      },
      custom_dialog() {
         return this.$store.state.custom.show_custom_dialog;
      },
      refresh_friend_list() { // FriendList component key;
         return this.$store.state.user.refresh_friend_list;
      },
      my_friend_array() {
         return this.$store.state.user.user_info.friend;
      }
   },
   methods: {
      refresh_page() {
         window.location.reload();
      },
      open_custom_dialog() {
         this.$store.dispatch('custom/fetch_custom_room_list');
      },
      quickGame() {
         this.loading_comp = true;
         this.$store.commit('room/ROOM_TYPE', 'quick');
         window.socket.emit("quick-game");
      },
      global_chat_enter() {
         if (!this.global_chat || this.enter_button_disabled) return;

         window.socket.emit("global-chat", {
            type: "all-other-chat",
            displayName: this.my_display_name,
            chat: this.global_chat,
            style: { // How I'll see other's chat, revamp to incomming style later;
               position: "relative",
               "font-size": "14px",
               width: "100%",
               padding: "2px",
               "text-align": "left",
               background: "#FFFFFF",
            },
         });

         this.$store.commit("chat/GLOBAL_CHAT", {
            type: "all-my-chat",
            displayName: this.my_display_name,
            chat: this.global_chat,
            style: this.my_chat_style,
         });
         this.global_chat = "";

         this.enter_button_disabled = true;
         setTimeout(() => (this.enter_button_disabled = false), 1000);
      },
      enter_pressed(e) {
         if (e.key === "Enter" || e.keyCode === 13) {
            this.global_chat_enter();
         }
      },
   },
   mounted() {
      setTimeout(() => this.$store.commit("audio/PLAY_BGM", "elinia"), 0);
      window.socket.emit(
         "join-global-room",
         this.$store.state.general.my_display_name
      );

      if (localStorage.mute_bgm) {
         localStorage.mute_bgm === "true"
            ? this.$store.dispatch("audio/bgm_setting", false)
            : this.$store.dispatch("audio/bgm_setting", true);
      }
      if (localStorage.mute_sound) {
         localStorage.mute_sound === "true"
            ? this.$store.dispatch("audio/sound_setting", true)
            : this.$store.dispatch("audio/sound_setting", false);
      }

      this.comp_mounted = true;

      if (!this.my_display_name.toLowerCase().includes('guest-')) {
         this.$store.dispatch('user/fetch_user_info');
      }
   },
   destroyed() {
      window.socket.emit("leave-global-room");
      this.$store.commit('chat/DELETE_GLOBAL_CHAT'); // Empty out global chat array;
   },
};
</script>

<style lang="scss" scoped>

.main-title {
background: rgb(98,0,234);
background: -moz-radial-gradient(circle, rgba(98,0,234,1) 0%, rgba(209,55,255,1) 42%);
background: -webkit-radial-gradient(circle, rgba(98,0,234,1) 0%, rgba(209,55,255,1) 42%);
background: radial-gradient(circle, rgba(98,0,234,1) 0%, rgba(209,55,255,1) 42%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#6200ea",endColorstr="#d137ff",GradientType=1);
}

// .main-title {
// background: rgb(98,0,234);
// background: -moz-radial-gradient(circle, rgba(98,0,234,1) 76%, rgba(209,55,255,1) 100%);
// background: -webkit-radial-gradient(circle, rgba(98,0,234,1) 76%, rgba(209,55,255,1) 100%);
// background: radial-gradient(circle, rgba(98,0,234,1) 76%, rgba(209,55,255,1) 100%);
// filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#6200ea",endColorstr="#d137ff",GradientType=1);
// }

// .main-title {
// background: rgb(209,55,255);
// background: -moz-radial-gradient(circle, rgba(209,55,255,1) 76%, rgba(59,1,27,1) 100%);
// background: -webkit-radial-gradient(circle, rgba(209,55,255,1) 76%, rgba(59,1,27,1) 100%);
// background: radial-gradient(circle, rgba(209,55,255,1) 76%, rgba(59,1,27,1) 100%);
// filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#d137ff",endColorstr="#3b011b",GradientType=1);
// }

// .main-title {
// background: rgb(128,0,128);
// background: -moz-radial-gradient(circle, rgba(128,0,128,1) 67%, rgba(71,1,32,1) 100%);
// background: -webkit-radial-gradient(circle, rgba(128,0,128,1) 67%, rgba(71,1,32,1) 100%);
// background: radial-gradient(circle, rgba(128,0,128,1) 67%, rgba(71,1,32,1) 100%);
// filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#800080",endColorstr="#470120",GradientType=1);
// }

.custom-dialog {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   // background: rgba(48, 48, 48, 0.8);
   background: rgba(0,0,0,0.8);
   z-index: 10;
}

$text-field-border-radius: 0;
.all-chat-wrapper {
   position: absolute;
   left: 0;
   bottom: 0;
   box-sizing: border-box;
   min-height: 200px;
   background: green;

   .all-chat-title {
      position: relative;
      height: 25px;
      width: 100%;
      background: yellow;
      display: flex;
      flex-direction: row;
   }

   .all-chat {
      position: absolute;
      height: calc(100% - 50px);
      width: 100%;
      background: #9bbbd4;
      overflow-y: auto;
      bottom: 25px;
      word-wrap: break-word;
      overflow-x: hidden;
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