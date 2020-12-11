<template>
   <v-row>
      <v-col cols="12" class="text-center">
         <v-progress-circular
            :size="size"
            :width="width"
            color="primary"
            indeterminate
         >
         </v-progress-circular>
      </v-col>
      <v-col cols="12" class="primary--text">
         <slot name="text"></slot>
      </v-col>
   </v-row>
</template>

<script>
export default {
   name: "LoadingComp",
   props: {
      size: {
         type: Number,
         default: 50,
      },
      width: {
         type: Number,
         default: 8,
      },
   },
};
</script>

<style>
</style>