<template>
   <v-sheet class="two-vs-two ma-0 pa-0" width="100%" height="100%">
      <v-sheet class="ma-0 pa-0" width="100%" height="100%">
         <v-col
            cols="12"
            class="ma-0 pa-0 d-flex flex-row"
            style="background: red; height: 40px"
         >
            <v-col cols="5" class="ma-0 pa-0">title</v-col>
            <v-col cols="2" class="ma-0 pa-0" style="background: green"
               >10</v-col
            >
            <v-col cols="5" class="ma-0 pa-0">leave</v-col>
         </v-col>
         <!-- Card Set + Info Set -->
         <v-sheet max-height="80%" width="100%" color="primary">
            <!-- Card Set -->
            <v-responsive
               :aspect-ratio="1 / 1"
               :width="card_board_width"
               max-height="50%"
            >
               <CardSet />
            </v-responsive>
         </v-sheet>
      </v-sheet>
   </v-sheet>
</template>

<script>
import CardSet from "@/components/CardSet.vue"

export default {
   name: "CustomGame",
   components: { CardSet },
   computed: {
      window_width() {
         return this.$vuetify.breakpoint.width;
      },
      window_height() {
         return this.$vuetify.breakpoint.height;
      },
      card_board_width() {
         if (this.window_width <= this.window_height) {
            return "100%";
         } else {
            return "70%";
         }
      },
   },
   beforeDestroy() {
      this.$store.commit('room/ROOM_TYPE', '');
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