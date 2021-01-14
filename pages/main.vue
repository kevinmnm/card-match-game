<template>
   <v-container ref="main" fluid class="pa-0 ma-0" style="height:100%;">
      <MainComp v-if="!signed_in" />
      <IdleRoom v-else />
      <AudioComp />
      <DevSoundTest v-if="development" />
   </v-container>
</template>

<script>
import MainComp from "@/components/MainComp.vue";
import IdleRoom from "@/components/IdleRoom.vue";
import AudioComp from "@/components/AudioComp.vue";
import DevSoundTest from "@/components/devOnly/DevSoundTest.vue";

export default {
   name: "Main",
   components: {
      MainComp,
      IdleRoom,
      AudioComp,
      DevSoundTest
   },
   data: () => ({
      development: false,
   }),
   computed: {
      signed_in(){
         return this.$store.state.general.signed_in;
      }
   },
   mounted() {
      if (process.env.NODE_ENV === 'production') {
         this.$refs.main.addEventListener('contextmenu', event => event.preventDefault());
      } else {
         this.development = true;
      }
   },
   destroyed() {
      if (process.env.NODE_ENV === 'production') {
         this.$refs.main.removeEventListener('contextmenu', event => event.preventDefault());
      }
   }
};
</script>
