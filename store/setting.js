export const state = () => ({
   bgm_volume: 0.5,
   sound_volume: 0.3,
   elinia_play: false,
   lith_play: false
})

export const mutations = {
   BGM_VOLUME(state, payload) {
      state.bgm_volume = payload;
      localStorage.bgm_volume = payload;
   },
   SOUND_VOLUME(state, payload) {
      state.sound_volume = payload;
      localStorage.sound_volume = payload;
   },
   ELINIA_PLAY(state, payload) { // payload = true || false;
      state.elinia_play = payload;
   },
   LITH_PLAY(state, payload) { // payload = true || false;
      state.lith_play = payload;
   }
}

export const actions = {
   set_bgm_volume({ commit }, payload) {
      commit('BGM_VOLUME', payload);
   },
   set_sound_volume({ commit }, payload) {
      commit('SOUND_VOLUME', payload);
   }
}