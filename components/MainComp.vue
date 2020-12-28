<template>
   <v-container fluid style="height:100%">
      <v-row class="text-center">
         <v-col cols="12">
            <h1>CARD MATCH</h1>
         </v-col>
         <v-col cols="8" class="ma-auto">
            <v-form autocomplete="off" style="border:2px solid lightGrey;">
               <h3>Login</h3>
               <v-text-field
                  label="Email / Username"
                  autocomplete="off"
                  dense
                  filled
                  hide-details
                  full-width
               ></v-text-field>
               <v-text-field
                  label="Password"
                  dense
                  filled
                  hide-details
                  full-width
               ></v-text-field>
            </v-form>
         </v-col>
         <v-col cols="12">or</v-col>
         <v-col cols="12" class="ma-auto">
            <v-btn width="150px" color="secondary">signup</v-btn>
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