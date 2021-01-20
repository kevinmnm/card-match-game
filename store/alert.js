/**

   - PAYLOAD OPTIONS - 

   type: 'immediate' || 'lobby' <May be unnecessary>

   HTML: HTML   <innerHTML>

   buttons: [ 
      { text: String, color: String },
   ]

   msg: String 

**/

export const state = () => ({
   alert_show: false,
   alert_from: "",
   alert_msg: "",
   alert_html: "",
   alert_buttons: []
})

export const mutations = {
   RESET_ALERT(state) {
      state.alert_show = false;
      state.alert_msg = "";
      state.alert_buttons = [];
      state.alert_html = "";
      state.alert_from = "";
   },
   SHOW_ALERT(state, payload) {
      state.alert_msg = payload.msg;
      state.alert_buttons = payload.buttons;
      state.alert_html = payload.html;
      state.alert_from = payload.from;
      state.alert_show = true;
   },
   SPECIAL_ALERT(state, payload) {
      if (payload.type === 'game-invite') {
         const roomInfo = payload.payload.room;
         let buttonReject, buttonAccept;

         state.alert_html = `<b>${payload.invitor}</b> has invited you to a game.`;
         buttonReject = {
            text: "Reject",
            color: "error",
            action: ($store) => {
               $store.commit("alert/RESET_ALERT");
            },
         }
         buttonAccept = {
            text: "Accept",
            color: "success",
            action: () => {
               window.socket.emit('join-custom-game', {
                  roomInfo,
                  joinerInfo: this.state.user.user_info
               });
               this.commit("alert/RESET_ALERT");
            }
         }
         state.alert_buttons = [buttonReject, buttonAccept]
         state.alert_show = true;
      }
   }
}
