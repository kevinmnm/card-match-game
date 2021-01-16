<template>
   <v-sheet>
      <v-sheet class="d-flex align-self-center flex-column flex-grow-1" style="position: relative; cursor:default;">
         <Loading
            v-if="playerInfoLoading"
            class="ma-auto"
            style="background: red; width: 100%"
         />
         <div v-if="!playerInfoLoading">
            <div class="d-flex flex-row" style="width: 100%">
               <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                     <v-card
                        :width="img_size"
                        :height="img_size"
                        v-bind="attrs"
                        v-on="on"
                        tile
                        outlined
                     >
                        <v-img :src="require(`@/assets/img/rank/${player_info.rank}.png`)"></v-img>
                     </v-card>
                  </template>
                  <span>{{ (player_info.guest ? player_info.rank : `${player_info.rank}`).toUpperCase() }}</span>
                  <!-- <span>{{ (player_info.guest ? player_info.rank : `${player_info.rank} ${player_info.tier}`).toUpperCase() }}</span> -->
               </v-tooltip>
               <div
                  class="d-flex flex-column flex-grow-1 justify-center text-center pa-0 ma-0"
                  style="position: relative"
               >
                  <v-card class="font-weight-bold d-flex align-center justify-center" style="height: 50%; width: 100%" tile outlined>
                     {{ player_info.displayName }}
                  </v-card>
                  <v-card class="d-flex flex-row" style="height: 50%" flat tile>
                     <v-card class="text-truncate font-weight-bold d-flex align-center justify-center" style="width: 50%; height: 100%;" flat tile outlined>
                        {{ (player_info.guest ? player_info.rank : `${player_info.rank} ${player_info.tier}`).toUpperCase() }}
                     </v-card>
                     <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                           <v-card 
                              class="d-flex align-center justify-center" 
                              style="width: 50%; height: 100%;" 
                              v-on="on"
                              v-bind="attrs"
                              flat 
                              tile 
                              outlined
                           >
                              {{ (player_info.guest) ? 'N/A' : player_info.like - player_info.dislike }}
                           </v-card>
                        </template>
                        <span>REPUTATION</span>
                     </v-tooltip>
                  </v-card>
               </div>
            </div>
         </div>

   <!-- ICONS -->
         <v-card v-if="!is_my_info && !player_info_prop.guest" class="d-flex flex-row justify-space-around pa-1" width="100%" flat :key="buttons_key" outlined>

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
                     :disabled="disable_friend_request"
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
                  >mdi-account-check</v-icon>
               </template>
               <span>Friend</span>
            </v-tooltip>

            <v-tooltip bottom>
               <template v-slot:activator="{ on, attrs }">
                  <v-btn
                     v-on="on"
                     v-bind="attrs"
                     fab
                     x-small
                     shaped
                     depressed
                  >
                     <v-icon>mdi-thumb-up</v-icon>
                  </v-btn>
               </template>
               <span>Like This User</span>
            </v-tooltip>

            <v-tooltip bottom>
               <template v-slot:activator="{ on, attrs }">
                  <v-btn
                     v-on="on"
                     v-bind="attrs"
                     fab
                     x-small
                     shaped
                     depressed
                  >
                     <v-icon>mdi-thumb-down</v-icon>
                  </v-btn>
               </template>
               <span>Dislike This User</span>
            </v-tooltip>

            <v-tooltip bottom>
               <template v-slot:activator="{ on, attrs }">
                  <v-btn
                     v-on="on"
                     v-bind="attrs"
                     fab
                     x-small
                     shaped
                     depressed
                  >
                     <v-icon color="error">mdi-alert-octagon</v-icon>
                  </v-btn>
               </template>
               <span>Report This User</span>
            </v-tooltip>
            
         </v-card>

         <div v-if="!playerInfoLoading" class="mt-2">
            <v-simple-table class="text-center" dense>
               <thead v-if="!player_info.guest">
                  <tr>
                     <th>RANKED</th>
                  </tr>
               </thead>
               <tbody v-if="!player_info.guest">
                  <tr>
                     <td>WINS</td>
                     <td>{{ player_info.rankWin }}</td>
                  </tr>
                  <tr>
                     <td>LOSSES</td>
                     <td>{{ player_info.rankLoss }}</td>
                  </tr>
                  <tr>
                     <td>DRAWS</td>
                     <td>{{ player_info.rankDraw }}</td>
                  </tr>
                  <tr>
                     <td>SCORE</td>
                     <td>{{ player_info.rankScore }}</td>
                  </tr>
               </tbody>

               <thead>
                  <tr>
                     <th>NORMALS</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>WINS</td>
                     <td>{{ player_info.win }}</td>
                  </tr>
                  <tr>
                     <td>LOSSES</td>
                     <td>{{ player_info.loss }}</td>
                  </tr>
                  <tr>
                     <td>DRAWS</td>
                     <td>{{ player_info.draw }}</td>
                  </tr>
                  <tr>
                     <td>SCORES</td>
                     <td>{{ player_info.totalScore }}</td>
                  </tr>
               </tbody>
            </v-simple-table>
         </div>
      </v-sheet>
      <v-sheet class="mt-2">
         <v-btn
            color="error"
            @click="$emit('player-info-dialog-close')"
            width="100%"
            tile
         >
            close
         </v-btn>
      </v-sheet>
   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
   name: "PlayerInfoComp",
   props: ["playerInfo", "imgSize"],
   components: { Loading },
   data() {
      return {
         playerInfoLoading: true,
         player_info: null, // Freshest data, use this instead of props;
         show_add_friend_button: false,
         buttons_key: 0,
         disable_friend_request: false,
         show_friend_icon: false,
      };
   },
   computed: {
      player_info_prop() {
         return this.playerInfo;
      },
      img_size() {
         return this.imgSize;
      },
      is_my_info() { // Check if I'm viewing my own info;
         if (
            this.$store.state.user.user_info && 
            this.playerInfo.displayName === this.$store.state.user.user_info.displayName
         ) {
            return true;
         } else {
            return false;
         }
      }
   },
   methods: {
      send_friend_request() {
         this.playerInfoLoading = true;
         let my_friend_list = this.$store.state.user.user_info.friend;
         if (my_friend_list.length >= 10 ) {
            this.playerInfoLoading = false;
            return alert('Your friends list is full');
         }

         this.get_user_info

         window.socket.emit('friend-request', {
            requesterDisplayName: this.$store.state.general.my_display_name,
            playerInfo: this.player_info,
            action: "request"
         });

         this.disable_friend_request = true;
      },
      async get_guest_info() {
         this.playerInfoLoading = true;
         const response = await fetch(window.server_url + "/guest", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               action: "verify",
               displayName: this.player_info_prop.displayName,
            }),
         });

         const res = await response.json();
         this.player_info = res.find_guest;

         this.playerInfoLoading = false;
      },
      async get_user_info() {
         this.playerInfoLoading = true;
         const response = await fetch(window.server_url + "/user", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               displayName: this.player_info_prop.displayName
            })
         })

         const res = await response.json();
         this.player_info = res.foundUser;

         this.friend_check();
      },
      friend_check() {
         let stop = false;
         if (
            this.player_info &&  // Player info has been loaded (extra safety..?);
            !this.player_info.guest &&  // Player is not a guest;
            !this.$store.state.general.my_display_name.toLowerCase().includes('guest') // I'm not a guest;
         ) {
            if (this.$store.state.general.my_display_name === this.player_info.displayName) { // If it's my own info;
               this.show_add_friend_button = false;
               this.buttons_key++;
               return this.playerInfoLoading = false;
            }
            let my_friend_list = this.$store.state.user.user_info.friend; // Get my friend list array;
            let my_friend_list_pending = this.$store.state.user.user_info.friend_pending; // Get my friend requested pending array;
            if (my_friend_list.length === 0 && my_friend_list_pending.length === 0) {
               this.show_add_friend_button = true;
               this.buttons_key++;
               return this.playerInfoLoading = false;
            }
            for (let i=0; i<my_friend_list.length; i++) { // check if already in my friend list
               if (this.player_info.displayName === my_friend_list[i].displayName) {
                  this.show_friend_icon = true;
                  this.show_add_friend_button = false;
                  this.playerInfoLoading = false;
                  this.buttons_key++;
                  stop = true;
                  break;
               }
            }

            if (stop) return;

            for (let i=0; i<my_friend_list_pending.length; i++) {
               if (my_friend_list_pending.displayName === this.player_info.displayName) {
                  this.show_add_friend_button = true;
                  this.playerInfoLoading = false;
                  this.buttons_key++;
                  stop = true;
                  break;
               }
            }

            if (stop) return;

            this.show_add_friend_button = true;
            this.buttons_key++;
         } else {
            this.show_add_friend_button = false;
            this.buttons_key++;
         }
         this.playerInfoLoading = false;
      }
   },
   created() {
      if (this.playerInfo.guest) { // If clicked player is a guest,
         this.get_guest_info();
      } else { // If clicked player is a user,
         this.get_user_info();
      }
   },
};
</script>
