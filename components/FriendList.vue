<template>
   <v-sheet width="100%" height="100%">
      <v-sheet v-if="show_loading" width="100%" height="100%" class="d-flex align-center justify-center" outlined>   
         <Loading :size="40" />
      </v-sheet>
      <v-sheet></v-sheet>
   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
   name: "FriendList",
   components: { Loading },
   data: () => ({
      show_loading: true,
   }),
   computed: {
      my_info() { // Object;
         return this.$store.state.user.user_info;
      },
      friend_list() { // Array;
         return this.$store.state.user.user_info.friend;
      }
   },
   methods: {
      async get_user_info() {
         this.show_loading = true;
         const response = await fetch(window.server_url + "/user", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               displayName: this.my_info.displayName
            })
         })

         const res = await response.json();
         this.player_info = res.foundUser;

      },
   }
};
</script>

<style>
</style>