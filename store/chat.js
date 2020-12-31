export const state = () => ({
   global_chat: [],
   global_room_clients: [],
});

export const mutations = {
   GLOBAL_CHAT(state, payload) {
      state.global_chat.push(payload);
   },
   GLOBAL_ROOM_CLIENTS(state, payload) {
      state.global_room_clients = payload
   }
}




/**

{
   type: 'all-my-chat',
   displayName: '',
   chat: '',
   style: {
      position: relative,
      font-size: 14px,
      width: 100%,
      padding: 2px,
      text-align: right
   }
}

{
   type: 'all-other-chat',
   displayName: '',
   chat: '',
   style: {
      position: relative,
      font-size: 14px,
      width: 100%,
      padding: 2px,
      text-align: left
   }
}

**/