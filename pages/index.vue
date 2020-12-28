<template>
   <v-container class="pa-0 ma-0 text-center" fluid style="height: 100%">
      <h1>Homepage Under Development</h1>
      <div>Click to test game</div>
      <nuxt-link to="/main">MAIN</nuxt-link>
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