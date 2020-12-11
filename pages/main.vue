<template>
   <v-container fluid>
      <MainComp v-if="!signed_in" />
      <GameComp v-else />
   </v-container>
</template>

<script>
import MainComp from "@/components/MainComp.vue";
import GameComp from "@/components/GameComp.vue";

export default {
   name: "Main",
   components: {
      MainComp,
      GameComp
   },
   computed: {
      signed_in(){
         return this.$store.state.general.signed_in;
      }
   }
};
</script>
