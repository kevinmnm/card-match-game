<template>
   <v-parallax
      class="d-flex flex-column text-center"
      :src="require(`@/assets/img/main/home_parallax_2.png`)"
   >
      <v-sheet class="ma-auto pa-3" width="auto" color="classic white--text" rounded elevation="12">
         <h1 style="word-wrap:break-word; white-space: pre-wrap;" class="transparent">Homepage Under Developement</h1>
      </v-sheet>

      <v-sheet class="ma-auto pa-3" width="auto" color="success white--text" rounded elevation="12">
         <h1 style="word-wrap:break-word; white-space: pre-wrap;" class="transparent">Make sure to check the game out!</h1>
      </v-sheet>
   </v-parallax>
</template>

<script>
export default {
   name: "HomeBodyComp",
};
</script>

<style>
</style>