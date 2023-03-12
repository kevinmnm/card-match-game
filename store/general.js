export const state = () => ({
   // server_url: 
   signed_in: false,
   connect_socket: false,
   my_display_name: '',
   end_game_screen: false,
   end_game_message: '',
   global_loading: false,
   winner_1vs1: null,
   loser_1vs1: null,
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
   },
   CLOSE_END_GAME_SCREEN(state) {
      state.end_game_screen = false;
      state.end_game_message = '';
      state.winner_1vs1 = null;
      state.loser_1vs1 = null;
   },
   END_GAME_SCREEN(state, payload) { // payload = { winner: {...}, losers: [{...}, {...}], draws: [{...}, {...}] };
      state.end_game_screen = true;

      if (payload.winner) {
         if (Array.isArray(payload.winner)) { // If it's 2vs2,
            payload.winner.forEach( win => {
               if (win.displayName === state.my_display_name) {
                  state.end_game_message = 'VICTORY';
               }
            });
         } else { // If it's not 2vs2,
            state.winner_1vs1 = payload.winner;
            state.loser_1vs1 = payload.losers[0];
            console.log(state.winner_1vs1);
            console.log(state.loser_1vs1);
            if (payload.winner.displayName === state.my_display_name) {
               state.end_game_message = 'VICTORY';
            }
         }
      }

      if (payload.losers) {
         payload.losers.forEach( loser => {
            if (loser.displayName === state.my_display_name) {
               state.end_game_message = 'DEFEAT';
            }
         });
      }

      if (payload.draws) {
         payload.draws.forEach( draw => {
            if (draw.displayName === state.my_display_name) {
               state.end_game_message = 'DRAW';
            }
         });
      }
   },
   GLOBAL_LOADING(state, payload) {
      state.global_loading = payload;
   }
}