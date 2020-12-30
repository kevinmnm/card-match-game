<template>
   <v-container fluid class="pa-0 ma-0" style="height:100%;">
      <MainComp v-if="!signed_in" />
      <IdleRoom v-else />
      <AudioComp />
      <!-- <v-btn @click="$store.commit('audio/PLAY_SOUND', 'victory')">test1</v-btn> -->
      <!-- <v-btn @click="$store.commit('audio/PLAY_BGM', 'elinia')">test1</v-btn> -->
   </v-container>
</template>

<script>
import MainComp from "@/components/MainComp.vue";
import IdleRoom from "@/components/IdleRoom.vue";
import AudioComp from "@/components/AudioComp.vue";

export default {
   name: "Main",
   components: {
      MainComp,
      IdleRoom,
      AudioComp
   },
   computed: {
      signed_in(){
         return this.$store.state.general.signed_in;
      }
   },
};
</script>
