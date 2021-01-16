export const state = () => ({
   user_display_name: '',
   user_info: null,
   refresh_friend_list: 0,
})

export const mutations = {
   USER_DISPLAY_NAME(state, payload) {
      state.user_display_name = payload;
   },
   USER_INFO(state, payload) {
      state.user_info = payload;
   },
   REFRESH_FRIEND_LIST(state) {
      state.refresh_friend_list++;
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
      commit('REFRESH_FRIEND_LIST');

      if (state.user_info.friend_pending.length === 1) {
         this.commit('alert/SHOW_ALERT', {
            msg: "You have a new friend request!",
            buttons: [
               {
                  text: "Accept",
                  color: "success",
                  action: ($store) => {
                     window.socket.emit("friend-request", {
                        action: "accept",
                        requesterDisplayName: state.user_info.friend_pending[0].displayName,
                        playerInfo: state.user_info,
                     });
                     $store.commit('alert/RESET_ALERT');
                  }
               },
               {
                  text: "Reject",
                  color: "error",
                  action: () => {
                     window.socket.emit("friend-request", {
                        action: "reject",
                        requesterDisplayName: state.user_info.friend_pending[0].displayName,
                        playerInfo: state.user_info,
                     });
                     $store.commit('alert/RESET_ALERT');
                  }
               }
            ]
         });
      } else if (state.user_info.friend_pending.length > 1) {
         this.commit('alert/SHOW_ALERT', {
            msg: `You have ${state.user_info.friend_pending.length} new frield requests. Please go to your user information to view them.`,
            buttons: [
               { 
                  text: "Ok", 
                  action: ($store) => { $store.state.commit('alert/RESET_ALERT'); },
                  color: "primary"  
               }
            ]
         });
      }
   }
}