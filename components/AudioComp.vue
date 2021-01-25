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
      <audio ref="card_flip" :src="require(`@/assets/music/sound/${mp3_folder}card_flip.${file_type}`)" preload="auto"></audio>
      <audio ref="cardFlip" :src="require(`@/assets/music/sound/${mp3_folder}cardFlip.${file_type}`)" preload="auto"></audio>
      <!-- Quick Wind -->
      <audio ref="quickWind" :src="require(`@/assets/music/sound/${mp3_folder}quickWind.${file_type}`)" preload="auto"></audio>
      <!-- Bubble Pop -->
      <audio ref="bubble_pop" :src="require(`@/assets/music/sound/${mp3_folder}bubble_pop.${file_type}`)" preload="auto"></audio>
      <!-- Buff Up -->
      <audio ref="buffUp" :src="require(`@/assets/music/sound/${mp3_folder}buffUp.${file_type}`)" preload="auto"></audio>
      <!-- Countdown -->
      <audio ref="countdown" :src="require(`@/assets/music/sound/${mp3_folder}countdown.${file_type}`)" preload="auto"></audio>
      <!-- Game Over -->
      <audio ref="game_over_1" :src="require(`@/assets/music/sound/game_over_1.wav`)" preload="auto"></audio>
      <!-- Joined -->
      <audio ref="joined" :src="require(`@/assets/music/sound/${mp3_folder}joined.${file_type}`)" preload="auto"></audio>
      <!-- Victory -->
      <audio ref="victory" :src="require(`@/assets/music/sound/${mp3_folder}victory.${file_type}`)" preload="auto"></audio>
      <audio ref="win" :src="require(`@/assets/music/sound/${mp3_folder}win.mp3`)" preload="auto"></audio>
      <!-- Invite -->
      <audio ref="invite" :src="require(`@/assets/music/sound/${mp3_folder}invite.${file_type}`)" preload="auto"></audio>
      <!-- Add Score -->
      <audio ref="add_score" :src="require(`@/assets/music/sound/${mp3_folder}add_score.${file_type}`)" preload="auto"></audio>
      <!-- Confirmation -->
      <audio ref="confirmation" :src="require(`@/assets/music/sound/${mp3_folder}confirmation.${file_type}`)" preload="auto"></audio>
      <!-- Joined Room -->
      <audio ref="joined_room" :src="require(`@/assets/music/sound/${mp3_folder}joined_room.${file_type}`)" preload="auto"></audio>
      <!-- Ingame Countdown -->
      <audio ref="ingame_countdown" :src="require(`@/assets/music/sound/${mp3_folder}ingame_countdown.${file_type}`)" preload="auto"></audio>
      <!-- New Whisper -->
      <audio ref="new_whisper" :src="require(`@/assets/music/sound/new_whisper.wav`)" preload="auto"></audio>

   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   name: "AudioComp",
   data: () => ({ 
      // file_type: '',
      // mp3_folder: '', 
   }),
   computed: mapState({
      file_type: state => state.audio.file_type,
      mp3_folder: state => state.audio.mp3_folder,
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
      new_whisper: state => state.audio.sound.new_whisper,
   }),
   methods: {
      trigger_audio(ref, playOrPause) { // ref = name, playOrPause = true || false;
         if (localStorage.__ios === 'false') { // If NOT IOS device,
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
         } else { // If IOS device,
            if (playOrPause || playOrPause === undefined) { // If play, (false is pause);
               this.$refs[ref].load();
               this.$refs[ref].play();
            } else { // If pause,
               this.$refs[ref].pause();
            }
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
      new_whisper() { this.trigger_audio('new_whisper') },
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
   },
   // beforeMount() {
   //    if (localStorage.__ios === 'true') {
   //       this.file_type = 'mp3';
   //       this.mp3_folder = 'mp3/';
   //    } else {
   //       this.file_type = 'ogg';
   //       this.mp3_folder = '';
   //    }
   // }
};
</script>