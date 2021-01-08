<template>
   <v-sheet ref="list_wrapper" width="100%" height="80%">
      <div class="overlay" v-if="show_loading_overlay">
         <div style="width:100%; height:100px;">
            <Loading>
               <template v-slot:text>
                  Joining Room...
               </template>
            </Loading>
         </div>
      </div>
      
      <!-- PC -->
      <v-sheet
         v-if="window_width > window_height"
         width="100%"
         class="d-flex flex-row flex-start flex-wrap"
         style="overflow:auto;"
      >
         <v-card  width="100%" height="100%" color="error" v-if="custom_room_list.length === 0">
            Empty
         </v-card>
         <v-card
            v-for="(all, ind) in custom_room_list"
            :key="all + ind"
            width="50%"
            :height="wrapper_height / 3 + 'px'"
            style="cursor: pointer"
         >
            <v-hover v-slot="{ hover }" class="ma-0 pa-0">
               <v-sheet
                  width="100%"
                  height="100%"
                  class="d-flex flex-row"
                  :class="{ 'on-hover': hover }"
                  :elevation="hover ? 24 : 0"
               >
                  <div class="enter-button" v-show="hover">
                     <v-btn @click="join_custom_room(all)">Join</v-btn>
                  </div>

                  <v-sheet :width="wrapper_height / 3 + 'px'">
                     <v-responsive
                        :aspect-ratio="1 / 1"
                        :height="wrapper_height / 3 + 'px'"
                     >
                        <v-img
                           contain
                           height="100%"
                           :src="require(`@/assets/img/type/${all.theme}.png`)"
                        ></v-img>
                     </v-responsive>
                  </v-sheet>
                  <v-sheet class="d-flex flex-column flex-grow-1">
                     <v-card height="50%" width="100%">
                        <v-card flat>{{ all.title }}</v-card>
                        <v-icon v-if="all.room_type === 'private'">mdi-lock</v-icon>
                     </v-card>
                     <v-card height="50%" width="100%">{{
                        all.joined + "/" + all.capacity
                     }}</v-card>
                  </v-sheet>
               </v-sheet>
            </v-hover>
         </v-card>
      </v-sheet>

      <!-- PHONE -->
      <v-sheet
         v-if="window_width <= window_height"
         width="100%"
         height="100%"
         class="room"
      >
         <v-card  width="100%" height="100%" color="error" v-if="custom_room_list.length === 0">
            Empty
         </v-card>
         <v-card
            v-for="(all, ind) in custom_room_list"
            :key="all + ind"
            width="100%"
            :height="wrapper_height / 5 + 'px'"
            class="d-flex flex-row"
            style="cursor: pointer"
         >
            <v-hover v-slot="{ hover }" class="ma-0 pa-0">
               <v-sheet
                  width="100%"
                  height="100%"
                  class="d-flex flex-row"
                  :class="{ 'on-hover': hover }"
                  :elevation="hover ? 24 : 0"
               >
                  <div class="enter-button" v-show="hover">
                     <v-btn @click="all.room_type === 'private' ? private_dialog = true : join_custom_room(all)">Join</v-btn>
                  </div>

                  <v-sheet :width="wrapper_height / 5 + 'px'">
                     <v-responsive
                        :aspect-ratio="1 / 1"
                        :height="wrapper_height / 5 + 'px'"
                     >
                        <v-img
                           contain
                           height="100%"
                           :src="require(`@/assets/img/type/${all.theme}.png`)"
                        ></v-img>
                     </v-responsive>
                  </v-sheet>
                  <v-sheet class="d-flex flex-column flex-grow-1">
                     <v-card height="50%" width="100%">{{ all.title }}</v-card>
                     <v-card height="50%" width="100%">{{
                        all.joined + "/" + all.capacity
                     }}</v-card>
                  </v-sheet>
               </v-sheet>
            </v-hover>
            <v-dialog v-model="private_dialog">
         <template persistent>
            <v-card class="pa-3">
               <v-card flat width="100%" class="mb-2 text-left" style="font-size:20px;">Room Password</v-card>
               <v-text-field
                  v-model="room_password"
                  color="deep-purple accent-4"
                  :append-icon="show_room_password ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show_room_password = !show_room_password"
                  @keydown.space="($event) => $event.preventDefault()"
                  @input="private_dialog_error_msg = ''"
                  :type="show_room_password ? 'text' : 'password'"
                  :error-messages="private_dialog_error_msg"
                  autocomplete="off"
                  dense
                  filled
               ></v-text-field>
               <v-card class="mt-2 d-flex flex-row justify-space-around" flat width="100%">
                  <v-btn color="error" @click="private_dialog = false, private_dialog_error_msg = '', room_password = ''">Cancel</v-btn>
                  <v-btn color="classic white--text" @click="enter_private_room(all)">Enter</v-btn>
               </v-card>
            </v-card>
         </template>
      </v-dialog>
         </v-card>
      </v-sheet>
   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
   name: "RoomListComp",
   components: { Loading },
   data: () => ({
      isMounted: false,
      show_loading_overlay: false,
      private_dialog: false,
      private_dialog_error_msg: '',
      show_room_password: false,
      room_password: '',
   }),
   computed: {
      custom_room_list() {
         // Array;
         return this.$store.state.custom.custom_room_list;
      },
      wrapper_height() {
         if (!this.isMounted) {
            return;
         }
         return this.$refs.list_wrapper.$el.clientHeight;
      },
      window_width() {
         return this.$vuetify.breakpoint.width;
      },
      window_height() {
         return this.$vuetify.breakpoint.height;
      },
      my_info() {
         return this.$store.state.guest.guest_info || this.$store.state.user.user_info;
      },
   },
   methods: {
      enter_private_room(all) {
         if (all.password === this.room_password) {
            return this.join_custom_room(all);
         }
         this.private_dialog_error_msg = 'Incorrect Password!';
      },
      async join_custom_room(all) {
         this.show_loading_overlay = true;

         // if (all.room_type === 'private' && !bypass) {
         //    this.room_password = '';
         //    this.private_dialog_error_msg = '';
         //    this.private_dialog = true;
         //    this.show_loading_overlay = false;
         //    return
         // }

         let updated_list = await this.$store.dispatch('custom/fetch_custom_room_list');
         let selected_room;

         updated_list.forEach( room => {
            if (room.room_number === all.room_number) {
               selected_room = room;
            }
         });

         if (!selected_room) {
            alert('This room no longer exists.');
            return this.show_loading_overlay = false;
         }
         if (selected_room.start) {
            alert('Game already started.');
            return this.show_loading_overlay = false;
         }
         if (selected_room.joined === all.capacity) {
            alert('Room is already full.');
            return this.show_loading_overlay = false;
         }
         if (this.my_info.guest && !selected_room.allow_guest) {
            alert('Guest is not allowed in this game.');
            return this.show_loading_overlay = false;
         }
         if (selected_room.terminate) {
            alert('This room will terminate soon.');
            return this.show_loading_overlay = false;
         }
         
         window.socket.emit('join-custom-game', { roomInfo: all, joinerInfo: this.my_info });
         this.$emit('update-room-list-comp');
      },
   },
   mounted() {
      this.isMounted = true;
   },
};
</script>

<style lang="scss" scoped>
.overlay {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: rgba(0,0,0,0.9);
   z-index: 2;
   display: flex;
   justify-content: center;
   align-items: center;
}

.enter-button {
   position: absolute;
   top: 0;
   left: 0;
   height: 100%;
   width: 100%;
   background: rgba(48, 48, 48, 0.6);
   z-index: 1;
}
</style>