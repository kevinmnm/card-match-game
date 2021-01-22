export const state = () => ({
   room_type: '', // Should be reset when leaving game; // 'quick' || 'custom';
   show_room: false,
   room_info: null,
   room_chat: [],
   game_starting: false,
   beginning_preview_flipping: false,
   ready_button_key: 0,
})

export const mutations = {
   RESET_SCORE(state) { // TEMPORARY QUICK-FIX FOR NOW;
      // console.warn('triggered');
      if (!state.room_info) return;
      // console.warn('executing');
      let playerKey = Object.keys(state.room_info.players);
      // console.warn(`playerKey: ${playerKey}`);
      playerKey.forEach( key => {
         state.room_info.players[key].score = 0;
         // console.warn(`Players score: ${state.room_info.players[key].score}`);
      });
   },
   BEGINNING_PREVIEW_FLIPPING(state, payload) {
      state.beginning_preview_flipping = payload;
   },
   SHOW_ROOM(state, payload) {
      state.show_room = payload;
   },
   ROOM_TYPE(state, payload) {
      state.room_type = payload;
   },
   ROOM_INFO_UPDATE(state, payload) { // payload = { ...roomInfo };
      state.room_info = {
         ...state.room_info,
         ...payload
      }
      if (!payload.start) {
         state.game_starting = false;
      }
   },
   ROOM_INFO_CREATE(state, payload) { // Also used for "update-room" event;
      state.room_info = payload;

      if (payload) { // If room info payload was sent,

         if (state.room_info.capacity === state.room_info.joined) { // pre-start (countdown) the game if full;
            if (!state.room_info.terminate && state.room_type === 'quick') { // If room doens't needs to be terminated,
               state.game_starting = true;
            }
         } else {
            state.game_starting = false;
         }
      }
   },
   SET_ROOM_CHAT(state, payload) {
      if (!payload) {
         return state.room_chat = [];
      }
      state.room_chat = payload;
   },
   OPPONENT_ROOM_CHAT(state, payload) { // payload = {room_number: 'room#', my_display_name: 'sdf', chat_value: 'sss'};
      state.room_chat.push(
         { 
            chat_val: payload.chat_value,
            chat_sender: payload.my_display_name,
            chat_style: "text-align:left; color:white; font-size:18px;"
         }
      );
   },
   MY_ROOM_CHAT(state, payload) { // payload = {chat_value: 'some chat'}
      state.room_chat.push(
         { 
            chat_val: payload.chat_value, 
            chat_style: "text-align:right; color:white; font-size:18px;"
         }
      );
   },
   SYSTEM_ROOM_CHAT(state, payload) { // payload = {chat_value: 'chat', chat_type: 'blue || red || yellow', join: true || false};
      if (payload.chat_type === 'yellow') { // Chat yellow;
         state.room_chat.push(
            {
               chat_val: ( () => {
                  if (payload.join === true) {
                     return payload.chat_value + ' has joined the room';
                  } else if (payload.join === false) {
                     return payload.chat_value + ' has left the room';
                  } else if (payload.kicked === true) {
                     return payload.chat_value + ' has been kicked from room'
                  }
               } )(),
               chat_style: "text-align:center; color:#FFFF00; font-size: 16px; background: #000000; margin-bottom:2px;"
            }
         )
      } else if (payload.chat_type === 'red') { // Chat red;
         state.room_chat.push(
            {
               chat_val: payload.chat_value,
               chat_style: "text-align:center; color:#FF0000; font-size: 16px; background: #000000; margin-bottom:2px;"
            }
         );
      } else if (payload.chat_type === 'green') { // Chat green;
         state.room_chat.push( 
            {
               chat_val: payload.chat_value,
               chat_style: "text-align:center; color:#90EE90; font-size:16px; background:#000000; margin-bottom:2px;"
            }
         );
      } else if (payload.chat_type === 'sky') { // Chat sky;
         state.room_chat.push(
            {
               chat_val: payload.chat_value,
               chat_style: "text-align:center; color:#87CEFA; font-size:16px; background:#000000; margin-bottom:2px;"
            }
         );
      }
   },
   GAME_STARTING(state, payload) {
      state.game_starting = payload;
   },
   GAME_STARTED(state, payload) { // payload = { room };
      state.room_info = payload.room;
   },
   ROOM_CARD(state, payload) { // payload = { card, cardIndex };
      state.room_info.cardSet[payload.cardIndex] = payload.card;
      this.state.card.card_key++;
   },
   INITIAL_CARD_SHOW_TRIGGER(state, payload) { // payload = {show_card: true || false, card_index: ...}
      state.room_info.cardSet[payload.card_index].show = payload.show_card;

      if (payload.card_index === state.room_info.cardSet.length - 1 && !payload.show_card) {
         this.state.card.my_turn_temp_disable = false;
         state.beginning_preview_flipping = false;
         if (state.room_info.capacity === 2 && state.room_type === 'custom') {
            this.dispatch('card/countdown_function', true);
         }
      }
   },
   POSITION_CHANGED(state, payload) {
      state.room_info.players = payload.new_players;
      state.ready_button_key++;
   },
   UPDATE_SPECTATORS_ONLY(state, payload) {
      state.room_info.spectators = payload;
   }
   // UPDATE_ROOM_PLAYERS(state, payload) { // Updates players only;
   //    state.room.room_info.players = {

   //    }
   // }
}
