<template>
   <v-app>
      <!-- <v-sheet id="place-for-ads" height="90px" width="100%" outlined class="pa-0 ma-0"></v-sheet> -->
      <v-main>
         <v-container class="pa-0 ma-0" fluid style="height: 100%">
            <nuxt />
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import { io } from "socket.io-client";

export default {
   name: "Layout",
   computed: {
      connect_socket_watch(){
         return this.$store.state.general.connect_socket;
      },
      my_player_number() { // player_1, etc;
         if (this.$store.state.room.room_info) {
            let roomInfo = this.$store.state.room.room_info;
            let myDisplayName = this.$store.state.general.my_display_name;
            let myPlayerNumber;
            for (let playerN in roomInfo.players) {
               if (roomInfo.players[playerN].displayName === myDisplayName) {
                  myPlayerNumber = playerN;
                  break;
               } else {
                  myPlayerNumber = '';
               }
            }
            return myPlayerNumber;
         } else {
            return '';
         }
      },
      room_capacity() {
         return this.$store.state.room.room_info.capacity;
      },
      room_turn() {
         return this.$store.state.room.room_info.turn;
      }
   },
   methods: {
      connect_socket() {
         let handshake_data = this.$store.state.guest.guest_info || this.$store.state.user.user_info;

         // console.dir("Handshake Data Available");

         window.socket = io(window.server_url, {
            query: {
               payload: JSON.stringify(handshake_data)
            }
         });

         /** Toggles show between <MainComp> and <IdleComep> in main.vue **/
         window.socket.on("connect", () => {
            localStorage.___sid = socket.id;
            this.$store.commit("general/SIGNED_IN", true);
         });

         window.socket.on("global-room-update", payload => { // payload = [...];
            this.$store.commit('chat/GLOBAL_ROOM_CLIENTS', payload);
         });

         /** Update room data in room.js store. (Similar to update-room event) **/
         window.socket.on('create-room', payload => {
            this.$store.commit("room/ROOM_INFO_CREATE", payload); 
            this.$store.commit("room/SHOW_ROOM", true);
         });

         /** Update room data in room.js store. **/
         window.socket.on('update-room', payload => {
            this.$store.commit("room/ROOM_INFO_CREATE", payload); 
            this.$store.commit("room/SHOW_ROOM", true); // This is necessary! (laster joined player's game board will show);
            // if (payload.capacity === payload.joined) { // If room is full, trigger auto start game;
            //    // window.socket.emit('full-room');
            // }
         });

         /** Update room data in room.js and hide GameComp in IdleRoom.vue **/
         window.socket.on('left-room', payload => {
            this.$store.commit("room/GAME_STARTING", false);
            this.$store.commit("room/ROOM_INFO_CREATE", null); 
            this.$store.commit("room/SHOW_ROOM", false);
            this.$store.commit("room/SET_ROOM_CHAT", false);
         });

         window.socket.on('add-chat', payload => { // payload = {room_number: 'room#', my_display_name: 'sdf', chat_value: 'sss'};
            this.$store.commit("room/OPPONENT_ROOM_CHAT", payload);
         });

         window.socket.on('system-chat', payload => {
            this.$store.commit('room/SYSTEM_ROOM_CHAT', payload);
         });

         window.socket.on('add-global-chat', payload => {
            this.$store.commit('chat/GLOBAL_CHAT', payload);
         });

         window.socket.on('game-started', payload => { // payload = { room };
            this.$store.commit('room/GAME_STARTED', payload);
            this.$store.commit('general/CLOSE_END_GAME_SCREEN');
            this.$store.commit('audio/PLAY_BGM', 'lith');
            
         });

         window.socket.on('flipped-card', payload => { // payload = { card, cardIndex };
            this.$store.commit('room/ROOM_CARD', payload);
            this.$store.commit('audio/PLAY_SOUND', 'card_flip');
            // if (payload.flippedCardArray && this.$store.state.room.room_info.turn === this.my_player_number) {
            //    payload.flippedCardArray.forEach( card => {
            //       this.$store.commit('card/FLIPPED_TRACKER', { action: 'push', flippedCard: card });
            //    });
            // }
         });

         window.socket.on('my-turn-temp-disable', payload => { // payload = true || false (false is enable my turn);
            this.$store.commit('card/MY_TURN_TEMP_DISABLE', payload);
         });

         window.socket.on('turn-changed', payload => { // payload = { roomInfo };
            this.$store.commit('room/ROOM_INFO_UPDATE', payload.roomInfo); // Simply updates room info;
            // If it's 2vs2 game,
            if (this.room_capacity === 4) {
               if (this.room_turn === this.my_player_number && !payload.dontEnableTurn) { // If it's my turn, add card info to tracker;
                  if (payload.flippedCardArray) { // If other team's cards weren't matching,
                     payload.flippedCardArray.forEach( card => { // Should really be one card;
                        if (card.show) {
                           this.$store.commit('card/FLIPPED_TRACKER', { action: 'push', flippedCard: card });
                        }
                     });
                  } else { // If other team timed out,
                     this.$store.commit('card/FLIPPED_TRACKER', { action: 'clear' }); // Should already be empty but for safety;
                  }
               } else {
                  this.$store.commit('card/FLIPPED_TRACKER', { action: 'clear' });
               }
               this.$store.commit('card/CARD_KEY');
               if (payload.dontEnableTurn) return;
            }
            this.$store.commit('card/MY_TURN_TEMP_DISABLE', false); // Enable temp turn (turn will be determined by other turn data);
         });

         window.socket.on('play-sound', payload => { // payload = { sound: String };
            this.$store.commit('audio/PLAY_SOUND', payload.sound);
         });

         window.socket.on('room-info-update', payload => { // payload = { roomInfo: ... };
            this.$store.commit('room/ROOM_INFO_UPDATE', payload.roomInfo);
            if (this.room_capacity === 4) {
               this.$store.commit('room/ROOM_CARD', payload);
               this.$store.commit('audio/PLAY_SOUND', 'card_flip');
               this.$store.commit('card/CARD_KEY');
            }
         });

         window.socket.on('restart-countdown', payload => { // true or false;
            this.$store.dispatch('card/countdown_function', payload);
         });

         window.socket.on('countdown-paused', () => { // Pauses countdown and resets its value to default;
            this.$store.commit('card/PAUSE_COUNTDOWN');
         });

         window.socket.on('game-ended', payload => { // payload = { winner: {...}, losers: [{...}, {...}], draws: [{...}, {...}] };
            this.$store.commit('general/END_GAME_SCREEN', payload);
            this.$store.commit('card/INITIAL_STATE_CARD');
            this.$store.dispatch('card/countdown_function', false);
         });
         
         window.socket.on('joined-custom-room', () => {
            this.$store.commit('room/ROOM_TYPE', 'custom');
         });

         window.socket.on('custom-game-start', () => {
            this.$store.commit('room/GAME_STARTING', true); 
         });
      },
   },
   watch: {
      connect_socket_watch(newVal) {
         newVal && this.connect_socket();
      }
   },
   mounted() {
      if (process.env.NODE_ENV === "production") {
         if (location.protocol !== "https:") {
            location.replace(`
               https:${location.href.substring(location.protocol.length)}
            `);
         }
         window.server_url = "https://monstermatches-server.herokuapp.com";
      } else {
         window.server_url = "http://localhost:5555";
         // window.server_url = this.$store.state.general.server_url;
      }


   },
};
</script>

<style>
/* width */
::-webkit-scrollbar {
   width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
   background: #f1f1f1;

}

/* Handle */
::-webkit-scrollbar-thumb {
   background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
   /* background: #555;  */
   background: purple;
}
</style>