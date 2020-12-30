export const state = () => ({
   bgm_volume: 0.5,
   sound_volume: 0.3,
   elinia_play: false,
   lith_play: false
})

export const mutations = {
   ELINIA_PLAY(state, payload) { // payload = true || false;
      state.elinia_play = payload;
   },
   LITH_PLAY(state, payload) { // payload = true || false;
      state.lith_play = payload;
   }
}
