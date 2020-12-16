export const state = () => ({
   show_room: false,
   room_info: null,
})

export const mutations = {
   SHOW_ROOM(state, payload) {
      state.show_room = payload;
   },
   ROOM_INFO_CREATE(state, payload) { // Also used for "update-room" event;
      state.room_info = payload;
   },
   ROOM_INFO_LEAVE(state, payload) {
      state.room_info.joined--;
      console.log(this.state.general);
   },
}
