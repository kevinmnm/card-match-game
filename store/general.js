export const state = () => ({
   // server_url: 'http://localhost:5555',
   signed_in: false,
   connect_socket: false,
   my_display_name: ''
})

export const mutations = {
   SIGNED_IN(state, payload) {
      state.signed_in = payload;
   },
   CONNECT_SOCKET(state, payload) {
      state.connect_socket = payload;
   },
   MY_DISPLAY_NAME(state, payload) {
      state.my_display_name = payload;
   }
}