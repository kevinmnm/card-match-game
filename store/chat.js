export const state = () => ({
   chosen_chat: "LOBBY",
   global_chat: [],
   global_room_clients: [],
   my_chat_style: {
      position: "relative",
      "font-size": "14px",
      width: "100%",
      padding: "2px",
      "text-align": "right",
   },
   friend_whisper: {},
   friend_whisper_badge: {}, 
   friend_whisper_key: 0,
   new_whisper_badge: false,
   badge_key: 0,
   get_detailed_friend_list_key: 0,
});

export const mutations = {
   CHOSEN_CHAT(state, chat) {
      state.chosen_chat = chat;
   },
   GLOBAL_CHAT(state, payload) {
      state.global_chat.push(payload);
   },
   DELETE_GLOBAL_CHAT(state) {
      state.global_chat = [];
   },
   GLOBAL_ROOM_CLIENTS(state, payload) {
      state.global_room_clients = payload
   },
   FRIEND_WHISPER(state, payload) { // Payload = type, senderDisplayName, chatContent;
      if (!state.friend_whisper[payload.receiverDisplayName]) {
         state.friend_whisper[payload.receiverDisplayName] = [];
         state.friend_whisper_badge[payload.receiverDisplayName] = false;
      }
      if (!state.friend_whisper[payload.senderDisplayName]) {
         state.friend_whisper[payload.senderDisplayName] = [];
         state.friend_whisper_badge[payload.senderDisplayName] = false;
      }

      let my_display_name = this.state.general.my_display_name;
      let chat_style, chat_content;

      if (payload.type === 'friend-whisper-failed') {
         chat_style = "text-align:center; color:red; background:black;";
         chat_content = {
            chat: "User is currently unable to receive message",
            style: chat_style
         }
         state.friend_whisper[payload.receiverDisplayName].push(chat_content);
         state.friend_whisper_key++;
         return;
      }
      
      if (payload.senderDisplayName === my_display_name) { // If I'm the sender, 
         chat_style = "text-align:right; color:whiteSmoke;";
         chat_content = {
            chat: payload.chatContent,
            style: chat_style
         }
         state.friend_whisper[payload.receiverDisplayName].push(chat_content);
      } else { // If I'm the receiver,
         chat_style = "text-align:left; color:greenYellow;";
         chat_content = {
            chat: payload.chatContent,
            style: chat_style
         }
         state.friend_whisper[payload.senderDisplayName].push(chat_content);
         if (state.chosen_chat !== payload.senderDisplayName) {
            if (!state.friend_whisper_badge[payload.senderDisplayName]) {
               state.get_detailed_friend_list_key++;
               this.commit('audio/PLAY_SOUND', 'new_whisper');
            }
            state.friend_whisper_badge[payload.senderDisplayName] = true;
            state.new_whisper_badge = true;
         }
      }

      state.friend_whisper_key++;
      state.badge_key++;
   },
   REMOVE_FRIEND_WHISPER_BADGE(state, displayName) {
      state.friend_whisper_badge[displayName] = false;

      let whisperValues = Object.values(state.friend_whisper_badge);
      let clear = true;
      for (let i=0; i<whisperValues.length; i++) {
         if (whisperValues[i]) {
            clear = false;
            break;
         }
      }
      if (clear) state.new_whisper_badge = false;
      state.badge_key++;
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