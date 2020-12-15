<template>
   <v-sheet
      style="position: absolute"
      class="ma-0 pa-0"
      tag="div"
      width="100%"
      height="100%"
   >
      <v-img
         height="100%"
         width="100%"
         :src="require('@/assets/img/main/sky.png')"
      >
         <v-sheet
            class="ma-0 pa-1 d-flex flex-column align-center justify-center"
            width="100%"
            height="100%"
            tag="div"
            style="background: transparent;"
         >
            <v-card 
               class="pa-0 ma-0 d-flex flex-row text-center"
               style="font-size:16px"
               :width="room_title_width"
               height="25px"
               flat
               tile
            >
               <v-card width="80%" class="pa-0 ma-0" flat tile color="red" @click="test">room title</v-card>
               <v-btn width="20%" tile style="font-size:16px;" height="100%" @click="confirm_leave()">leave</v-btn>

            </v-card>

            <v-sheet
               class="ma-0 pa-0 d-flex align-center justify-center"
               :class="flex_direction"
               width="100%"
               tag="div"
               style="background: transparent;"
            >
               <!-- Card Board -->
               <v-sheet
                  :width="board_card_size"
                  :height="board_card_size"
                  class="pa-0 ma-0 d-flex flex-wrap"
               >
                  <v-card class="pa-0 ma-0" flat v-for="all in 36" :key="all" :width="card_size" :height="card_size" color="primary"></v-card>
               </v-sheet>

               <!-- Info Board -->
               <v-sheet
                  :style="
                     ($vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm') ? {width: board_card_size, height: 'calc(100% - 360px)'} 
                     : ($vuetify.breakpoint.name === 'md') ? {height: board_card_size, width: 'calc(100% - 600px)'} 
                     : {height: board_card_size, width: 'calc(100% - 720px)'}
                  "
                  class="d-flex flex-column flex-wrap"
               >
                  <!-- Players info of info-board -->
                  <v-sheet :height="card_size" class="d-flex flex-row pa-0 ma-0" width="100%">
                     <v-sheet v-for="(player, ind) in Object.values(all_players_adjusted)" :key="player + ind" width="50%" class="d-flex flex-row pa-0 ma-0 font-weight-bold">
                        <v-card class="pa-0 ma-0" :width="card_size" color="yellow">rank icon1</v-card>
                        <v-sheet class="d-flex flex-column pa-0 ma-0 flex-grow-1 text-center" color="green">
                           <v-card class="pa-0 ma-0" height="50%" color="grey">{{ player.displayName }}</v-card>
                           <v-card class="pa-0 ma-0" height="50%" color="red">{{ player.score }}</v-card>
                        </v-sheet>
                     </v-sheet>
                  </v-sheet>

                  <!-- Chat of info-board -->
                  <v-sheet style="overflow:auto;" color="grey" class="d-flex flex-column text--primary flex-grow-1 pa-1" :max-height="chat_max_height">
                     <div class="opponent-chat">sdfsdf</div>
                     <div class="my-chat">11111</div>
                     <div class="my-chat">11111</div>
                     <div class="my-chat">11111</div>
                     <div class="opponent-chat">sdfsdf</div>
                     <div class="opponent-chat">sdfsdf</div>
                     <div class="opponent-chat">sdfsdf</div>
                     <div class="opponent-chat">sdfsdf</div>
                     <div class="opponent-chat">sdfsdf</div>
                     <div class="opponent-chat">sdfsdf</div>
                     <div class="opponent-chat">sdfsdf</div>
                  </v-sheet>
                  <v-form class="d-flex pa-0" autocomplete="off" aria-autocomplete="off">
                     <v-text-field class="pa-0 ma-0" style="font-size:18px;" width="80%" dense filled hide-details single-line outlined></v-text-field>
                     <v-btn width="20%" height="100%">enter</v-btn>
                  </v-form>

               </v-sheet>
            </v-sheet>

         </v-sheet>
      </v-img>
      <BottomSheet :show-comp="leave_confirm" @closeSheet="leave_confirm = false;" />
   </v-sheet>
</template>

<script>
import BottomSheet from "@/components/BottomSheet.vue";

export default {
   name: "GameComp",
   components: { BottomSheet },
   data() {
      return {
         chat_max_height_updater: 0,
         leave_confirm: false
      }
   },
   watch: {
      all_players_adjusted(newVal) {
         console.log(
            JSON.stringify(newVal, null, 3)
         );
      }
   },
   computed: {
      all_players_adjusted() {
         // return [this.$store.state.room.room_info.players];
         return this.$store.state.room.room_info.players;
      },
      room_title_width(){
         if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
            return this.board_card_size
         } else {
            return '100%'
         }
      },
      chat_max_height(){
         this.chat_max_height_updater;

         if (this.$vuetify.breakpoint.name === 'xs') {
            if (window.innerHeight <= 650) {
               return '100px'
            } else {
               return '180px'
            }
         } else if (this.$vuetify.breakpoint.name === 'sm') {
            if (window.innerHeight <= 960) {
               return '100px'
            } else {
               return '180px'
            }
         }
      },
      chat_height(){
         return this.card_size / 2;
      },
      flex_direction() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return "flex-column"; // < 600px -- 60px
            case "sm":
               return "flex-column"; // 600px > < 960px -- 80px
            case "md":
               return "flex-row"; // 960px > < 1264px* -- 100px
            case "lg":
               return "flex-row"; // 1264px > < 1904px* -- 100px
            case "xl":
               return "flex-row"; // > 1904px* -- 100px
         }
      },
      board_card_size() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return "360px"; // < 600px -- 60px
            case "sm":
               return "600px"; // 600px > < 960px -- 80px
            case "md":
               return "600px"; // 960px > < 1264px* -- 100px
            case "lg":
               return "720px"; // 1264px > < 1904px* -- 100px
            case "xl":
               return "720px"; // > 1904px* -- 100px
         }
      },
      board_info_size() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return "calc(100% - 360px)"; // < 600px -- 60px
            case "sm":
               return "calc(100% - 600px)"; // 600px > < 960px -- 80px
            case "md":
               return "calc(100% - 600px)"; // 960px > < 1264px* -- 100px
            case "lg":
               return "calc(100% - 720px)"; // 1264px > < 1904px* -- 100px
            case "xl":
               return "calc(100% - 720px)"; // > 1904px* -- 100px
         }
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
      }
   },
   methods: {
      test(){
         console.log(this.all_players_adjusted);
      },
      chat_max_height_updater_handler() {
         this.chat_max_height_updater++
      },
      confirm_leave(){
         this.leave_confirm = true;
      }
   },
   created() {
      window.addEventListener('resize', this.chat_max_height_updater_handler);
   },
   destroyed() {
      window.removeEventListener('resize', this.chat_max_height_updater_handler);
   },
   mounted() {
      console.log(this.all_players_adjusted)
   }
};
</script>

<style lang="scss" scoped>

.my-chat {
   text-align: right;
   border: 1px solid blue;
}

.opponent-chat {
   text-align: left;
   border: 1px solid red;
}

</style>
