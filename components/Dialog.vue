<template>
   <v-container fluid>
      <v-dialog v-model="dialog" persistent max-width="290">
         <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
               <slot name="button"></slot>
            </v-btn>
         </template>
         <v-card>
            <v-card-title class="headline">
               <slot name="title"></slot>
            </v-card-title>
            <v-card-text>
               <v-col cols="12" class="mb-0 pa-0">
                  <v-text-field
                     filled
                     dense
                     outlined
                     :append-icon="input_icon"
                     :color="input_color"
                     :error="input_error"
                     :messages="input_message"
                     class="guest-id"
                     v-model="displayName"
                     :loading="input_loading"
                     @input="upon_change()"
                  ></v-text-field>
               </v-col>
               <v-col cols="6" class="ma-auto pa-0">
                  <v-btn
                     @click="verify()"
                     width="100%"
                     color="info"
                     :disabled="verify_disabled"
                     small
                     >verify</v-btn
                  >
               </v-col>
            </v-card-text>
            <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn color="error" @click="dialog = false" width="50%">
                  Cancel
               </v-btn>
               <v-btn
                  color="green darken-1 white--text"
                  @click="play()"
                  width="50%"
                  :disabled="play_disabled"
               >
                  Play
               </v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </v-container>
</template>

<script>
import { io } from "socket.io-client";

export default {
   name: "Dialog",
   components: {},
   data() {
      return {
         dialog: false,
         input_loading: false,
         input_error: false,
         input_message: "",
         play_disabled: false,
         verify_disabled: true,
         input_icon: "mdi-check-bold",
         input_color: "green",
         displayName: "",
      };
   },
   methods: {
      async play() {
         this.dialog = false;
         const resp = await fetch(window.server_url + "/guest", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               action: "create",
               displayName: this.$store.state.guest.guest_display_name,
            }),
         });

         const data = await resp.json();
         console.dir(data.new_guest);
         localStorage.___mid = data.new_guest._id;

         window.socket = io(window.server_url, {
            query: {
               payload: JSON.stringify(data)
            }
         });

         window.socket.on("connect", () => {
            localStorage.___sid = socket.id;
            this.$store.commit('general/SIGNED_IN', true);
         });
      },
      async verify() {
         if (!this.displayName) {
            this.input_error = true;
            this.input_message = "Unavailable";
            return;
         }

         const resp = await fetch(window.server_url + "/guest", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               action: "verify",
               displayName: this.$store.state.guest.guest_display_name,
            }),
         });

         const res = await resp.json();

         console.log(res);

         if (res.find_guest) {
            // If displayName cannot be used (already taken).
            this.input_icon = "mdi-check-bold";
            this.play_disabled = true;
            this.verify_disabled = false;
            this.input_color = "error";
            this.input_loading = false;
            this.input_error = true;
            this.input_message = "Unavailable";
         } else if (!res.find_guest) {
            // If displayName can be used.
            this.input_icon = "mdi-close-thick";
            this.play_disabled = false;
            this.verify_disabled = true;
            this.input_color = "green";
            this.input_loading = false;
            this.input_error = false;
            this.input_message = "Available";
         }
      },
      upon_change() {
         this.$store.commit("guest/GUEST_DISPLAY_NAME", this.displayName);
         this.verify_disabled = false;
         this.play_disabled = true;
         this.input_icon = null;
         this.input_color = null;
         this.input_message = "";
      },
   },
   mounted() {
      let first = Math.floor(Math.random() * 10) + "";
      let second = Math.floor(Math.random() * 10) + "";
      let third = Math.floor(Math.random() * 10) + "";
      let fourth = Math.floor(Math.random() * 10) + "";
      let fifth = Math.floor(Math.random() * 10) + "";
      this.displayName =
         "Guest" + "-" + first + second + third + fourth + fifth;
      this.$store.commit("guest/GUEST_DISPLAY_NAME", this.displayName);
   },
};
</script>

<style scoped>
.guest-id {
   font-family: "comic sans ms", sans-serif;
   font-weight: bold;
}
</style>