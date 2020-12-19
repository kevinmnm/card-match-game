export const state = () => ({
   my_turn: false, // Allow click;
   card_key: 0
});

export const mutations = {
   MY_TURN(state, payload) {
      state.my_turn = payload;
   },
   CARD_KEY(state, payload) {
      state.card_key++
   }
};