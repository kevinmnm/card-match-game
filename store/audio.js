
export const state = () => ({
   bgm: {  // If true, play. If false, pause;
      elinia: false,
      lith: false,
   },
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
   },
   sound_muted: false,
});

export const mutations = {
   PLAY_BGM(state, bgmName) { // ex) bgmName = 'elinia';
      if (state.bgm_muted) return;
      state.bgm[bgmName] = true;
   },
   PAUSE_BGM(state, bgmName) { // ex) bgmName = 'elinia';
      state.bgm[bgmName] = false;
   },
   MUTE_BGM(state, payload) { // payload = true || false;
      state.bgm_muted = payload;
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
      } else { // If player wants music,
         commit('MUTE_BGM', false);
         commit('PLAY_BGM', 'elinia');
      }
   },
   sound_setting({ commit }, payload) { // payload = true || false;
      commit('MUTE_SOUND', payload);
   }
}