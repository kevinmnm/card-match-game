export const state = () => ({
   show_room: false,
   room_info: null,
   room_chat: [],
   game_starting: false
})

export const mutations = {
   SHOW_ROOM(state, payload) {
      state.show_room = payload;
   },
   ROOM_INFO_UPDATE(state, payload) { // payload = { roomInfo: ... };
      state.room_info = payload;
   },
   ROOM_INFO_CREATE(state, payload) { // Also used for "update-room" event;
      state.room_info = payload;

      if (payload) { // If room info payload was sent,
         if (state.room_info.capacity === state.room_info.joined) { // pre-start (countdown) the game if full;
            state.game_starting = true;
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
      if (payload.chat_type === 'yellow') {
         state.room_chat.push(
            {
               // chat_val: payload.chat_value + ' has joined the room.',
               // chat_val: ( () => (payload.join) ? 
               //    payload.chat_value + ' has joined the room.' : 
               //    payload.chat_value )(),
               chat_val: ( () => {
                  if (payload.join) {
                     return payload.chat_value + ' has joined the room';
                  } else {
                     return payload.chat_value + ' has left the room';
                  }
               } )(),
               chat_style: "text-align:center; color:#FFFF00; font-size: 16px; background: #000000;"
            }
         )
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
         // setTimeout( () => {
            this.state.card.my_turn_temp_disable = false;
         // }, 1000);
      }
   }
}
