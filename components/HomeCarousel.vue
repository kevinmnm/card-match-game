<template>
   <v-carousel 
      height="100%"
      hide-delimiter-background
      cycle
   >
      <v-carousel-item v-for="(slide, ind) in carousel_slides" :key="ind">
         <v-sheet height="100%" :color="slide.color" outlined>
            <v-row
               class="fill-height flex-column"
               align="center"
               justify="center"
            >
               <div class="display-3">Example Content {{ slide.content }}</div>
               <v-btn class="mt-3 font-weight-bold" x-large to="/main">Play Game</v-btn>
            </v-row>
         </v-sheet>
      </v-carousel-item>
   </v-carousel>
</template>

<script>
export default {
   name: "HomeCarousel",
   data: () => ({
      carousel_slides: [
         {
            color: 'classic',
            content: 1
         },
         {
            color: 'success',
            content: 2
         },
         {
            color: 'warning',
            content: 3
         }
      ]
   }),
};
</script>

<style>
</style>