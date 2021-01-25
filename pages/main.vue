<template>
   <v-container ref="main" fluid class="pa-0 ma-0" style="height:100%;">
      <MainComp v-if="!signed_in" />
      <IdleRoom v-else />
      <AudioComp />
      <PeronalAlert />
      <DevSoundTest v-if="development" />
   </v-container>
</template>

<script>
import MainComp from "@/components/MainComp.vue";
import IdleRoom from "@/components/IdleRoom.vue";
import AudioComp from "@/components/AudioComp.vue";
import DevSoundTest from "@/components/devOnly/DevSoundTest.vue";
import PeronalAlert from "@/components/PersonalAlert.vue";

export default {
   name: "Main",
   components: {
      MainComp,
      IdleRoom,
      AudioComp,
      DevSoundTest,
      PeronalAlert
   },
   data: () => ({
      development: false,
   }),
   computed: {
      signed_in(){
         return this.$store.state.general.signed_in;
      }
   },
   methods: {
      prevent_default(event) {
         event.preventDefault();
      },
      detect_ios() {
         return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
         ].includes(navigator.platform)
         // iPad on iOS 13 detection
         || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
      }
   },
   beforeMount() {
      if (this.detect_ios()) {
         this.$store.commit('audio/FILE_TYPE', 'mp3');
         this.$store.commit('audio/MP3_FOLDER', 'mp3/');
      } else {
         this.$store.commit('audio/FILE_TYPE', 'ogg');
      }
   },
   mounted() {
      if (process.env.NODE_ENV === 'production') {
         this.$refs.main.addEventListener('contextmenu', event => event.preventDefault(), true);
      } else {
         this.development = true;
      }

      // alert(this.$store.state.audio.file_type);

   },
   beforeDestroy() {
      if (process.env.NODE_ENV === 'production') {
         this.$refs.main.removeEventListener('contextmenu', event => event.preventDefault(), true);
      }
   }
};
</script>
