export const state = () => ({
   guest_display_name: '', // Will be set when user choose to play as guest.
   guest_info: null 
})

export const mutations = {
   GUEST_DISPLAY_NAME(state, payload) {
      state.guest_display_name = payload;
   },
   GUEST_INFO(state, payload) {
      state.guest_info = payload;
   }
}

export const actions = {
   async fetch_guest_info({ commit, state }, payload) {
      const resp = await fetch(window.server_url + '/guest', {
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
         body: JSON.stringify({
            action: 'verify',
            displayName: state.guest_display_name
         })
      });

      const guest = await resp.json();

      commit('GUEST_INFO', guest);
      
   },
   fetch_create_guest({ commit, state }, payload) {

   }
}

