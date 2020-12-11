<template>
   <v-container fluid>
      <v-row class="text-center">
         <v-col cols="12">
            <h1>CARD MATCH</h1>
         </v-col>
         <v-col cols="6" class="ma-auto">
            <v-form outlined>
               <h3>Login</h3>
               <v-text-field></v-text-field>
            </v-form>
         </v-col>
         <v-col cols="12">or</v-col>
         <v-col cols="12" class="ma-auto">
            <Dialog>
               <template v-slot:button>Play as guest</template>
               <template #title>Choose Display Name</template>
            </Dialog>
         </v-col>
      </v-row>
   </v-container>
</template>

<script>
import Dialog from "@/components/Dialog.vue";

export default {
   name: "MainComp",
   components: {
      Dialog,
   },
   data() {
      return {};
   },
};
</script>