<template>
   <v-container fluid class="pa-0 ma-0" style="height:100%;">
      <MainComp v-if="!signed_in" />
      <IdleRoom v-else />
   </v-container>
</template>

<script>
import MainComp from "@/components/MainComp.vue";
import IdleRoom from "@/components/IdleRoom.vue";

export default {
   name: "Main",
   components: {
      MainComp,
      IdleRoom
   },
   computed: {
      signed_in(){
         return this.$store.state.general.signed_in;
      }
   },
};
</script>
