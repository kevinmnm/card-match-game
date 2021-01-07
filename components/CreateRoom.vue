<template>
   <v-sheet>
      <v-card> Create Room </v-card>
      <v-sheet class="d-flex flex-wrap justify-center" style="overflow: hidden">
         <v-hover v-slot="{ hover }">
            <v-card
               :class="{ 'on-hover': hover }"
               :width="vuetify_breakpoint === 'xs' ? '50%' : '25%'"
               style="cursor: pointer"
               :elevation="hover ? 24 : 0"
               :style="hover ? 'opacity:1' : 'opacity:0.9'"
               @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')"
               @click="selected_type = 'classic'"
            >
               <v-responsive :aspect-ratio="1 / 1">
                  <v-img
                     :src="require('@/assets/img/type/classic.png')"
                     eager
                  ></v-img>
               </v-responsive>
            </v-card>
         </v-hover>
         <v-hover v-slot="{ hover }">
            <v-card
               :class="{ 'on-hover': hover }"
               :width="vuetify_breakpoint === 'xs' ? '50%' : '25%'"
               style="cursor: pointer"
               :elevation="hover ? 24 : 0"
               :style="hover ? 'opacity:1' : 'opacity:0.9'"
               @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')"
               @click="selected_type = 'lovely'"
            >
               <v-responsive :aspect-ratio="1 / 1">
                  <v-img :src="require('@/assets/img/type/lovely.png')" eager></v-img>
               </v-responsive>
            </v-card>
         </v-hover>
         <v-hover v-slot="{ hover }">
            <v-card
               :class="{ 'on-hover': hover }"
               :width="vuetify_breakpoint === 'xs' ? '50%' : '25%'"
               style="cursor: pointer"
               :elevation="hover ? 24 : 0"
               :style="hover ? 'opacity:1' : 'opacity:0.9'"
               @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')"
               @click="selected_type = 'plain'"
            >
               <v-responsive :aspect-ratio="1 / 1">
                  <v-img :src="require('@/assets/img/type/plain.png')"></v-img>
               </v-responsive>
            </v-card>
         </v-hover>
         <v-hover v-slot="{ hover }">
            <v-card
               :class="{ 'on-hover': hover }"
               :width="vuetify_breakpoint === 'xs' ? '50%' : '25%'"
               style="cursor: pointer"
               :elevation="hover ? 24 : 0"
               :style="hover ? 'opacity:1' : 'opacity:0.9'"
               @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')"
               @click="selected_type = 'colorless'"
            >
               <v-responsive :aspect-ratio="1 / 1">
                  <v-img
                     :src="require('@/assets/img/type/colorless.png')"
                  ></v-img>
               </v-responsive>
            </v-card>
         </v-hover>
      </v-sheet>
      <v-sheet>
         <v-row class="ma-0">
            <v-col cols="12" class="pa-0 ma-0 text-center">
               <v-card outlined width="100%" height="25px" style="font-size:18px;">{{
                  selected_type.toUpperCase()
               }}</v-card>
            </v-col>
            <v-col cols="12" class="pa-0 ma-0">
               <v-btn-toggle style="width: 25%">
                  <v-btn
                     @click="set_room_capacity(2)"
                     class="text-lowercase"
                     width="100%"
                     tile
                     text
                     outlined
                     >1vs1</v-btn
                  >
                  <v-btn
                     @click="set_room_capacity(4)"
                     class="text-lowercase"
                     width="100%"
                     tile
                     text
                     outlined
                     >2vs2</v-btn
                  >
                  <v-btn
                     @click="set_room_capacity(6)"
                     class="text-lowercase"
                     width="100%"
                     tile
                     text
                     outlined
                     disabled
                     >3vs3</v-btn
                  >
                  <v-btn
                     @click="set_room_capacity(3)"
                     class="text-lowercase"
                     width="100%"
                     tile
                     text
                     outlined
                     disabled
                     >1vs1vs1</v-btn
                  >
               </v-btn-toggle>
            </v-col>
            <v-col cols="12" class="pa-0 ma-0">
               <v-text-field
                  v-model="room_title"
                  dense
                  hide-details
                  flat
                  single-line
                  filled
                  outlined
                  autocomplete="off"
                  style="border-radius: 0"
                  placeholder="Room Title"
               >
               </v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0 ma-0 flex-row d-flex">
               <v-btn-toggle style="width: 50%">
                  <v-btn
                     class="ma-0 pa-0"
                     width="100%"
                     tile
                     text
                     outlined
                     @click="room_type = 'public', secret_key = null;"
                     >public</v-btn
                  >
                  <v-btn
                     class="ma-0 pa-0"
                     width="100%"
                     tile
                     text
                     outlined
                     @click="room_type = 'private'"
                     >private</v-btn
                  >
               </v-btn-toggle>
            </v-col>
            <v-col cols="12" class="ma-0 pa-0" v-if="room_type === 'private'">
               <v-text-field
                  v-model="secret_key"
                  dense
                  hide-details
                  flat
                  single-line
                  filled
                  outlined
                  autocomplete="off"
                  style="border-radius: 0"
                  placeholder="Room Key"
                  :type="show_key ? 'text' : 'password'"
                  :append-icon="show_key ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show_key = !show_key"
                  @keydown.space="($event) => $event.preventDefault()"
               >
               </v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0 ma-0">
               <v-btn-toggle style="width: 50%">
                  <v-tooltip top>
                     <template v-slot:activator="{ on, attrs }">
                        <v-btn
                           class="ma-0 pa-0"
                           width="100%"
                           tile
                           text
                           outlined
                           v-bind="attrs"
                           v-on="on"
                           @click="allow_guest = true"
                           >Mixed</v-btn
                        >
                     </template>
                     <span>Allow both users and guests to join the room.</span>
                  </v-tooltip>
                  <v-tooltip top>
                     <template v-slot:activator="{ on, attrs }">
                        <v-btn
                           class="ma-0 pa-0"
                           width="100%"
                           tile
                           text
                           outlined
                           v-bind="attrs"
                           v-on="on"
                           @click="allow_guest = false"
                           >Users</v-btn
                        >
                     </template>
                     <span>Only users can join the room.</span>
                  </v-tooltip>
               </v-btn-toggle>
            </v-col>
            <v-col cols="12" class="flex-row d-flex justify-space-around mt-5">
               <v-col cols="4" class="pa-0 ma-0">
                  <v-btn
                     @click="$emit('close-create-room-dialog');"
                     class="ma-0 pa-0"
                     width="100%"
                     color="error"
                     >cancel</v-btn
                  >
               </v-col>
               <v-col cols="4" class="pa-0 ma-0">
                  <!-- <v-btn
                     class="ma-0 pa-0"
                     width="100%"
                     color="success"
                     @click="create_custom_game()"
                     :disabled="create_button_disabled"
                     >create</v-btn
                  > -->
                  <v-btn
                     class="ma-0 pa-0"
                     width="100%"
                     color="success"
                     @click="create_custom_game()"
                     disabled
                     >create</v-btn
                  >
               </v-col>
            </v-col>
         </v-row>
      </v-sheet>
   </v-sheet>
