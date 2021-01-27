<template>
   <v-container class="pa-0 ma-0 text-center" fluid style="height: 100%">
      <v-app-bar dense app>
         <v-toolbar-title class="font-weight-bold"
            >MONSTER MATCHES</v-toolbar-title
         >
         <v-spacer></v-spacer>
         <v-toolbar-items class="hidden-xs-only">
            <v-btn>About</v-btn>
            <v-btn>Guide</v-btn>
            <v-btn>Ranking</v-btn>
         </v-toolbar-items>
         <v-app-bar-nav-icon class="hidden-sm-and-up" @click="drawer = !drawer">
         </v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer app v-model="drawer">
         <v-list nav>
            <v-list-item-group class="font-weight-bold">
               <v-list-item>
                  <v-icon sm>mdi-help-box</v-icon>
                  <v-list-item-content class="ml-2">ABOUT</v-list-item-content>
               </v-list-item>
               <v-list-item>
                  <v-icon sm>mdi-lightbulb-on</v-icon>
                  <v-list-item-content class="ml-2">GUIDE</v-list-item-content>
               </v-list-item>
               <v-list-item>
                  <v-icon sm>mdi-trophy-variant</v-icon>
                  <v-list-item-content class="ml-2"
                     >RANKING</v-list-item-content
                  >
               </v-list-item>
            </v-list-item-group>
         </v-list>
      </v-navigation-drawer>
      <h1>Homepage Under Development</h1>
      <div>Click to test game</div>
      <!-- <nuxt-link to="/main">
         <v-btn width="150px">game</v-btn>
      </nuxt-link> -->
      <v-btn to="/main" width="150px" color="primary" class="font-weight-bold"
         >game</v-btn
      >
   </v-container>
</template>

<script>
export default {
   name: "Home",
   data: () => ({
      drawer: false,
   }),
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