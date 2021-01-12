<template>
   <v-sheet class="pa-0 ma-0 d-flex flex-wrap" :style="(my_turn && !my_turn_temp_disable) ? turnStyle : null">
      <v-overlay absolute z-index="1" class="text-center" opacity="0.6" v-if="show_loading">
         <span>Loading...</span>
         <Loading />
      </v-overlay>

      <!-- <v-overlay z-index="2" color="blue" class="text-center" opacity="1" v-if="show_endGameScreen">
         <EndGameScreen />
      </v-overlay> -->
      <!-- <div style="position:absolute; z-index:2; width:100%; height:100%;" v-if="show_endGameScreen">
         <EndGameScreen />
      </div> -->
<!-- IF QUICK GAME -->
      <v-sheet v-if="room_type === 'quick'" class="card-set-wrapper pa-0 ma-0 d-flex flex-wrap" width="100%" height="100%">

         <div style="position:absolute; z-index:2; width:100%; height:100%;" v-if="show_endGameScreen">
            <EndGameScreen />
         </div>

         <v-card
            class="pa-0 ma-0"
            :ripple="false"
            hover
            tile
            v-for="(all, ind) in card_array"
            :key="all + ind"
            :width="card_size"
            :height="card_size"
            @click="room_capacity === 2 ? card_flip(all, ind) : card_flip_two_vs_two(all, ind)"
            :disabled="!my_turn || my_turn_temp_disable"
            color="deep-purple accent-5"
         >
            <transition name="flip" class="d-flex flex-wrap" tag="div" :key="card_key" mode="out-in">
               <!-- <v-img
                  :src="(all.show) ? require(`@/assets/img/card/set_1/${all.card_id}.png`) : require(`@/assets/img/card/cover/default_white.png`)"
                  :key="all.show"
               >
               </v-img> -->
               <!-- <v-img v-if="!all.show" :src="require(`~/assets/img/card/${window_width > 600 ? 'cover' : 'cover_low'}/default_white.png`)" :key="all.show" eager style="z-index: 1;"></v-img> -->
               <v-img v-if="(dev_env) ? all.show : !all.show" :src="require(`~/assets/img/card/${window_width > 600 ? 'cover' : 'cover_low'}/default_white.png`)" :key="all.show" eager style="z-index: 1;"></v-img>
               <v-img v-else :src="require(`~/assets/img/card/${window_width > 600 ? 'classic' : 'classic_low'}/${all.card_id}.png`)" :key="all.show"></v-img>
            </transition>

         </v-card>
      </v-sheet>

      <!-- <v-sheet v-if="room_type === 'custom'" class="pa-0 ma-0" width="100%" height="100%">
         <v-card
            class="ma-0 pa-0"
            :width="screen_layout === 'horizontal' ? card_size_horizontal : $vuetify.breakpoint.width / 6 + 'px'"
            :height="screen_layout === 'horizontal' ? card_size_horizontal : $vuetify.breakpoint.width / 6 + 'px'"
            v-for="all in 36" :key="all"
         >
            {{all}}
         </v-card>
      </v-sheet> -->

<!-- IF CUSTOM GAME -->
      <v-sheet v-if="room_type === 'custom'">
         
         <v-responsive
            :aspect-ratio="1 / 1"
            :width="screen_layout === 'horizontal' ? +(card_size_horizontal.replace('px','')) * 6 + 'px' : window_width"
            :height="screen_layout === 'horizontal' ? +(card_size_horizontal.replace('px','')) * 6 + 'px' : 'auto'"
            class="ma-auto responsive-content-class pa-0"
         >
            <div v-if="!game_started" style="position:absolute; z-index:2; width:100%; height:100%;">
               <EndGameScreen v-if="show_endGameScreen" />
               <TerminateScreen v-if="!show_endGameScreen && terminate_room" />
               <CardOverlay v-if="!show_endGameScreen && !terminate_room" />
            </div>

            <v-card
               class="card-set ma-0 pa-0"
               :width="screen_layout === 'horizontal' ? card_size_horizontal : $vuetify.breakpoint.width / 6 + 'px'"
               :height="screen_layout === 'horizontal' ? card_size_horizontal : $vuetify.breakpoint.width / 6 + 'px'"
               :ripple="false"
               hover
               tile
               v-for="(all, ind) in card_array"
               :key="all + ind"
               color="primary"
               @click="room_capacity === 2 ? card_flip(all, ind) : card_flip_two_vs_two(all, ind)"
               :disabled="!my_turn || my_turn_temp_disable"
            >
               <transition name="flip" class="d-flex flex-wrap" tag="div" :key="card_key" mode="out-in">
                  <v-img v-if="(dev_env) ? all.show :!all.show" :src="require(`@/assets/img/card/cover_low/default_white.png`)" :key="all.show" style="z-index: 1;" eager></v-img>
                  <v-img v-else :src="require(`@/assets/img/card/${game_theme}_low/${all.card_id}.png`)" :key="all.show"></v-img>
               </transition>
            </v-card>
         </v-responsive>
      </v-sheet>

   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";
