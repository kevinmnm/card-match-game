export const state = () => ({
   show_room: false,
   room_info: null,
})

export const mutations = {
   SHOW_ROOM(state, payload) {
      state.show_room = payload;
   },
   ROOM_INFO_CREATE(state, payload) {
      state.room_info = payload;
   },
   ROOM_INFO_LEAVE(state, payload) {
      state.room_info.joined--;
      console.log(this.state.general);
   },
   ROOM_UPDATE(state, payload) { // Should come as { action: 'join', data: newPlayer };
      if (payload.action === 'join') { // If a new player joined existing room,
         state.room_info.players.player_2 = payload.data;
      }
   }

}

export const actions = {
   async leave_game() {
      const response = await fetch(window.server_url, {

      })
   }
}