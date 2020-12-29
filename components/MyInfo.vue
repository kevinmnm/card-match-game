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
      <v-sheet class="mt-2" width="100%">
         <v-card class="ma-auto" width="90%">
            <div class="text-left">
               Music
               <v-btn style="right:0;" @click="$store.dispatch('setting/set_bgm_volume', 0), bgm_volume = 0">
                  <v-icon>{{ music_volume_icon }}</v-icon>
               </v-btn>
            </div>
            <v-slider
               background-color="red"
               @change="change_bgm_volume()"
               v-model="bgm_volume"
               step="0.1"
               max="1"
               min="0"
               dense
            ></v-slider>
         </v-card>
         <v-card class="ma-auto" width="90%">
            <div class="text-left">
               Sound
               <v-btn @click="$store.dispatch('setting/set_sound_volume', 0), sound_volume = 0">
                  <v-icon>{{ sound_volume_icon }}</v-icon>
               </v-btn>
            </div>
            <v-slider
               background-color="green"
               @change="change_sound_volume()"
               v-model="sound_volume"
               step="0.1"
               max="1"
               min="0"
               dense
            ></v-slider>
         </v-card>
      </v-sheet>
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
         bgm_volume: null,
         sound_volume: null
      }
   },
   computed: {
      music_volume_icon() {
         let vol = this.$store.state.setting.bgm_volume;
         if (vol === 0) {
            return "mdi-volume-mute";
         } else if (vol > 0 && vol < 0.5) {
            return "mdi-volume-low";
         } else if (vol >= 0.5 && vol < 1) {
            return "mdi-volume-medium";
         } else {
            return "mdi-volume-high";
         }
      },
      sound_volume_icon() {
         let vol = this.$store.state.setting.sound_volume;
         if (vol === 0) {
            return "mdi-volume-mute";
         } else if (vol > 0 && vol < 0.5) {
            return "mdi-volume-low";
         } else if (vol >= 0.5 && vol < 1) {
            return "mdi-volume-medium";
         } else {
            return "mdi-volume-high";
         }
      },
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
      change_bgm_volume() {
         this.$store.dispatch("setting/set_bgm_volume", this.bgm_volume);
      },
      change_sound_volume() {
         this.$store.dispatch("setting/set_sound_volume", this.sound_volume);
      },
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
   mounted() {
      this.bgm_volume = this.$store.state.setting.bgm_volume;
      this.sound_volume = this.$store.state.setting.sound_volume;
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