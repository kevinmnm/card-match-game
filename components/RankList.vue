<template>
   <v-sheet width="100%" height="100%" style="overflow: auto">
      <v-sheet
         v-if="loading_rank"
         width="100%"
         height="100%"
         class="d-flex align-center justify-center"
         outlined
      >
         <Loading :size="40" />
      </v-sheet>
      <v-sheet v-else height="100%" class="d-flex flex-column" width="100%" outlined>
            <v-card
               class="d-flex justify-center align-center text-center"
               style="cursor: pointer"
               width="100%"
               height="35px"
               tile
            >
               TOP 10
         </v-card>
         <v-sheet v-if="!rank_list || rank_list.length === 0">
            empty
         </v-sheet>
         <v-sheet v-else class="flex-grow-1 d-flex flex-column flex-wrap">
            <v-card
               v-for="(rank, ind) in rank_list"
               :key="rank + ind"
               class="d-flex flex-row flex-grow-1"
               color="grey"
               style="overflow:auto;"
               max-height="45px"
               @click="(show_player_info = rank), (player_info_dialog = true)"
               flat
               tile
               outlined
            >
               <v-card
                  class="d-flex align-center justify-center"
                  width="45px"
                  tile
               >

                  <v-img
                     v-if="ind+1===1 || ind+1===2 || ind+1===3"
                     :aspect-ratio="1/1"
                     height="40px"
                     contain
                     :src="require(`@/assets/img/rank/${ind+1}.png`)"
                  >
                  </v-img>
                  <span v-else>
                     {{ ind + 1 }}
                  </span>

               </v-card>
               <v-card
                  class="flex-grow-1 d-flex align-center justify-center"
                  tile
               >
                  {{ rank.displayName }}
               </v-card>
            </v-card>
         </v-sheet>

         <!-- <v-sheet>
            <v-tabs v-model="tabs" height="100%" background-color="red" grow>
               <v-tab>TOP 10</v-tab>
               <v-tabs-items v-model="tabs">
                  <v-tab-item>
                     <v-card 
                        class="d-flex justify-center align-center"
                        style="cursor:default;"
                        width="100%" 
                        height="max-content" 
                        flat 
                        tile 
                        outlined
                     >
                        sdfsdf
                     </v-card>
                  </v-tab-item>
               </v-tabs-items>
            </v-tabs>
         </v-sheet> -->
      </v-sheet>

      <v-dialog
         v-model="player_info_dialog"
         class="pa-0 ma-0"
         overlay-opacity="0.9"
         :width="window_width <= 600 ? '100%' : '60%'"
      >
         <PlayerInfo
            v-if="player_info_dialog"
            :player-info="show_player_info"
            :img-size="window_width / 6 + 'px'"
            @player-info-dialog-close="player_info_dialog = false"
            :hide-thumbs="true"
         />
      </v-dialog>
   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";
import PlayerInfo from "@/components/PlayerInfo.vue";

export default {
   name: "RankList",
   components: { Loading, PlayerInfo },
   data: () => ({
      loading_rank: false,
      tabs: null,
      rank_list: null, // Will be array;
      show_player_info: null,
      player_info_dialog: false,
   }),
   computed: {
      window_width() {
         return this.$vuetify.breakpoint.width;
      },
   },
   methods: {
      async get_rankings() {
         this.loading_rank = true;

         const response = await fetch(window.server_url + "/ranking", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               type: "overall",
               range: 10,
            }),
         });

         let res = await response.json();
         this.rank_list = res.rankList;

         this.loading_rank = false;
      },
   },
   mounted() {
      this.get_rankings();
   },
};
</script>

<style>
</style>