import EndGameScreen from "@/components/EndGameScreen.vue";
import CardOverlay from "@/components/CardOverlay.vue";
import TerminateScreen from "@/components/TerminateScreen.vue";

export default {
   name: "CardSetComp",
   props: ["myTurn"],
   components: { Loading, EndGameScreen, CardOverlay, TerminateScreen },
   data() {
      return {
         show_loading: false,
         // flipped_tracker: [],
         turnStyle: 'box-shadow: 0 0 10px yellow, 0 0 10px yellow,0 0 10px yellow;',
         starter_track: 0,
         dev_env: false
      }
   },
   computed: {
      window_width() {
         return this.$vuetify.breakpoint.width;
      },
      window_height() {
         return this.$vuetify.breakpoint.height;
      },
      screen_layout() {
         if (this.window_width > this.window_height) { // If device is horizontal (likely a PC),
            return 'horizontal';
         } else if (this.window_width <= this.window_height) { // If device is vertical (likely a phone),
            return 'vertical';
         }
      },
      card_size_horizontal() {
         return (this.window_height * 0.7) / 6 + 'px';
      },
      room_type() {
         return this.$store.state.room.room_type;
      },
      my_turn() { // Sets initial turn to player_1 on game start for quick-game only;
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
               // return "100px"; // 600px > < 960px -- 80px
               return "80px"
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
      },
      terminate_room() {
         return this.$store.state.room.room_info.terminate;
      },
      game_theme() {
         return this.$store.state.room.room_info.theme;
      },
      room_capacity() {
         return this.$store.state.room.room_info.capacity;
      },
   },
   methods: {
      card_flip(card, ind) {
/**** ONCLICK ****/
         // this.$store.commit('card/MY_TURN_TEMP_DISABLE', true); // Temporarily disable my turn (ensures quick disabling);
         // if (card.show) return this.$store.commit('card/MY_TURN_TEMP_DISABLE', false); // If card already showing, enable my turn;
         if (card.show) return;
         this.$store.commit('card/MY_TURN_TEMP_DISABLE', true); // Temporarily disable my turn (ensures quick disabling);
         window.socket.emit('pause-countdown', this.room_number); // Request pause countdown for all clients;

         this.$store.commit('card/FLIPPED_TRACKER', { action: 'push', flippedCard: card });

         let changed_card = {
            ...card,
            show: true
         }

         // this.$store.commit("room/ROOM_CARD", { card: changed_card, cardIndex: ind } );

         window.socket.emit('card-flip', { 
            roomNumber: this.room_number, 
            card: changed_card, 
            cardIndex: ind,
            flippedAmount: this.flipped_tracker.length,
            roomCapacity: this.room_capacity,
            currentTurn: this.current_turn_player,
            // flippedTracker: this.flipped_tracker
         });


/**
         if (card.show) return
         this.$store.commit('card/MY_TURN_TEMP_DISABLE', true); // Temporarily disable my turn (ensures quick disabling);
         let changed_card = {
            ...card,
            show: true
         }
         this.$store.commit('room/ROOM_CARD', {card: changed_card, cardIndex: ind}); // Make my card show first;
         this.$store.commit('audio/PLAY_SOUND', 'card_flip'); // Play flip sound;
         this.$store.commit('card/FLIPPED_TRACKER', { action: 'push', flippedCard: card }); // Track flipped cards in array;
         

         window.socket.emit('card-flip', { // Make oppoent's card show;
            roomNumber: this.room_number, 
            card: changed_card, 
            cardIndex: ind,
            flippedAmount: this.flipped_tracker.length
         });
**/

         // Waiting for socket.io to grant my turn again when only one card flipped...


/**** 1VS1 FLIPED 2 ****/
         if (this.flipped_tracker.length === 2 && this.room_capacity === 2) { // If player flipped 2 cards,
            this.$store.commit('card/MY_TURN_TEMP_DISABLE', true); // Temporarily disable my turn (ensures quick disabling);

            if (this.flipped_tracker[0].card_id === this.flipped_tracker[1].card_id) { // If matching cards found,
               window.socket.emit('room-player-update', { // DB score + 10 and set matched card show to true;
                  action: 'add-score', 
                  currentPlayer: this.current_turn_player, 
                  roomNumber: this.room_number,
                  cardMatch: this.flipped_tracker
               });

               this.$store.commit('card/FLIPPED_TRACKER', { action: 'clear' });
               // this.$store.commit('card/MY_TURN_TEMP_DISABLE', false); // Enable my turn again;

            } else { // If no matching cards found,
               // window.socket.emit('pause-countdown', this.room_number); // Request pause countdown for both clients;
               this.$store.commit('card/MY_TURN_TEMP_DISABLE', true); // Temporarily disable my turn (ensures quick disabling);

               setTimeout( () => { // Change turn after some delay;
                  window.socket.emit('change-turn', { 
                     current: this.current_turn_player, 
                     roomNumber: this.room_number,
                     roomCapacity: this.$store.state.room.room_info.capacity
                  });

                  this.$store.commit('card/FLIPPED_TRACKER', { action: 'clear' });

               }, 1500);
            }
         }

/**** 2VS2 FLIPPED 1 ****/
/**
         if (this.flipped_tracker.length === 1 && this.room_capacity === 4) { // I'm not a finisher for the team;
            this.$store.commit('card/MY_TURN_TEMP_DISABLE', true); // Temporarily disable my turn (ensures quick disabling);

            setTimeout( () => { // Change turn after some delay;
               window.socket.emit('change-turn', { 
                  current: this.current_turn_player, 
                  roomNumber: this.room_number,
                  roomCapacity: this.$store.state.room.room_info.capacity,
                  flippedCardArray: this.flipped_tracker
               });

               this.$store.commit('card/FLIPPED_TRACKER', { action: 'clear' });

            }, 1500);
         }
**/
/**** 2VS2 FLIPPED 2 ****/
/**
         if (this.flipped_tracker.length === 2 && this.room_capacity === 4) { // If I'm a finisher for the team,
            this.$store.commit('card/MY_TURN_TEMP_DISABLE', true); // Temporarily disable my turn (ensures quick disabling);
            // window.socket.emit('pause-countdown', this.room_number); // Request pause countdown for all clients;

            if (this.flipped_tracker[0].card_id === this.flipped_tracker[1].card_id) { // If team found matching card for 2vs2,
               window.socket.emit('room-player-update', {
                  action: 'add-score',
                  currentPlayer: this.current_turn_player, 
                  roomNumber: this.room_number,
                  cardMatch: this.flipped_tracker,
                  roomCapacity: this.room_capacity
               });

               this.$store.commit('card/FLIPPED_TRACKER', { action: 'clear' });

            } else { // If cards are not matching for 2vs2,
               // window.socket.emit('pause-countdown', this.room_number); // Request pause countdown for all clients;
               this.$store.commit('card/FLIPPED_TRACKER', { action: 'clear' }); // Clear cards tracker;

               setTimeout( () => { // Change turn after some delay;
                  window.socket.emit('change-turn', { 
                     current: this.current_turn_player, 
                     roomNumber: this.room_number,
                     roomCapacity: this.$store.state.room.room_info.capacity,
                     flippedCardArray: this.flipped_tracker
                  });
               }, 1500);
            }

         }
**/
      },
      card_flip_two_vs_two(card, ind) {
/**** 2VS2 (onclick) ****/
         if (card.show) return;
         this.$store.commit('card/MY_TURN_TEMP_DISABLE', true); // Temporarily disable my turn (ensures quick disabling);
         window.socket.emit('pause-countdown', this.room_number); // Request pause countdown for all clients;

         let changed_card = {
            ...card,
            show: true
         }

         this.$store.commit('card/FLIPPED_TRACKER', { action: 'push', flippedCard: changed_card });

   /**** 2VS2 FLIPPED 1 ****/
         if (this.flipped_tracker.length === 1 && this.room_capacity === 4) { // If I'm a start for the team,
            window.socket.emit('change-turn', { 
               current: this.current_turn_player, 
               roomNumber: this.room_number,
               roomCapacity: this.$store.state.room.room_info.capacity,
               flippedCardArray: this.flipped_tracker
            });
            this.$store.commit('card/FLIPPED_TRACKER', { action: 'clear' });
         }
         
   /**** 2VS2 FLIPPED 2 ****/
         if (this.flipped_tracker.length === 2 && this.room_capacity === 4) { // If I'm a finisher for the team,
            if (this.flipped_tracker[0].card_id === this.flipped_tracker[1].card_id) { // If team found matching card for 2vs2,
               window.socket.emit('room-player-update', {
                  action: 'add-score',
                  currentPlayer: this.current_turn_player, 
                  roomNumber: this.room_number,
                  cardMatch: this.flipped_tracker,
                  roomCapacity: this.room_capacity,
                  flippedCardArray: this.flipped_tracker
               });
               this.$store.commit('card/FLIPPED_TRACKER', { action: 'clear' });

            } else { // If cards are not matching for 2vs2,
               window.socket.emit('change-turn', { 
                  current: this.current_turn_player, 
                  roomNumber: this.room_number,
                  roomCapacity: this.$store.state.room.room_info.capacity,
                  flippedCardArray: this.flipped_tracker
               });

               let hideCardArray = [];

               this.flipped_tracker.forEach( cardInfo => {
                  hideCardArray.push({
                     ...cardInfo,
                     show: false
                  });
               });

               setTimeout( () => {
                  window.socket.emit('change-turn', {
                     current: this.current_turn_player, 
                     roomNumber: this.room_number,
                     roomCapacity: this.$store.state.room.room_info.capacity,
                     flippedCardArray: hideCardArray
                  });
                  this.$store.commit('card/FLIPPED_TRACKER', { action: 'clear' });
               }, 1500);

               // ( async () => {
               //    await ( () => {
               //       return new Promise( (res, rej) => {
               //          setTimeout( () => {
               //             window.socket.emit('change-turn', {
               //                current: this.current_turn_player, 
               //                roomNumber: this.room_number,
               //                roomCapacity: this.$store.state.room.room_info.capacity,
               //                flippedCardArray: hideCardArray
               //             });
               //          }, 1500);
               //       });
               //    } )();
               // } )();

            }

         }
      }
   },
   watch: {
      game_started(val) {
         let card_array_length = this.card_array.length; // Flipped card length in array;
         let time_delay = 0; // Initial loading setInterval time delay;
         
         // if (val && this.room_capacity !== 4) { // If game_started value is true in store and not 2vs2,
         if (val) {
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
         
         // if (val && this.room_capacity === 4) { // If game_started value is true and it's 2vs2,
         //    this.$store.commit('card/MY_TURN_TEMP_DISABLE', true); // Temporarily disable my turn;
         //    this.show_loading = true; // Show loading component;
         // }
      },
      my_turn_temp_disable(val) { // Watching this value (only at start);
         this.starter_track++;
         if (this.starter_track === 1) {
            this.$store.dispatch('card/countdown_function', true); // Trigger countdown;
         }
      }
   },
   mounted() {
      this.$store.commit('card/COUNTDOWN', this.default_countdown); // Set room countdown value;
      (process.env.NODE_ENV === 'development')
         ? this.dev_env = true
         : this.dev_env = false;
   },
   destroyed() {
      this.$store.commit('card/COUNTDOWN', null);
   }

};

</script>

<style lang="scss" scoped>

.v-card--disabled > *:not(.v-card__progress) {
   opacity: 1;
}

.flip-enter {
   transform: rotateY(94deg);
}

.flip-enter-active {
   // transition: all 0.1s;
   transition: transform 0.1s;
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
   // box-shadow: 10px 0 5px black;
   box-shadow: 5px 0 5px black;
}

.flip-leave-to {
   box-shadow: none;
}


</style>
