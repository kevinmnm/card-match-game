<template>
   <v-container fluid class="pa-0 ma-0" style="height: 100%">
      <IdleRoomChild v-if="!get_show_room" />
      <GameComp v-if="get_show_room && room_type === 'quick'" />
      <CustomGame v-if="get_show_room && room_type === 'custom'" />
      <div v-if="global_loading" class="global-loading d-flex align-center">
         <Loading />
      </div>
   </v-container>
</template>

<script>
import IdleRoomChild from "@/components/IdleRoomChild.vue";
import GameComp from "@/components/GameComp.vue";
import CustomGame from "@/components/CustomGame.vue";
import Loading from "@/components/Loading.vue";

export default {
   name: "IdleRoom",
   data: () => ({ show: true }),
   components: {
      IdleRoomChild,
      GameComp,
      Loading,
      CustomGame,
   },
   computed: {
      custom_room_key() {
         return this.$store.state.custom.custom_room_key;
      },
      get_show_room() {
         return this.$store.state.room.show_room;
      },
      room_type() {
         return this.$store.state.room.room_type;
      },
      global_loading() {
         return this.$store.state.general.global_loading;
      }
   },
};
</script>

<style lang="scss">

.global-loading {
   position: absolute;
   top: 0;
   left: 0;
   height: 100%;
   width: 100%;
   background: rgb(0, 0, 0, 0.8);
   z-index: 1000;
}

</style>