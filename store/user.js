export const state = () => ({
   user_display_name: '',
   user_info: null
})

export const mutations = {
   USER_DISPLAY_NAME(state, payload) {
      state.user_display_name = payload;
   },
   USER_INFO(state, payload) {
      state.user_info = payload;
   }
}

export const actions = {
   async fetch_user_info({ commit, state }, payload) {
      const response = await fetch(window.server_url + '/user', {
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
         body: JSON.stringify({
            displayName: state.user_display_name
         })
      });

      const res = await response.json();
      commit('USER_INFO', res.foundUser);
   }
}