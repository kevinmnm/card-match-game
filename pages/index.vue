<template>
   <v-container class="pa-0 ma-0 text-center" fluid style="height: 100%">
      <v-app-bar class="classic white--text" dense app>
         <v-toolbar-title style="cursor:pointer;" class="font-weight-bold" @click="reload_page()"
            >MONSTER MATCHES</v-toolbar-title
         >
         <v-spacer></v-spacer>
         <v-toolbar-items class="hidden-xs-only">
            <v-btn text color="white">About</v-btn>
            <v-btn text color="white">Guide</v-btn>
            <v-btn text color="white">Ranking</v-btn>
         </v-toolbar-items>
         <v-app-bar-nav-icon class="hidden-sm-and-up white--text" @click="drawer = !drawer">
         </v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer app v-model="drawer" disable-resize-watcher dark>
         <v-list nav>
            <v-list-item-group class="font-weight-bold">
               <v-list-item>
                  <v-icon sm color="info">mdi-help-box</v-icon>
                  <v-list-item-content class="ml-2">ABOUT</v-list-item-content>
               </v-list-item>
               <v-list-item>
                  <v-icon sm color="yellow">mdi-lightbulb-on</v-icon>
                  <v-list-item-content class="ml-2">GUIDE</v-list-item-content>
               </v-list-item>
               <v-list-item>
                  <v-icon sm color="warning">mdi-trophy-variant</v-icon>
                  <v-list-item-content class="ml-2"
                     >RANKING</v-list-item-content
                  >
               </v-list-item>
            </v-list-item-group>
         </v-list>
      </v-navigation-drawer>
      <HomeCarousel />
      <HomeBody />
      <v-footer dark>
         <v-col
         class="text-center"
         cols="12"
      >
         Developer: <strong style="cursor:pointer;" @click="open_my_profile()"><u>Kevin</u></strong> 
      </v-col>
   </v-footer>
   </v-container>
</template>

<script>
import HomeCarousel from "@/components/HomeCarousel.vue";
import HomeBody from "@/components/HomeBody.vue";

export default {
   name: "Home",
   components: { HomeCarousel, HomeBody },
   data: () => ({
      drawer: false,
   }),
   methods: {
      reload_page() {
         window.location.reload();
      },
      open_my_profile() {
         window.open('https://www.instagram.com/kevinmnm/');
      }
   },
   // mounted() {
   //    if (process.env.NODE_ENV === "production") {
   //       if (location.protocol !== "https:") {
   //          location.replace(`
   //             https:${location.href.substring(location.protocol.length)}
   //          `);
   //       }
   //    }
   // },
};
</script>