export const state = () => ({
   custom_room_list: [], // Will be an array;
   loading: false,
   show_custom_dialog: false,
});

export const mutations = {
   CUSTOM_ROOM_LIST(state, payload) {
      state.custom_room_list = payload;
   },
   LOADING(state, payload) {
      state.loading = payload;
   },
   SHOW_CUSTOM_DIALOG(state, payload) {
      state.show_custom_dialog = payload;
   }
}

export const actions = {
   async fetch_custom_room_list({ commit, state }) {
      commit('LOADING', true);
      const response = await fetch(window.server_url + '/custom', {
         headers: { 'Content-Type': 'application/json' },
         method: 'POST'
      });

      const res = await response.json();
      commit('CUSTOM_ROOM_LIST', res.roomList);
      commit('LOADING', false);
      commit('SHOW_CUSTOM_DIALOG', true);

      return state.custom_room_list;
   }

}