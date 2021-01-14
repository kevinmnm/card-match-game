<template>
   <div style="display:none;">
   <!--------->
   <!-- BGM -->
   <!--------->

      <!-- Game Start -->
      <audio ref="lith" :src="require('@/assets/music/bgm/lith.mp3')" type="audio/mpeg" preload="auto" loop></audio>
      <!-- After Login (Waiting Room) -->
      <audio ref="elinia" :src="require('@/assets/music/bgm/elinia.mp3')" type="audio/mpeg" preload="auto" loop></audio>

   <!----------->
   <!-- SOUND -->
   <!----------->

      <!-- Card Flip -->
      <audio ref="card_flip" :src="require('@/assets/music/sound/card_flip.ogg')" preload="auto"></audio>
      <audio ref="cardFlip" :src="require('@/assets/music/sound/cardFlip.ogg')" preload="auto"></audio>
      <!-- Quick Wind -->
      <audio ref="quickWind" :src="require('@/assets/music/sound/quickWind.ogg')" preload="auto"></audio>
      <!-- Bubble Pop -->
      <audio ref="bubble_pop" :src="require('@/assets/music/sound/bubble_pop.ogg')" preload="auto"></audio>
      <!-- Buff Up -->
      <audio ref="buffUp" :src="require('@/assets/music/sound/buffUp.ogg')" preload="auto"></audio>
      <!-- Countdown -->
      <audio ref="countdown" :src="require('@/assets/music/sound/countdown.ogg')" preload="auto"></audio>
      <!-- Game Over -->
      <audio ref="game_over_1" :src="require('@/assets/music/sound/game_over_1.wav')" preload="auto"></audio>
      <!-- Joined -->
      <audio ref="joined" :src="require('@/assets/music/sound/joined.ogg')" preload="auto"></audio>
      <!-- Victory -->
      <audio ref="victory" :src="require('@/assets/music/sound/victory.ogg')" preload="auto"></audio>
      <audio ref="win" :src="require('@/assets/music/sound/win.mp3')" preload="auto"></audio>
      <!-- Invite -->
      <audio ref="invite" :src="require('@/assets/music/sound/invite.ogg')" preload="auto"></audio>
      <!-- Add Score -->
      <audio ref="add_score" :src="require('@/assets/music/sound/add_score.ogg')" preload="auto"></audio>
      <!-- Confirmation -->
      <audio ref="confirmation" :src="require('@/assets/music/sound/confirmation.ogg')" preload="auto"></audio>
      <!-- Joined Room -->
      <audio ref="joined_room" :src="require('@/assets/music/sound/joined_room.ogg')" preload="auto"></audio>
      <!-- Ingame Countdown -->
      <audio ref="ingame_countdown" :src="require('@/assets/music/sound/ingame_countdown.ogg')" preload="auto"></audio>


   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   name: "AudioComp",
   computed: mapState({
      // BGM COLLECTION (Boolean);
      lith: state => state.audio.bgm.lith,
      elinia: state => state.audio.bgm.elinia,

      // SOUND COLLECTION (Key);
      card_flip: state => state.audio.sound.card_flip,
      cardFlip: state => state.audio.sound.cardFlip,
      bubble_pop: state => state.audio.sound.bubble_pop,
      quickWind: state => state.audio.sound.quickWind,
      buffUp: state => state.audio.sound.buffUp,
      countdown: state => state.audio.sound.countdown,
      game_over_1: state => state.audio.sound.game_over_1,
      joined: state => state.audio.sound.joined,
      victory: state => state.audio.sound.victory,
      win: state => state.audio.sound.win,
      invite: state => state.audio.sound.invite,
      add_score: state => state.audio.sound.add_score,
      confirmation: state => state.audio.sound.confirmation,
      joined_room: state => state.audio.sound.joined_room,
      ingame_countdown: state => state.audio.sound.ingame_countdown,
   }),
   methods: {
      trigger_audio(ref, playOrPause) { // ref = name, playOrPause = true || false;
         if (playOrPause || playOrPause === undefined) { // If play, (false is pause);
            if (this.$refs[ref].paused) {
               this.$refs[ref].play();
            } else {
               this.$refs[ref].currentTime = 0;
            }
            this.$refs[ref].play();
         } else { // If pause,
            this.$refs[ref].pause();
         }
      }
   },
   watch: {
      // BGM COLLECTION (Boolean);
      lith(newVal) { this.trigger_audio('lith', newVal) },
      elinia(newVal) { this.trigger_audio('elinia', newVal); },
      
      // SOUND COLLECTION (Key);
      card_flip() { this.trigger_audio('card_flip') },
      cardFlip() { this.trigger_audio('cardFlip') },
      bubble_pop() { this.trigger_audio('bubble_pop') },
      quickWind() { this.trigger_audio('quickWind') },
      buffUp() { this.trigger_audio('buffUp') },
      countdown() { this.trigger_audio('countdown') },
      game_over_1() { this.trigger_audio('game_over_1') },
      joined() { this.trigger_audio('joined') },
      victory() { this.trigger_audio('victory') },
      win() { this.trigger_audio('win') },
      invite() { this.trigger_audio('invite') },
      add_score() { this.trigger_audio('add_score') },
      confirmation() { this.trigger_audio('confirmation') },
      joined_room() { this.trigger_audio('joined_room') },
      ingame_countdown() { this.trigger_audio('ingame_countdown') },
   },
   mounted() {
      Object.keys(this.$refs).forEach( ref => {
         if (ref === 'joined_room' || ref === 'win' || ref === 'quickWind') {
            this.$refs[ref].volume = 0.3;
         } else if (ref === 'victory') {
            this.$refs[ref].volume = 0.5;
         } else {
            this.$refs[ref].volume = 0.6;
         }
      });
   }
};
</script>