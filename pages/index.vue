<template>
   <v-container class="pa-0 ma-0 text-center" fluid style="height: 100%">
      <h1>Homepage Under Development</h1>
      <div>Click to test game</div>
      <!-- <nuxt-link to="/main">
         <v-btn width="150px">game</v-btn>
      </nuxt-link> -->
      <v-btn to="/main" width="150px" color="primary" class="font-weight-bold">game</v-btn>
   </v-container>
</template>

<script>
export default {
   name: "Home",
   mounted() {
      if (process.env.NODE_ENV === "production") {
         if (location.protocol !== "https:") {
            location.replace(`
               https:${location.href.substring(location.protocol.length)}
            `);
         }
      }
   },
};
</script>