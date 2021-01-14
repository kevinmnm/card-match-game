<template>
   <v-sheet width="100%" height="100%" dark>
      <v-sheet class="text-center mb-3">
         <v-card width="100%">this.$store.commit('PLAY_BGM', '');</v-card>
         <v-card width="100%">this.$store.commit('PLAY_SOUND', '');</v-card>
      </v-sheet>
      <v-sheet class="text-center pa-3 mb-3" outlined>
         <h3 class="text-decoration-underline">Play BGMs</h3>
         <v-sheet class="d-flex flex-wrap justify-space-around">
            <v-btn @click="bgm_play(bgm)" v-for="(bgm, ind) in all_bgm" :key="bgm+ind" width="100px">{{ bgm }}</v-btn>
         </v-sheet>
         <h3 class="text-decoration-underline">Pause BGMs</h3>
         <v-sheet class="d-flex flex-wrap justify-space-around">
            <v-btn @click="bgm_pause(bgm)" v-for="(bgm) in all_bgm" :key="bgm" width="100px">{{ bgm }}</v-btn>
         </v-sheet>
      </v-sheet>
      <v-sheet class="text-center pa-3 mb-3" outlined>
         <h3 class="text-decoration-underline">All Sounds</h3>
         <v-sheet class="d-flex flex-wrap justify-space-around">
            <v-btn @click="sound_play(sound)" v-for="(sound, ind) in all_sound" :key="sound+ind" width="100px">{{ sound }}</v-btn>
         </v-sheet>
      </v-sheet>
   </v-sheet>
</template>

<script>
export default { 
   name: "DevSoundTest",
   data: ()=>({
      mute: false,
   }),
   computed: {
      all_bgm() {
         return Object.keys(this.$store.state.audio.bgm);
      },
      all_sound() {
         return Object.keys(this.$store.state.audio.sound);
      }
   },
   methods: {
      bgm_play(bgm) {
         this.$store.commit('audio/PLAY_BGM', bgm);
      },
      bgm_pause(bgm) {
         this.$store.commit('audio/PAUSE_BGM', bgm);
      },
      sound_play(sound) {
         this.$store.commit('audio/PLAY_SOUND', sound);
      }
   }
};
</script>

<style>
</style>