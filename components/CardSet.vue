<template>
   <v-sheet class="pa-0 ma-0 d-flex flex-wrap">
      <v-overlay absolute z-index="1" class="text-center" opacity="0.6" v-if="!game_started">
         <span>Loading...</span>
         <Loading />
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
         :disabled="!my_turn"
      >
         <transition name="flip" class="d-flex flex-wrap" tag="div" :key="card_key" mode="out-in">
            <!-- <v-img
               :src="(all.show) ? require(`@/assets/img/card/set_1/${all.card_id}.png`) : require(`@/assets/img/card/cover/default_white.png`)"
               :key="all.show"
            >
            </v-img> -->
            <v-img v-if="all.show" :src="require(`@/assets/img/card/set_1/${all.card_id}.png`)" :key="all.show" style="background: red;"></v-img>
            <v-img v-else :src="require(`@/assets/img/card/cover/default_white.png`)" :key="all.show"></v-img>
         </transition>

      </v-card>

   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
   name: "CardSetComp",
   props: ["myTurn"],
   components: { Loading },
   data() {
      return {
         flipped_tracker: []
      }
   },
   computed: {
      my_turn() {
         return this.myTurn;
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
      }
   },
   methods: {
      card_flip(card, ind) {
         this.flipped_tracker.push(card);

         if (this.flipped_tracker.length === 2) {

         } else {
            // card.show = true;
            let changed_card = {
               ...card,
               show: true
            }
            this.$store.commit("room/ROOM_CARD", { card: changed_card, cardIndex: ind } );

            window.socket.emit('card-flip', { roomNumber: this.room_number, card: changed_card, cardIndex: ind });
         }
      }
   }

};
      // this.card_array = Array.from({length: this.card_count}, (_, i) => i + 1)

</script>

<style lang="scss" scoped>

.flip-enter {
   transform: rotateY(94deg);
}

.flip-enter-active {
   transition: all 0.1s;
   box-shadow: -20px 0 20px black;
   position: absolute;
}

.flip-enter-to {
   box-shadow: none;
}

.flip-leave-active {
   transition: all 0.1s;
   position: absolute;
   transform: rotateY(86deg);
   box-shadow: 20px 0 5px black;
}

.flip-leave-to {
   box-shadow: none;
}


</style>