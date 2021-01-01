<template>
   <v-container class="text-center pa-0" fluid style="height: 100%">
      <!-- <v-img class="d-lg-none" width="100%" contain :src="require('@/assets/img/main/theme.gif')" max-height="50%"></v-img> -->
      <v-img
         width="100%"
         contain
         :src="require('@/assets/img/main/theme.gif')"
         max-height="50%"
         class="mb-2"
      ></v-img>
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
            <v-btn
               width="140px"
               @click="quickGame()"
               @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')"
               :disabled="loading_comp"
               plain
            >
               quick game
            </v-btn>
         </v-col>
      </v-row>
      <Loading v-show="loading_comp">
         <template v-slot:text>
            {{ loading_text }}
         </template>
      </Loading>
      <v-spacer></v-spacer>

<!-- VOLUME/SOUND BAR -->
      <v-card
         class="d-flex flex-row"
         style="position: absolute; right: 0; bottom: 201px"
         width="100%"
      >
         <v-tooltip top>
            <template v-slot:activator="{on, attrs}">
               <v-btn @click="bgm_setter()" class="flex-grow-2" v-bind="attrs" v-on="on" small>
                  <v-icon>{{
                     bgm_muted_status ? "mdi-music-off" : "mdi-music"
                  }}</v-icon>
               </v-btn>
            </template>
            <span>{{ bgm_muted_status ? "Play Music" : "Mute Music" }}</span>
         </v-tooltip>

         <v-tooltip top>
            <template v-slot:activator="{on, attrs}">
               <v-btn @click="sound_setter()" class="flex-grow-2" v-on="on" v-bind="attrs" small>
                  <v-icon>{{
                     sound_muted_status ? "mdi-volume-mute" : "mdi-volume-high"
                  }}</v-icon>
               </v-btn>
            </template>
            <span>{{ sound_muted_status ? "Play Sound" : "Mute Sound" }}</span>
         </v-tooltip>

         <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
               <v-btn class="flex-grow-1" @click="show_my_info = true" v-bind="attrs" v-on="on" small>
                  <v-icon>mdi-account</v-icon>
               </v-btn>
            </template>
            <span>My Info</span>
         </v-tooltip>

      </v-card>

      <v-dialog v-model="show_my_info">
         <MyInfo @hide-my-info="show_my_info = false" />
      </v-dialog>

<!-- GLOBAL CHAT -->
      <div class="all-chat-wrapper">
         <div class="all-chat-title">
            <div
               class="text-left"
               style="block-size: min-content; height: 100%; background: red"
            >
               GLOBAL CHAT
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
                        ONLINE: {{ global_room_clients.length }}
                     </v-btn>
                  </template>
                  <v-card>
                     <div class="text-center">GLOBAL CHAT</div>
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
      </div>
   </v-container>
</template>

<script>
import Loading from "@/components/Loading.vue";
import MyInfo from "@/components/MyInfo.vue";

export default {
   name: "IdleRoomChild",
   components: {
      Loading,
      MyInfo,
   },
   data() {
      return {
         loading_comp: false,
         loading_text: "Searching...",
         enter_button: "ENTER",
         enter_button_disabled: false,
         global_chat: "",
         show_my_info: false,
      };
   },
   computed: {
      global_room_clients() {
         return this.$store.state.chat.global_room_clients;
      },
      my_display_name() {
         return this.$store.state.general.my_display_name;
      },
      all_global_chats() {
         return this.$store.state.chat.global_chat; // []
      },
      bgm_muted_status() {
         return this.$store.state.audio.bgm_muted;
      },
      sound_muted_status() {
         return this.$store.state.audio.sound_muted;
      },
      my_chat_style() {
         return this.$store.state.chat.my_chat_style;
      }
   },
   methods: {
      bgm_setter() {
         if (!this.bgm_muted_status) {
            // If bgm is not muted,
            this.$store.dispatch("audio/bgm_setting", false); // Mute all bgm;
         } else {
            // If bgm is muted,
            this.$store.dispatch("audio/bgm_setting", true); // Unmute all bgm and play default bgm;
         }
      },
      sound_setter() {
         if (!this.sound_muted_status) {
            this.$store.dispatch("audio/sound_setting", true);
         } else {
            this.$store.dispatch("audio/sound_setting", false);
         }
      },
      quickGame() {
         this.loading_comp = true;
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
   },
   destroyed() {
      window.socket.emit("leave-global-room");
      this.$store.commit('chat/DELETE_GLOBAL_CHAT'); // Empty out global chat array;
   },
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