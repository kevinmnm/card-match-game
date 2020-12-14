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
               class="pa-1 ma-0"
               :width="room_title_width"
            >
               room title
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
                  <!-- Top row of info-board -->
                  <v-sheet :height="card_size" class="d-flex flex-row pa-0 ma-0" width="100%">
                     <v-sheet width="50%" class="d-flex flex-row pa-0 ma-0">
                        <v-card class="pa-0 ma-0" :width="card_size" color="yellow">rank icon1</v-card>
                        <v-sheet class="d-flex flex-column pa-0 ma-0 flex-grow-1" color="green">
                           <v-card class="pa-0 ma-0" height="50%" color="grey">username1</v-card>
                           <v-card class="pa-0 ma-0" height="50%" color="red">score1</v-card>
                        </v-sheet>
                     </v-sheet>
                     <v-sheet width="50%" class="d-flex flex-row pa-0 ma-0">
                        <v-card class="pa-0 ma-0" :width="card_size" color="yellow">rank icon2</v-card>
                        <v-sheet class="d-flex flex-column pa-0 ma-0 flex-grow-1" color="green">
                           <v-card class="pa-0 ma-0" height="50%" color="grey">username2</v-card>
                           <v-card class="pa-0 ma-0" height="50%" color="red">score2</v-card>
                        </v-sheet>
                     </v-sheet>
                  </v-sheet>

                  <!-- Middle row of info-board -->
                  <v-sheet color="grey" class="d-flex flex-column text--primary flex-grow-1 pa-1">
                     <div class="opponent-chat">sdfsdf</div>
                     <div class="my-chat">11111</div>
                  </v-sheet>
                  
                  <!-- Botom row of info-board -->
                  <v-form class="d-flex pa-0" autocomplete="off" aria-autocomplete="off">
                     <v-text-field class="pa-0 ma-0" style="font-size:18px;" width="80%" dense filled hide-details single-line outlined></v-text-field>
                     <v-btn width="20%" height="100%">enter</v-btn>
                  </v-form>

               </v-sheet>
            </v-sheet>

         </v-sheet>
      </v-img>
   </v-sheet>
</template>

<script>
export default {
   name: "GameComp",
   data() {
      return {

      }
   },
   computed: {
      room_title_width(){
         if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
            return this.board_card_size
         } else {
            return '100%'
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
