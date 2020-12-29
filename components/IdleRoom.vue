<template>
   <v-container fluid class="pa-0 ma-0" style="height:100%">
      <IdleRoomChild v-if="!get_show_room" />
      <GameComp v-else />
      <!-- Low Quality Audio -->
      <audio ref="elinia" :src="require('@/assets/music/elinia.mp3')" type="audio/mpeg" preload="auto" loop></audio>
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
      },
      overall_bgm_volume() {
         return this.$store.state.setting.bgm_volume;
      },
      elinia_play() {
         return this.$store.state.setting.elinia_play;
      }
   },
   watch: {
      overall_bgm_volume(newVal) {
         this.$refs.elinia.volume = newVal;
      },
      elinia_play(newVal) {
         console.warn(newVal);
         if (newVal) {
            this.$refs.elinia.load();
            this.$refs.elinia.play();
         } else {
            this.$refs.elinia.pause();
         }
      }
   },
   mounted() {
      this.$refs.elinia.volume = this.$store.state.setting.bgm_volume;
      this.$store.commit('setting/ELINIA_PLAY', true);
   }
};
</script>

<style>
</style>