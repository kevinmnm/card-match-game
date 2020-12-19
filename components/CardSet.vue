<template>
   <v-sheet class="pa-0 ma-0 d-flex flex-wrap">
      <!-- <v-overlay absolute z-index="1" class="text-center" opacity="0.6">
         <span>Setting up...</span>
         <Loading />
      </v-overlay> -->
      <v-card
         class="pa-0 ma-0"
         flat
         v-for="(all, ind) in card_array"
         :key="all + ind"
         :width="card_size"
         :height="card_size"
         color="primary"
         style="cursor:pointer;"
         @click="all.show = !all.show"
         :img="
            (all.show) ? require(`@/assets/img/card/set_1/${all.card_id}.png`) : require(`@/assets/img/card/cover/default_white.png`)
         "
      >
      </v-card>

      <!-- <v-card
         class="pa-0 ma-0"
         style="cursor:pointer;"
         flat
         v-for="(all, ind) in card_array"
         :key="ind + all"
         :width="card_size"
         :height="card_size"
         color="primary"
         :img="require(`@/assets/img/card/cover/default_white.png`)"
         v-show="!all.show"
         @click="all.show = true"
      >
         {{all.show}}
      </v-card> -->
   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";
const lodash_shuffle = require('lodash.shuffle');

export default {
   name: "CardSetComp",
   components: { Loading },
   data() {
      return {
         card_array: [],
      }
   },
   computed: {
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
   },
   methods: {
      testShuffle(){
         this.card_array = shuffle(this.card_array);
      }
   },
   created() {
      // this.card_array = Array.from({length: this.card_count}, (_, i) => i + 1)
      for (let i=0; i<2; i++) {
         for (let k=0; k<(this.card_count/2); k++) {
            this.card_array.push({
               card_id: k + 1,
               show: false
            });
         }
      }

   },

};
</script>