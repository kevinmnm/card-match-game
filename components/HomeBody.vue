<template>
   <v-parallax
      class="d-flex flex-column text-center"
      :src="require(`@/assets/img/main/home_parallax_2.png`)"
   >
      <v-sheet class="ma-auto pa-3" :width="content_width" color="red white--text" rounded elevation="12">
         <h2 style="word-wrap:break-word; white-space: pre-wrap; text-" class="transparent">Challenge Your Friends</h2>
      </v-sheet>

      <v-sheet class="ma-auto pa-3" :width="content_width" color="success white--text" rounded elevation="12">
         <h2 style="word-wrap:break-word; white-space: pre-wrap;" class="transparent">Improve Your Memory</h2>
      </v-sheet>

      <v-sheet class="ma-auto pa-3" :width="content_width" color="warning white--text" rounded elevation="12">
         <h2 style="word-wrap:break-word; white-space: pre-wrap;" class="transparent">Level Up Your IQ</h2>
      </v-sheet>

      <v-sheet class="ma-auto pa-3" :width="content_width" color="rgb(0,0,0,0.8)">
         <v-card color="transparent white--text">
            <h2 class="headline text-center">- Upcoming Update -</h2>
            <v-card-text class="info--text subtitle-1">02/29/2021</v-card-text>
            <v-card-subtitle class="white--text">DETAILS</v-card-subtitle>
         </v-card>
      </v-sheet>
   </v-parallax>
</template>

<script>
export default {
   name: "HomeBodyComp",
   computed: {
      window_width() {
         return this.$vuetify.breakpoint.width;
      },
      content_width() {
         if (this.window_width > 600) {
            return '50%';
         } else {
            return '100%';
         }
      }
   }
};
</script>

<style lang="scss" scoped>
.special-text {
   color: black;
  -webkit-text-fill-color: white; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
</style>