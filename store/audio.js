export const state = () => ({
   file_type: 'mp3',
   mp3_folder: 'mp3/',
   bgm: {  // If true, play. If false, pause;
      elinia: false,
      lith: false,
   },
   current_bgm: '',
   bgm_muted: false,
   sound: {
      card_flip: 0,
      bubble_pop: 0,
      cardFlip: 0,
      quickWind: 0,
      buffUp: 0,
      countdown: 0,
      game_over_1: 0,
      joined: 0,
      victory: 0,
      win: 0,
      invite: 0,
      add_score: 0,
      joined_room: 0,
      confirmation: 0,
      ingame_countdown: 0,
      
   },
   sound_muted: false,
});

export const mutations = {
   FILE_TYPE(state, payload) {
      state.file_type = payload;
   },
   MP3_FOLDER(state, payload) {
      state.mp3_folder = payload;
   },
   PLAY_BGM(state, bgmName) { // ex) bgmName = 'elinia';
      if (state.bgm_muted) return;
      let bgm_keys = Object.keys(state.bgm);
      bgm_keys.map( bg => {
         if (state.bgm[bg]) {
            state.bgm[bg] = false;
         }
      });
      state.bgm[bgmName] = true;
      state.current_bgm = bgmName;
   },
   PAUSE_BGM(state) {
      state.bgm[state.current_bgm] = false;
      state.current_bgm = '';
   },
   MUTE_BGM(state, payload) { // payload = true || false;
      state.bgm_muted = payload;
      state.current_bgm = '';
   },
   PLAY_SOUND(state, soundName) {
      if (state.sound_muted) return;
      state.sound[soundName]++;
   },
   MUTE_SOUND(state, payload) {
      state.sound_muted = payload;
   }
}

export const actions = {
   bgm_setting({ state, commit }, payload) { // payload = true || false;
      if (!payload) { // If player doesn't want music,
         let bgm_keys = Object.keys(state.bgm);
         bgm_keys.map( bgm => {
            commit('PAUSE_BGM', bgm);
         });
         commit('MUTE_BGM', true);
         localStorage.mute_bgm = true;

      } else { // If player wants music,
         commit('MUTE_BGM', false);
         commit('PLAY_BGM', 'elinia');
         localStorage.mute_bgm = false;
      }
   },
   sound_setting({ commit }, payload) { // payload = true || false;
      commit('MUTE_SOUND', payload);
      localStorage.mute_sound = payload;
   }
}