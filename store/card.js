const initialState = {
   card_key: 0,
   my_turn_temp_disable: true, // True will disable player's turn temporarily;
   countdown: null, // Will be set on CardSet.vue load;
   countdown_interval_id: null,
   flipped_tracker: [],
}

export const state = () => ({
   card_key: 0,
   my_turn_temp_disable: true, // True will disable player's turn temporarily;
   countdown: null, // Will be set on CardSet.vue load;
   countdown_interval_id: null,
   flipped_tracker: [],
});

export const mutations = {
   INITIAL_STATE_CARD(state) {
      if (state.countdown_interval_id !== null) {
         clearInterval(state.countdown_interval_id);
      }
      state = { ...initialState };
   },
   CARD_KEY(state) {
      state.card_key++
   },
   MY_TURN_TEMP_DISABLE(state, payload) {
      state.my_turn_temp_disable = payload;
   },
   COUNTDOWN(state, payload){ // Payload = number;
      state.countdown = payload;
   },
   COUNTDOWN_INTERVAL_ID(state, payload) {
      state.countdown_interval_id = payload;
   },
   FLIPPED_TRACKER(state, payload) { // payload = { action: 'push' || 'clear', flippedCard };
      if (payload.action === 'push') {
         state.flipped_tracker.push(payload.flippedCard);
      } else if (payload.action === 'clear') {
         state.flipped_tracker = [];
      }
   },
   PAUSE_COUNTDOWN(state) {
      clearInterval(state.countdown_interval_id); // Pause current countdown;
      state.countdown = this.state.room.room_info.countdown; // Set countdown value to default;
      state.countdown_interval_id = null;
   }
 
};

export const actions = {
   countdown_function({ commit, state }, restart) {
      if (restart) { // If trigger is true,
         if (state.countdown_interval_id) { // If there is an exisiting interval,
            clearInterval(state.countdown_interval_id); // Terminate existing interval;
            commit('COUNTDOWN_INTERVAL_ID', null); // Clear exisitin interval id;
            commit('COUNTDOWN', this.state.room.room_info.countdown); // Set countdown value to default;
         }
         const intervalId = setInterval( () => { // Start countdown;
            let newTime = state.countdown - 1; // -1 every second;
            commit('COUNTDOWN', newTime); // Post new time;

            if (state.countdown === 0) { // If countdown is done;
               commit('MY_TURN_TEMP_DISABLE', true); // Disable my turn;
               clearInterval(state.countdown_interval_id);

               commit('FLIPPED_TRACKER', { action: 'clear' });
            
               setTimeout( () => { // Change turn after some delay;
                  window.socket.emit('change-turn', { 
                     current: this.state.room.room_info.turn, 
                     roomNumber: this.state.room.room_info.room_number,
                     roomCapacity: this.state.room.room_info.capacity
                  });

                  // this.flipped_tracker = [];
                  // commit('FLIPPED_TRACKER', { action: 'clear' });

               }, 1500);
            }
         }, 1000);

         commit('COUNTDOWN_INTERVAL_ID', intervalId); // Store running interval id;
      } else { // If trigger is false,
         setTimeout( () => {
            commit('PAUSE_COUNTDOWN');
         }, 1000);
      }
   }
}