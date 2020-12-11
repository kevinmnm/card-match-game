export const state = () => ({
   guest_display_name: ''
})

export const mutations = {
   GUEST_DISPLAY_NAME(state, payload) {
      state.guest_display_name = payload;
   }
}

export const actions = {
   async fetch_find_guest({ commit, state }, payload) {
      const resp = await fetch(window.server_url + '/guest', {
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
         body: JSON.stringify({
            action: 'verify',
            displayName: state.guest_display_name
         })
      });

      const res = await resp.json();
      
   },
   fetch_create_guest({ commit, state }, payload) {

   }
}

