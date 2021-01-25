<template>
   <v-card
      v-if="!is_my_info && !is_guest"
      class="d-flex flex-row justify-space-around pa-1"
      width="100%"
      flat
      outlined
   >
      <v-tooltip bottom>
         <template v-slot:activator="{ on, attrs }">
            <v-btn
               v-if="show_add_friend_button"
               v-on="on"
               v-bind="attrs"
               fab
               x-small
               shaped
               depressed
               @click="send_friend_request()"
               :disabled="disable_add_friend_button"
            >
               <v-icon color="primary">mdi-account-plus</v-icon>
            </v-btn>
         </template>
         <span>Send Friend Request</span>
      </v-tooltip>

      <v-tooltip bottom>
         <template v-slot:activator="{ on, attrs }">
            <v-icon
               v-if="show_friend_icon"
               v-on="on"
               v-bind="attrs"
               dense
               fab
               color="success"
               >mdi-account-check</v-icon
            >
         </template>
         <span>Friend</span>
      </v-tooltip>

      <v-tooltip bottom>
         <template v-slot:activator="{ on, attrs }">
            <v-btn
               v-if="!is_my_info && !hideThumbs && !is_guest"
               v-on="on"
               v-bind="attrs"
               fab
               x-small
               shaped
               depressed
               :disabled="disable_popularity_vote || my_user_info.voteGranted !== 1"
               @click="popularity_vote('like')"
            >
               <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
         </template>
         <span>Like This User</span>
      </v-tooltip>

      <v-tooltip bottom>
         <template v-slot:activator="{ on, attrs }">
            <v-btn
               v-if="!is_my_info && !hideThumbs && !is_guest"
               v-on="on"
               v-bind="attrs"
               fab
               x-small
               shaped
               depressed
               :disabled="disable_popularity_vote || my_user_info.voteGranted !== 1"
               @click="popularity_vote('dislike')"
            >
               <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
         </template>
         <span>Dislike This User</span>
      </v-tooltip>

      <v-tooltip bottom>
         <template v-slot:activator="{ on, attrs }">
            <v-btn @click="test()" v-on="on" v-bind="attrs" fab x-small shaped depressed>
               <v-icon color="error">mdi-alert-octagon</v-icon>
            </v-btn>
         </template>
         <span>Report This User</span>
      </v-tooltip>
   </v-card>
</template>

<script>
export default {
   name: "PlayerInfoIcon",
   props: ["isMyInfo", "isGuest", "playerInfo", "hideThumbs"],
   data: () => ({
      show_add_friend_button: false,
      // buttons_key: 0,
      disable_add_friend_button: false,
      show_friend_icon: false,
      disable_popularity_vote: false,
   }),
   computed: {
      is_my_info() { // Check if I'm viewing my own info;
         return this.isMyInfo;
      },
      is_guest() {
         return this.isGuest;
      },
      player_info() {
         return this.playerInfo;
      },
      my_user_info() {
         if (this.isGuest) {return false; }
         else {
            return this.$store.state.user.user_info;
         }
      },
   },
   methods: {
      test() {
         this.$store.commit('alert/SHOW_ALERT', {
            msg: "This is a test message!",
            html: "<b>Test....</b>",
            buttons: [
               {
                  text: "Ok",
                  color: "primary",
                  action: ($store) => {
                     $store.commit("alert/RESET_ALERT");
                  },
               },
            ],
         });
      },
      popularity_vote(type) { // 'like' || 'dislike';
         this.disable_popularity_vote = true;

         window.socket.emit('popularity-vote', {
            roomNumber: this.$store.state.room.room_info.room_number,
            playerInfo: this.player_info,
            myInfo: this.$store.state.user.user_info,
            type,
         });

         // Wait for response from 'popularity-vote' socket event emission;
         window.socket.on('popularity-updated', () => {
            this.$emit('trigger-get-user-info'); 
         });
      },
      send_friend_request() {
         // this.playerInfoLoading = true;
         this.disable_add_friend_button = true;

         let my_friend_list = this.my_user_info.friend;
         if (my_friend_list.length >= 10 ) {
            // this.playerInfoLoading = false;
            return alert('Your friends list is full');
         }

         window.socket.emit('friend-request', {
            requesterDisplayName: this.$store.state.general.my_display_name,
            playerInfo: this.player_info,
            action: "request"
         });

      },
      friend_check() {
         let stop = false;
         if (!this.is_guest) {
            if (this.is_my_info) { // If it's my own info;
               this.show_add_friend_button = false;
               return
            }
            let my_friend_list = this.my_user_info.friend; // Get my friend list array;
            let my_friend_list_pending = this.my_user_info.friend_pending; // Get my friend requested pending array;
            let player_pending_array = this.player_info.friend_pending;
            if (my_friend_list.length === 0 && my_friend_list_pending.length === 0) {
               this.show_add_friend_button = true;
               return
            }
            for (let i=0; i<my_friend_list.length; i++) { // check if already in my friend list
               if (this.player_info.displayName === my_friend_list[i].displayName) {
                  this.show_friend_icon = true;
                  this.show_add_friend_button = false;
                  stop = true;
                  break;
               }
            }

            if (stop) return;

            for (let i=0; i<my_friend_list_pending.length; i++) { // Check if player is in my pending list;
               if (my_friend_list_pending.displayName === this.player_info.displayName) {
                  this.disable_add_friend_button = true;
                  stop = true;
                  break;
               }
            }

            for (let i=0; i<player_pending_array.length; i++) {
               if (player_pending_array[i].displayName === this.my_user_info.displayName) {
                  this.disable_add_friend_button = true;
                  stop = true;
                  break;
               }
            }

            if (stop) return;

            this.show_add_friend_button = true;
         } else {
            this.show_add_friend_button = false;
         }
      }
   },
   mounted() {
      this.friend_check();
   }
};
</script>

<style>
</style>