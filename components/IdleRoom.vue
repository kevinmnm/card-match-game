<template>
   <v-container fluid class="pa-0 ma-0" style="height:100%">
      <IdleRoomChild v-show="false" />
      <GameComp />
   </v-container>
</template>

<script>
import IdleRoomChild from "@/components/IdleRoomChild.vue";
import GameComp from "@/components/GameComp.vue";

export default {
   name: "IdleRoom",
   components: {
      IdleRoomChild,
      GameComp
   }
};
</script>

<style>
</style>