</template>

<script>
/** ADD ALLOW GUEST OPTION (currently default to true) **/

export default {
   name: "CreateRoom",
   scrollToTop: true,
   data: () => ({
      room_title: "Let's play!",
      secret_key: null,
      room_type: "",
      show_key: false,
      selected_type: "",
      room_capacity: null,
      allow_guest: null,
   }),
   computed: {
      vuetify_breakpoint() {
         return this.$vuetify.breakpoint.name;
      },
      user_info() {
         return this.$store.state.user.user_info;
      },
      create_button_disabled() {
         if (
            !this.room_title ||
            !this.room_type ||
            !this.selected_type ||
            !this.room_capacity ||
            this.allow_guest === null ||
            (this.room_type === "private" && !this.secret_key)
         ) {
            return true;
         }
         return false;
      },
   },
   methods: {
      set_room_capacity(capacity) {
         this.room_capacity = capacity;
      },
      create_custom_game() {
         if (!this.user_info) {
            alert("Only users can create games.");
            this.$emit("close-create-room-dialog");
            return;
         }

         this.$store.commit('room/ROOM_TYPE', 'custom');

         window.socket.emit("create-custom-game", {
            roomType: this.room_type,
            roomTitle: this.room_title,
            roomPassword: this.secret_key,
            roomCapacity: this.room_capacity,
            allowGuest: this.allow_guest,
            roomTheme: this.selected_type,
            creator_id: this.user_info._id,
         });
      },
   },
   // mounted() {
   //    // this.$refs['create-room-component'].scrollTop = 0;
   //    this.$vuetify.goTo(this.$refs['create-room-component'])
   // },
   // beforeDestroy() {
   //    console.log(this.$refs['create-room-component']);
   // }
};
</script>

<style>
</style>