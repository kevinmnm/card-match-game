<template>
   <v-sheet ref="list_wrapper" width="100%" height="80%">
      <!-- PC -->
      <v-sheet
         v-if="window_width > window_height"
         width="100%"
         class="d-flex flex-row flex-start flex-wrap"
         style="overflow:auto;"
      >
         <v-card
            v-for="(all, ind) in custom_room_list"
            :key="all + ind"
            width="50%"
            :height="wrapper_height / 3 + 'px'"
            style="cursor: pointer"
         >
            <v-hover v-slot="{ hover }" class="ma-0 pa-0">
               <v-sheet
                  width="100%"
                  height="100%"
                  class="d-flex flex-row"
                  :class="{ 'on-hover': hover }"
                  :elevation="hover ? 24 : 0"
               >
                  <div class="enter-button" v-show="hover">
                     <v-btn>Join</v-btn>
                  </div>

                  <v-sheet :width="wrapper_height / 3 + 'px'">
                     <v-responsive
                        :aspect-ratio="1 / 1"
                        :height="wrapper_height / 3 + 'px'"
                     >
                        <v-img
                           contain
                           height="100%"
                           :src="require(`@/assets/img/type/${all.theme}.png`)"
                        ></v-img>
                     </v-responsive>
                  </v-sheet>
                  <v-sheet class="d-flex flex-column flex-grow-1">
                     <v-card height="50%" width="100%">{{ all.title }}</v-card>
                     <v-card height="50%" width="100%">{{
                        all.joined + "/" + all.capacity
                     }}</v-card>
                  </v-sheet>
               </v-sheet>
            </v-hover>
         </v-card>
      </v-sheet>

      <!-- PHONE -->
      <v-sheet
         v-if="window_width <= window_height"
         width="100%"
         height="100%"
         class="room"
      >
         <v-card
            v-for="(all, ind) in custom_room_list"
            :key="all + ind"
            width="100%"
            :height="wrapper_height / 5 + 'px'"
            class="d-flex flex-row"
            style="cursor: pointer"
         >
            <v-hover v-slot="{ hover }" class="ma-0 pa-0">
               <v-sheet
                  width="100%"
                  height="100%"
                  class="d-flex flex-row"
                  :class="{ 'on-hover': hover }"
                  :elevation="hover ? 24 : 0"
               >
                  <div class="enter-button" v-show="hover">
                     <v-btn>Join</v-btn>
                  </div>

                  <v-sheet :width="wrapper_height / 5 + 'px'">
                     <v-responsive
                        :aspect-ratio="1 / 1"
                        :height="wrapper_height / 5 + 'px'"
                     >
                        <v-img
                           contain
                           height="100%"
                           :src="require(`@/assets/img/type/${all.theme}.png`)"
                        ></v-img>
                     </v-responsive>
                  </v-sheet>
                  <v-sheet class="d-flex flex-column flex-grow-1">
                     <v-card height="50%" width="100%">{{ all.title }}</v-card>
                     <v-card height="50%" width="100%">{{
                        all.joined + "/" + all.capacity
                     }}</v-card>
                  </v-sheet>
               </v-sheet>
            </v-hover>
         </v-card>
      </v-sheet>
   </v-sheet>
</template>

<script>
export default {
   name: "RoomListComp",
   data: () => ({
      isMounted: false,
   }),
   computed: {
      custom_room_list() {
         // Array;
         return this.$store.state.custom.custom_room_list;
      },
      wrapper_height() {
         if (!this.isMounted) {
            return;
         }
         return this.$refs.list_wrapper.$el.clientHeight;
      },
      window_width() {
         return this.$vuetify.breakpoint.width;
      },
      window_height() {
         return this.$vuetify.breakpoint.height;
      },
      // img_size() {
      //    if (!this.isMounted) {return}
      //    console.log(this.$refs.list_wrapper.$el.clientHeight);
      //    return this.$refs.list_wrapper.$el.clientHeight / 2;
      // }
   },
   mounted() {
      this.isMounted = true;
   },
};
</script>

<style lang="scss" scoped>
.enter-button {
   position: absolute;
   top: 0;
   left: 0;
   height: 100%;
   width: 100%;
   background: rgba(48, 48, 48, 0.6);
   z-index: 1;
}
</style>