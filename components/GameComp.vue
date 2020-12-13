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
            class="ma-0 pa-0 d-flex align-center justify-center"
            width="100%"
            height="100%"
            tag="div"
            style="background: transparent"
         >
            <v-card
               :width="board_width"
               :height="board_height"
               class="ma-0 pa-0 d-flex align-center justify-center"
               :class="flex_direction"
            >
               <v-sheet width="100%" height="100%" outlined class="ma-0 pa-0 d-flex justify-center flex-row" tag="div">
                  <v-card outlined color="primary" :width="card_size" :height="card_size">c</v-card>
                  <v-card outlined color="primary" :width="card_size" :height="card_size">c</v-card>
                  <v-card outlined color="primary" :width="card_size" :height="card_size">c</v-card>
                  <v-card outlined color="primary" :width="card_size" :height="card_size">c</v-card>
                  <v-card outlined color="primary" :width="card_size" :height="card_size">c</v-card>
                  <v-card outlined color="primary" :width="card_size" :height="card_size">c</v-card>
                  <v-card outlined color="primary" :width="card_size" :height="card_size">c</v-card>
                  <v-card outlined color="primary" :width="card_size" :height="card_size">c</v-card>
                  <v-card outlined color="primary" :width="card_size" :height="card_size">c</v-card>
                  <v-card outlined color="primary" :width="card_size" :height="card_size">c</v-card>
                  <v-card outlined color="primary" :width="card_size" :height="card_size">c</v-card>
                  <v-card outlined color="primary" :width="card_size" :height="card_size">c</v-card>
               </v-sheet>
               <v-sheet width="100%" height="100%" outlined class="ma-0 pa-0"></v-sheet>
            </v-card>
         </v-sheet>
      </v-img>
   </v-sheet>
</template>

<script>
export default {
   name: "GameComp",
   computed: {
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
      board_width() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return "380px"; // < 600px -- 60px
            case "sm":
               return "580px"; // 600px > < 960px -- 80px
            case "md":
               return "1200px"; // 960px > < 1264px* -- 100px
            case "lg":
               return "1200px"; // 1264px > < 1904px* -- 100px
            case "xl":
               return "1200px"; // > 1904px* -- 100px
         }
      },
      board_height() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return "790px"; // < 600px -- 60px
            case "sm":
               return "1190px"; // 600px > < 960px -- 80px
            case "md":
               return "600px"; // 960px > < 1264px* -- 100px
            case "lg":
               return "600px"; // 1264px > < 1904px* -- 100px
            case "xl":
               return "600px"; // > 1904px* -- 100px
         }
      },
      card_size() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return "60px"; // < 600px -- 60px
            case "sm":
               return "80px"; // 600px > < 960px -- 80px
            case "md":
               return "100px"; // 960px > < 1264px* -- 100px
            case "lg":
               return "100px"; // 1264px > < 1904px* -- 100px
            case "xl":
               return "100px"; // > 1904px* -- 100px
         }
      }
   },
};
</script>
