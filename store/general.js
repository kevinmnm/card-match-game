export const state = () => ({
   // server_url: 'http://localhost:5555',
   signed_in: false
})

export const mutations = {
   SIGNED_IN(state, payload) {
      state.signed_in = payload;
   }
}