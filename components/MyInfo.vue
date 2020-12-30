<template>
   <v-sheet class="d-flex flex-column text-center">
      <v-card class="mb-1 font-weight-bold" style="font-size:16px;">
         {{ my_display_name }}
         <v-btn absolute text style="top:0; right:0;" height="100%" width="50px" @click="$emit('hide-my-info')">
            <v-icon color="error">mdi-close</v-icon>
         </v-btn>
      </v-card>
      <Loading v-if="loader_show" />
      <v-sheet v-else class="d-flex justify-center" :class="$vuetify.breakpoint.name === 'xs' ? 'flex-column' : 'flex-row'">
         <v-card flat tile height="100%" width="50%" min-width="240px" class="ma-auto">
            <v-img height="100%" :src="require('@/assets/img/rank/stone.png')"></v-img>
         </v-card>
         <v-sheet class="d-flex flex-column ma-auto" height="100%" width="50%" min-width="240px">
            <v-simple-table>
               <tbody>
                  <tr class="text-left">
                     <th>LEVEL</th>
                     <td>{{ my_info.level }}</td>
                  </tr>
                  <tr class="text-left">
                     <th>RANK</th>
                     <td>{{ my_info.rank ? my_info.rank.tier : "Stone" }}</td>
                  </tr>
                  <tr class="text-left">
                     <th>WIN</th>
                     <td>{{ my_info.win }}</td>
                  </tr>
                  <tr class="text-left">
                     <th>LOSS</th>
                     <td>{{ my_info.loss }}</td>
                  </tr>
                  <tr class="text-left">
                     <th>DRAW</th>
                     <td>{{ my_info.draw }}</td>
                  </tr>
               </tbody>
            </v-simple-table>
         </v-sheet>
      </v-sheet>
      <hr />
   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
   name: "MyInfoComp",
   components: { Loading },
   data() {
      return {
         loader_show: true,
         my_info: null,
      }
   },
   computed: {
      my_display_name() {
         return this.$store.state.general.my_display_name;
      },
      guest_info() {
         return this.$store.state.guest.guest_info;
      },
      user_info() {
         return // user info;
      }
   },
   methods: {
      async get_guest_info() {
         const response = await fetch(window.server_url + "/guest", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               action: "verify",
               displayName: this.my_display_name,
            }),
         });

         const res = await response.json();
         this.my_info = res.find_guest;

         this.loader_show = false;
      },
      async get_user_info() {
         const response = await fetch(window.server_url + "/user", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               action: "verify",
               displayName: this.my_display_name,
            }),
         });

         const res = await response.json();
         this.my_info = res.find_guest;

         this.loader_show = false;
      },
   },
   created() {
      if (this.guest_info) {
         this.get_guest_info();
      } else {
         this.get_user_info();
      }
   },
};
</script>

<style>
</style>