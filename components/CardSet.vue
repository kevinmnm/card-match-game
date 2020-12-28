<template>
   <v-sheet class="pa-0 ma-0 d-flex flex-wrap card-wrapper" :style="(my_turn && !my_turn_temp_disable) ? turnStyle : null">
      <v-overlay absolute z-index="1" class="text-center" opacity="0.6" v-if="show_loading">
         <span>Loading...</span>
         <Loading />
      </v-overlay>

      <v-overlay absolute z-index="2" color="blue" class="text-center" opacity="0.9" v-if="show_endGameScreen">
         <EndGameScreen />
      </v-overlay>
      
      
      <v-card
         class="pa-0 ma-0"
         :ripple="false"
         hover
         tile
         v-for="(all, ind) in card_array"
         :key="all + ind"
         :width="card_size"
         :height="card_size"
         color="primary"
         @click="card_flip(all, ind)"
         :disabled="!my_turn || my_turn_temp_disable"
      >
         <transition name="flip" class="d-flex flex-wrap" tag="div" :key="card_key" mode="out-in">
            <!-- <v-img
               :src="(all.show) ? require(`@/assets/img/card/set_1/${all.card_id}.png`) : require(`@/assets/img/card/cover/default_white.png`)"
               :key="all.show"
            >
            </v-img> -->
            <v-img v-if="!all.show" :src="require(`@/assets/img/card/set_2/${all.card_id}.png`)" :key="all.show" style="background: red;"></v-img>
            <v-img v-else :src="require(`@/assets/img/card/cover/default_white.png`)" :key="all.show"></v-img>
         </transition>

      </v-card>

   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";
import EndGameScreen from "@/components/EndGameScreen.vue";

