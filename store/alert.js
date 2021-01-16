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
      console.log(payload);
      state.alert_msg = payload.msg;
      state.alert_buttons = payload.buttons;
      state.alert_html = payload.html;
      state.alert_show = true;
      state.alert_from = payload.from;
   }
}