<template>
   <v-sheet width="100%" height="100%">
      <v-sheet v-if="show_loading" width="100%" height="100%" class="d-flex align-center justify-center" outlined>   
         <Loading :size="40" />
      </v-sheet>
      <v-sheet 
         v-if="!no_friend && !show_loading && detailed_friend && detailed_friend.length > 0"
         width="100%" 
         height="100%" 
         style="overflow:auto;"
      >

         <v-tooltip bottom>
            <template v-slot:activator="{ attrs, on }">
               <!-- <v-card 
                  @click="get_detailed_friend_list()" 
                  class="d-flex justify-center align-center" 
                  style="cursor:pointer;"
                  width="100%"
                  v-on="on"
                  v-bind="attrs"
               > -->
               <v-card 
                  @click="get_detailed_friend_list()" 
                  class="d-flex justify-center align-center subtitle-1 font-weight-bold"
                  style="cursor:pointer;"
                  width="100%"
                  v-on="on"
                  v-bind="attrs"
                  flat
               >
                  FRIENDS
               </v-card>
            </template>
            <span>Reload Friends</span>
         </v-tooltip>
   
         <v-card v-if="!online_only" class="d-flex flex-row flex-wrap" width="100%" flat outlined tile>
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

         <v-expansion-panels multiple accordion :readonly="room_info && room_info.start">
            <v-expansion-panel
               v-for="(friend,ind) in detailed_friend"
               :key="ind"
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
                     <v-icon v-if="!online_only" x-small :color="(friend.logged) ? 'success' : 'grey'">mdi-circle</v-icon>
                     <v-btn
                        v-if="online_only && !room_info.start && im_master"
                        @click="invite_friend(friend._id)"
                        :disabled="disable_invite_button"
                        tile
                        text
                        outlined
                     >
                        Invite
                     </v-btn>
                  </template>
               </v-expansion-panel-header>
               <v-expansion-panel-content v-if="!online_only" class="d-flex flex-row pa-0 ma-0">
                  <v-btn>Info</v-btn>
               </v-expansion-panel-content>
            </v-expansion-panel>
         </v-expansion-panels>
      </v-sheet>

      <!-- ROOM INFO ONLY ONLINE LIST IS EMPTY -->
      <v-sheet
         v-if="!show_loading && no_friend"
         class="d-flex justify-center align-center caption"
      >
         No Online Friends
      </v-sheet>

   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
   name: "FriendList",
   components: { Loading },
   props: ["onlineOnly"],
   data: () => ({
      show_loading: true,
      detailed_friend: null,
      sort_friend: null,
      no_friend: false,
      disable_invite_button: false,
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
      },
      online_only() {
         if (this.onlineOnly) {
            this.sort_friend = 'online';
            return true;
         }
         this.sort_friend = 'all';
         return false;
      },
      all_players() {
         if (!this.room_info) return false;
         return this.room_info.players;
      },
      room_info() {
         return this.$store.state.room.room_info;
      },
      im_master() {
         if (this.room_info.room_master && this.room_info.room_master.displayName === this.my_info.displayName) {
            return true;
         }
         return false;
      }
   },
   methods: {
      invite_friend(friend_id) {
         this.disable_invite_button = true;
         let stop = false;
         for (let player in this.all_players) {
            if (this.all_players[player]._id === friend_id) {
               stop = true;
               break;
            }
         }
         if (stop) {
            alert('Player is in the room!');
            this.disable_invite_button = false;
            return;
         }

         window.socket.emit('invite-player', {
            roomId: this.$store.state.room.room_info._id,
            playerId: friend_id,
            myDisplayName: this.my_info.displayName,
         });
         this.disable_invite_button = false;
      },
      async get_detailed_friend_list(status) { // Stores in data detailed_friend!
         this.show_loading = true;

         const response = await fetch(window.server_url + '/friend', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
               my_id: this.my_info._id,
               status
            })
         });

         let res = await response.json();

         if (!res.friendList || res.friendList.length < 1) {
            this.show_loading = false;
            this.no_friend = true;
            return
         }

         this.detailed_friend = res.friendList;
         if (this.online_only) {
            this.sort_friend = 'online';
         } else {
            this.sort_friend = 'all';
         }
         this.show_loading = false;
      },
   },
   created() {
      // if (this.online_only) return;
      this.get_detailed_friend_list();
      if (this.online_only) {
         this.sort_friend = 'online';
      }
   },
   // mounted() {
   //    if (!this.online_only) return;
   //    this.get_detailed_friend_list('online');
   // }
};
</script>

<style>
</style>