export default {
   name: "CardSetComp",
   props: ["myTurn"],
   components: { Loading, EndGameScreen },
   data() {
      return {
         show_loading: false,
         // flipped_tracker: [],
         turnStyle: 'box-shadow: 0 0 10px yellow, 0 0 10px yellow,0 0 10px yellow;',
         starter_track: 0
      }
   },
   computed: {
      my_turn() { // Sets initial turn to player_1 on game start;
         return this.myTurn;
      },
      my_turn_temp_disable() {
         return this.$store.state.card.my_turn_temp_disable;
      },
      current_turn_player() {
         return this.$store.state.room.room_info.turn;
      },
      card_array() {
         return this.$store.state.room.room_info.cardSet;
      },
      card_key() {
         return this.$store.state.card.card_key;
      },
      card_count() {
         return this.$store.state.room.room_info.cardCount;
      },
      card_size() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return "60px"; // < 600px -- 60px
            case "sm":
               return "100px"; // 600px > < 960px -- 80px
            case "md":
               return "100px"; // 960px > < 1264px* -- 100px
            case "lg":
               return "120px"; // 1264px > < 1904px* -- 100px
            case "xl":
               return "120px"; // > 1904px* -- 100px
         }
      },
      game_started() {
         return this.$store.state.room.room_info.start;
      },
      room_number() {
         return this.$store.state.room.room_info.room_number;
      },
      default_countdown() {
         return this.$store.state.room.room_info.countdown;
      },
      flipped_tracker() {
         return this.$store.state.card.flipped_tracker;
      },
      show_endGameScreen() {
         return this.$store.state.general.end_game_screen;
      }
   },
   methods: {
      card_flip(card, ind) {
         // this.flipped_tracker.push(card);
         this.$store.commit('card/FLIPPED_TRACKER', { action: 'push', flippedCard: card });

         let changed_card = {
               ...card,
               show: true
            }

         this.$store.commit("room/ROOM_CARD", { card: changed_card, cardIndex: ind } );

         window.socket.emit('card-flip', { 
            roomNumber: this.room_number, 
            card: changed_card, 
            cardIndex: ind,
            flippedAmount: this.flipped_tracker.length
         });

         if (this.flipped_tracker.length === 2) { // If player flipped 2 cards,
            this.$store.commit('card/MY_TURN_TEMP_DISABLE', true); // Temporarily disable my turn (ensures quick disabling);

            if (this.flipped_tracker[0].card_id === this.flipped_tracker[1].card_id) { // If matching cards found,
               this.$store.commit('card/MY_TURN_TEMP_DISABLE', false); // Enable my turn again;
               
               window.socket.emit('room-player-update', { // DB score + 10 and set matched card show to true;
                  action: 'add-score', 
                  currentPlayer: this.current_turn_player, 
                  roomNumber: this.room_number,
                  cardMatch: this.flipped_tracker
               });

               // this.flipped_tracker = []; // Empty out comparison array;
               this.$store.commit('card/FLIPPED_TRACKER', { action: 'clear' });


            } else { // If no matching cards found,
               window.socket.emit('pause-countdown', this.room_number); // Request pause countdown for both clients;

               setTimeout( () => { // Change turn after some delay;
                  window.socket.emit('change-turn', { 
                     current: this.current_turn_player, 
                     roomNumber: this.room_number,
                     roomCapacity: this.$store.state.room.room_info.capacity
                  });

                  // this.flipped_tracker = [];
                  this.$store.commit('card/FLIPPED_TRACKER', { action: 'clear' });

               }, 1500);
            }
         }
      }
   },
   watch: {
      game_started(val) {
         let card_array_length = this.card_array.length; // Flipped card length in array;
         let time_delay = 0; // Initial loading setInterval time delay;
         
         if (val) { // If game_started value is true in store,
            this.$store.commit('card/MY_TURN_TEMP_DISABLE', true); // Temporarily disable my turn;
            this.show_loading = true; // Show loading component;

            let id_1 = setTimeout( () => {
               this.show_loading = false;

               for (let i=0; i<card_array_length; i++) {
                  setTimeout( () => {
                     if (this.$store.state.room.room_info === null || !this.game_started) return;
                     this.$store.commit('room/INITIAL_CARD_SHOW_TRIGGER', { show_card: true, card_index: i });  // payload = {show_card: true || false, card_index: ...}
                  }, time_delay);

                  setTimeout( () => {
                     if (this.$store.state.room.room_info === null || !this.game_started) return;
                     this.$store.commit('room/INITIAL_CARD_SHOW_TRIGGER', { show_card: false, card_index: i });
                  }, time_delay + 500);

                  time_delay = time_delay + 200;
               }
            }, 1000);
         }
      },
      my_turn_temp_disable(val) { // Watching this value (changes every turn including start);
         // if (!val) { // If false (if it's player's turn),
         this.starter_track++;
         if (this.starter_track === 1) {
            this.$store.dispatch('card/countdown_function', true); // Trigger countdown;
         }
         // }

         // if (this.countdown_interval) { // If countdown is already in progress,
         //    clearInterval(this.countdown_interval); // Terminate current countdown
         // }
         // const countdownId = setInterval( () => { // Decrease countdown state per second;
         //    if (this.$store.state.card.countdown === 0) {
         //       clearInterval(countdownId); // May need to use this.$store.state.card.countdown_interval instead;

               /**
                * 
                * Logic to flip selected card back and change turn to opponent's; 
                * If it's not my turn, just wait until server responses;
                * 
               **/

               // if (!this.my_turn_temp_disable) {

               // }
            // }
            // let timeLeft = this.$store.state.card.countdown - 1; 
            // this.$store.commit('card/COUNTDOWN', timeLeft);
         // }, 1000);

         // this.$store.commit('card/COUNTDOWN_INTERVAL', countdownId); // Store countdown id in store;
      }
   },
   mounted() {
      this.$store.commit('card/COUNTDOWN', this.default_countdown); // Set room countdown value;
   },
   destroyed() {
      this.$store.commit('card/COUNTDOWN', null);
   }

};

</script>

<style lang="scss" scoped>

.flip-enter {
   transform: rotateY(94deg);
}

.flip-enter-active {
   transition: all 0.1s;
   // box-shadow: -20px 0 20px black;
   box-shadow: -10px 0 10px black;

   position: absolute;
}

.flip-enter-to {
   box-shadow: none;
}

.flip-leave-active {
   transition: all 0.1s;
   position: absolute;
   transform: rotateY(86deg);
   // box-shadow: 20px 0 5px black;
   box-shadow: 10px 0 5px black;
}

.flip-leave-to {
   box-shadow: none;
}


</style>