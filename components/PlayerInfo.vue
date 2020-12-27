<template>
   <v-sheet class="d-flex align-self-center flex-column">
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
                  >
                     <v-img
                        v-if="player_info.guest"
                        :src="require('@/assets/img/rank/stone.png')"
                     ></v-img>
                  </v-card>
               </template>
               <span>{{ "STONE" }}</span>
            </v-tooltip>
            <div
               class="d-flex flex-column flex-grow-1 justify-center text-center pa-0 ma-0"
               style="background: green; position: relative"
            >
               <div style="height: 50%; width: 100%">
                  {{ player_info.displayName }}
               </div>
               <div class="d-flex flex-row" style="height: 50%">
                  <div style="width: 50%; height: 100%; background: red">
                     {{ "STONE" }}
                  </div>
                  <div style="width: 50%; height: 100%; background: yellow">
                     {{ player_info.level }}
                  </div>
                  <!-- <v-avatar color="primary" width="50%" rounded>{{
                     "STONE"
                  }}</v-avatar>
                  <v-avatar color="secondary" width="50%" rounded>{{
                     player_info.level
                  }}</v-avatar> -->
               </div>
            </div>
         </div>
      </div>
      <div v-if="!playerInfoLoading">
         <v-simple-table class="text-center">
            <thead>
               <tr>
                  <th>RANKED</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>N/A</td>
               </tr>
            </tbody>
            <thead>
               <tr>
                  <th>NORMALS</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>SCORES</td>
                  <td>{{ player_info.totalScore }}</td>
               </tr>
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
            </tbody>
         </v-simple-table>
      </div>
      <v-hover v-slot="{ hover }">
         <v-btn
            :class="{ 'on-hover': hover }"
            :dark="hover ? true : false"
            @click="$emit('player-info-dialog-close')"
         >
            close
         </v-btn>
      </v-hover>
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
         player_info: null,
      };
   },
   computed: {
      player_info_prop() {
         return this.playerInfo;
      },
      img_size() {
         return this.imgSize;
      },
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
   },
   created() {
      if (this.playerInfo.guest) {
         // If clicked player is a guest,
         this.get_guest_info();
      } else {
      }
   },
};
</script>
