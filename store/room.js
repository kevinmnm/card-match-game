export const state = () => ({
   show_room: false,
   room_info: null,
   room_chat: [] // <div class='my-chat'>, <div class='opponent-chat'>
})

export const mutations = {
   SHOW_ROOM(state, payload) {
      state.show_room = payload;
   },
   ROOM_INFO_CREATE(state, payload) { // Also used for "update-room" event;
      state.room_info = payload;
   },
   SET_ROOM_CHAT(state, payload) {
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
               chat_val: payload.chat_value + ' has joined the room.',
               chat_val: (() => (payload.join) ? payload.chat_value + ' has joined the room.' : payload.chat_value )(),
               chat_style: "text-align:center; color:#FFFF00; font-size: 16px;"
            }
         )
      }
   }
}
