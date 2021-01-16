<template>
   <v-sheet width="100%" height="100%">
      <!-- <v-sheet v-if="loading_data" class="d-flex align-center justify-center" width="100%" height="100%">
         <Loading />
      </v-sheet> -->
      <v-sheet>
         <v-tabs v-model="tabs">
            <v-tab>Overall</v-tab>
            <v-tab>Ranked</v-tab>
            <v-tab>Quick</v-tab>
            <v-tab>1vs1</v-tab>
            <v-tab>2vs2</v-tab>
         </v-tabs>
         <v-tabs-items v-model="tabs">
            <v-tab-item>
               <v-sheet>overall</v-sheet>
            </v-tab-item>
            <v-tab-item>
               <v-sheet>ranked</v-sheet>
            </v-tab-item>
            <v-tab-item>
               <v-sheet>quick</v-sheet>
            </v-tab-item>
            <v-tab-item>
               <v-sheet>1vs1</v-sheet>
            </v-tab-item>
            <v-tab-item>
               <v-sheet>2vs2</v-sheet>
            </v-tab-item>
         </v-tabs-items>
      </v-sheet>
   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
   name: "RankList",
   components: { Loading },
   data: () => ({
      loading_data: false,
      tabs: null
   }),
};
</script>

<style>
</style>