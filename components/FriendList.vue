<template>
   <v-sheet width="100%" height="100%">
      <v-sheet v-if="show_loading" width="100%" height="100%" class="d-flex align-center justify-center" outlined>   
         <Loading :size="40" />
      </v-sheet>
      <v-sheet v-else width="100%" height="100%" style="overflow:auto;">

         <v-tooltip bottom>
            <template v-slot:activator="{ attrs, on }">
               <v-card 
                  @click="get_detailed_friend_list()" 
                  class="d-flex justify-center align-center" 
                  style="cursor:pointer;"
                  width="100%"
                  v-on="on"
                  v-bind="attrs"
               >
                  FRIENDS
               </v-card>
            </template>
            <span>Reload Friends</span>
         </v-tooltip>
   
         <v-card class="d-flex flex-row flex-wrap" width="100%" flat outlined tile>
            <v-tooltip bottom>
               <template v-slot:activator="{ on, attrs }">
                  <v-btn width="50%" tile outlined v-on="on" v-bind="attrs" x-small @click="sort_friend = 'online'">
                     <v-icon small color="success">mdi-circle</v-icon>
                  </v-btn>
               </template>
               <span>ONLINE</span>
            </v-tooltip>
            <v-tooltip bottom>
               <template v-slot:activator="{ on, attrs }">
                  <v-btn width="50%" tile outlined v-on="on" v-bind="attrs" x-small @click="sort_friend = 'offline'">
                     <v-icon color="grey" small>mdi-circle</v-icon>
                  </v-btn>
               </template>
               <span>OFFLINE</span>
            </v-tooltip>
         </v-card>

         <v-expansion-panels accordion>
            <v-expansion-panel
               v-for="(friend, ind) in detailed_friend"
               :key="friend+ind"
            >
               <v-expansion-panel-header 
                  v-if="
                     (sort_friend === 'all') 
                        ? true 
                        : (sort_friend === 'online')
                           ? friend.logged
                           : !friend.logged
                  "
               >
                  {{ friend.displayName }}
                  <template v-slot:actions>
                     <v-icon x-small :color="(friend.logged) ? 'success' : 'grey'">mdi-circle</v-icon>
                  </template>
               </v-expansion-panel-header>
               <v-expansion-panel-content>
                  {{ friend.rank }}
               </v-expansion-panel-content>
            </v-expansion-panel>
         </v-expansion-panels>
      </v-sheet>

   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
   name: "FriendList",
   components: { Loading },
   data: () => ({
      show_loading: true,
      detailed_friend: null,
      sort_friend: 'all',
      sort_all: true,
   }),
   computed: {
      window_width() {
         return this.$vuetify.breakpoint.width;
      },
      my_info() { // Object;
         return this.$store.state.user.user_info;
      },
      friend_list() { // Array;
         return this.$store.state.user.user_info.friend;
      }
   },
   methods: {
      async get_detailed_friend_list(status) { // Stores in data detailed_friend!
         this.show_loading = true;

         const response = await fetch(window.server_url + '/friend', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
               my_id: this.my_info._id,
               // status
            })
         });

         let res = await response.json();

         this.detailed_friend = res.friendList;
         this.sort_friend = 'all';
         this.show_loading = false;
      },
   },
   created() {
      this.get_detailed_friend_list();
   }
};
</script>

<style>
</style>