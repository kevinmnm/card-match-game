<template>
   <v-container fluid class="pa-0 ma-0" style="height:100%">
      <IdleRoomChild v-if="!get_show_room" />
      <GameComp v-else />
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
   },
   computed: {
      get_show_room() {
         return this.$store.state.room.show_room;
      }
   }
};
</script>

<style>
</style>