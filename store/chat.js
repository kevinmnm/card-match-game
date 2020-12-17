export const state = () => ({
   global_chat: []
});

export const mutations = {
   GLOBAL_CHAT(state, payload) {
      state.global_chat.push(payload);
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