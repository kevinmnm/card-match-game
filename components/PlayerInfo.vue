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

         <PlayerInfoIcon 
            v-if="!playerInfoLoading"
            :is-my-info="is_my_info" 
            :is-guest="is_guest" 
            :player-info="player_info" 
            :hide-thumbs="hideThumbs" 
            @trigger-get-user-info="get_user_info()"
         />


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
            Close
         </v-btn>
      </v-sheet>
   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";
import PlayerInfoIcon from "@/components/PlayerInfoIcon.vue";

export default {
   name: "PlayerInfoComp",
   props: ["playerInfo", "imgSize", "hideButton", "hideThumbs"],
   components: { Loading, PlayerInfoIcon },
   data() {
      return {
         playerInfoLoading: true,
         player_info: null,
      };
   },
   computed: {
      player_info_prop() {
         this.player_info = this.playerInfo;
         return this.playerInfo;
      },
      img_size() {
         return this.imgSize;
      },
      is_my_info() { // Check if I'm viewing my own info;
         if (this.player_info.displayName === this.$store.state.general.my_display_name) {
            return true;
         } else {
            return false;
         }
      },
      is_guest() {
         if (this.playerInfo.guest) return true;
         else return false;
      }
   },
   methods: {
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
      async get_user_info() { // May not be my user info!
         console.log('get_user_info() triggered');
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

         if (this.player_info.voteGranted === 0) {
            this.disable_popularity_vote = true;
         } else {
            this.disable_popularity_vote = false;
         }

         this.playerInfoLoading = false;

      },
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
