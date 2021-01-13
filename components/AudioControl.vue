<template>
   <v-sheet :class="(customGame)?'d-flex flex-row':null" :width="(customGame)?'100%':'auto'">
      <v-tooltip top>
         <template v-slot:activator="{ on, attrs }">
            <v-btn
               @click="bgm_setter()"
               class="flex-grow-2"
               v-bind="attrs"
               v-on="on"
               small
               :width="(customGame)?'50%':'auto'"
            >
               <v-icon>{{
                  bgm_muted_status ? "mdi-music-off" : "mdi-music"
               }}</v-icon>
            </v-btn>
         </template>
         <span>{{ bgm_muted_status ? "Play Music" : "Mute Music" }}</span>
      </v-tooltip>

      <v-tooltip top>
         <template v-slot:activator="{ on, attrs }">
            <v-btn
               @click="sound_setter()"
               class="flex-grow-2"
               v-on="on"
               v-bind="attrs"
               small
               :width="(customGame)?'50%':'auto'"
            >
               <v-icon>{{
                  sound_muted_status ? "mdi-volume-mute" : "mdi-volume-high"
               }}</v-icon>
            </v-btn>
         </template>
         <span>{{ sound_muted_status ? "Play Sound" : "Mute Sound" }}</span>
      </v-tooltip>
   </v-sheet>
</template>

<script>
export default {
   name: "AudioControlComp",
   props: ["customGame"],
   computed: {
      custom_game() {
         if (this.customGame) return this.customGame;
         else return false;
      },
      bgm_muted_status() {
         return this.$store.state.audio.bgm_muted;
      },
      sound_muted_status() {
         return this.$store.state.audio.sound_muted;
      },
   },
   methods: {
      bgm_setter() {
         if (!this.bgm_muted_status) {
            // If bgm is not muted,
            this.$store.dispatch("audio/bgm_setting", false); // Mute all bgm;
         } else {
            // If bgm is muted,
            this.$store.dispatch("audio/bgm_setting", true); // Unmute all bgm and play default bgm;
         }
      },
      sound_setter() {
         if (!this.sound_muted_status) {
            this.$store.dispatch("audio/sound_setting", true);
         } else {
            this.$store.dispatch("audio/sound_setting", false);
         }
      },
   },
};
</script>

<style>
</style>