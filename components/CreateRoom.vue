<template>
   <v-sheet>
      <!-- <v-card> Create Room </v-card> -->
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
            style="border-radius: 0;"
            placeholder="Room Title"
            maxlength="25"
         >
         </v-text-field>
      </v-col>
      <v-carousel class="ma-auto" style="width:500px" height="min-content" ref="carousel" @change="selected_theme()" show-arrows-on-hover hide-delimiter-background>
         <v-carousel-item
            v-for="(type) in type_list"
            :key="type"
            :value="type"
         > 
            <v-responsive :aspect-ratio="1/1">
               <v-img max-height="500px" contain :src="require(`@/assets/img/type/${type}.png`)"></v-img>
            </v-responsive>
         </v-carousel-item>
      </v-carousel>
      <v-sheet>
         <v-row class="ma-0">
            <v-col cols="12" class="pa-0 ma-0 text-center">
               <v-card :color="selected_type" :class="selected_type + '_' + 'text--text'"  flat tile outlined width="100%" height="25px" style="font-size:18px;">{{
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
            <!-- <v-col cols="12" class="pa-0 ma-0">
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
                  maxlength="25"
               >
               </v-text-field>
            </v-col> -->
            <v-col cols="12" class="pa-0 ma-0 flex-row d-flex">
               <v-btn-toggle style="width: 50%">
                  <v-btn
                     class="ma-0 pa-0"
                     width="100%"
                     tile
                     text
                     outlined
                     @click="room_type = 'public', secret_key = '';"
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
            <v-col cols="12" class="flex-row d-flex justify-space-around" :class="selected_type">
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
                  <v-btn
                     class="ma-0 pa-0"
                     width="100%"
                     color="success"
                     @click="create_custom_game()"
                     :disabled="create_button_disabled"
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
      secret_key: "",
      room_type: "",
      type_list: ['classic', 'colorless', 'lovely', 'plain', 'ghosty'],
      show_key: false,
      selected_type: "classic",
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
      selected_theme() {
         if (!this.$refs.carousel) return;
         this.selected_type = this.$refs.carousel.selectedValues[0];
      },
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
};
</script>

<style>
</style>