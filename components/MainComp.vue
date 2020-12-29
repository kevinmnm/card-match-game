<template>
   <v-container fluid style="height:100%">
      <v-row class="text-center">
         <v-col cols="12">
            <h1>CARD MATCH</h1>
         </v-col>
         <v-col cols="7" class="ma-auto">
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
               <v-btn @click.prevent="comming_soon()" width="100%" tile text>login</v-btn>
            </v-form>
         </v-col>
         <v-col cols="12">or</v-col>
         <v-col cols="12" class="ma-auto">
            <v-btn width="150px" color="secondary" @click="comming_soon()">signup</v-btn>
         </v-col>
         <v-col cols="12">or</v-col>
         <v-col cols="12" class="ma-auto">
            <Dialog @clicked-play="clicked_play()">
               <template v-slot:button>Play as guest</template>
               <template #title>Choose Display Name</template>
            </Dialog>
         </v-col>
         <v-col cols="12">
            <Loading :size="30" v-if="show_server_loading">
               <template #text>Awaiting Server...</template>
            </Loading>
         </v-col>
      </v-row>
   </v-container>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
import Loading from "@/components/Loading.vue";

export default {
   name: "MainComp",
   components: {
      Dialog,
      Loading
   },
   data() {
      return {
         show_server_loading: false
      };
   },
   methods: {
      comming_soon(){
         alert('Comming soon. Please play as guest for now.');
      },
      clicked_play(){
         this.show_server_loading = true;
      }
   }
};
</script>