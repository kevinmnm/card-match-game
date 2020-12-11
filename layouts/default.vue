<template>
   <v-app>
      <v-sheet id="place-for-ads" height="90px" width="100%" outlined class="pa-0 ma-0"></v-sheet>
      <v-main>
         <v-container fluid>
            <nuxt />
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
export default {
   name: "Layout",
   mounted(){
      if ( process.env.NODE_ENV === 'production' ) {
         return 
      } else {
         window.server_url = "http://localhost:5555"
      }
   }  
};
</script>
