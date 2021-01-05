<template>
   <v-container fluid style="height: 100%">
      <v-row class="text-center">
         <v-col cols="12">
            <v-btn to="/" text plain>Monster Matches</v-btn>
         </v-col>
         <v-col cols="12" sm="7" md="5" class="ma-auto">
            <v-form autocomplete="off" style="border: 2px solid lightGrey">
               <h3>Login</h3>
               <v-text-field
                  label="Email / Username"
                  autocomplete="off"
                  v-model="login_id"
                  @keydown.space="($event) => $event.preventDefault()"
                  dense
                  filled
                  hide-details
                  full-width
                  :disabled="show_server_loading"
               ></v-text-field>
               <v-text-field
                  class="ma-0 pa-0"
                  v-model="login_pw"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  label="Password"
                  @click:append="show1 = !show1"
                  @keydown.space="($event) => $event.preventDefault()"
                  dense
                  filled
                  hide-details
                  full-width
                  :disabled="show_server_loading"
               ></v-text-field>
               <v-checkbox
                  class="ma-2 pa-0"
                  v-model="remember_username"
                  label="Remeber Email/Username"
                  dense
                  hide-details
               ></v-checkbox>
               <v-btn
                  @click="loginFunc($event)"
                  width="100%"
                  tile
                  color="deep-purple accent-4 white--text"
                  :disabled="disable_login_button || input_empty"
                  >login</v-btn>
            </v-form>
            <div class="text-left">
               <span class="forgot-credentials text-caption">Forgot Username/Password</span>
            </div>
         </v-col>
         <v-col cols="12">or</v-col>
         <v-col cols="12" class="ma-auto">
            <v-btn width="150px" color="secondary" to="/signup" :disabled="show_server_loading">signup</v-btn>
         </v-col>
         <v-col cols="12">or</v-col>
         <v-col cols="12" class="ma-auto">
            <Dialog @clicked-play="clicked_play()" :server-loading="show_server_loading">
               <template v-slot:button>Play as guest</template>
               <template #title>Choose Display Name</template>
            </Dialog>
         </v-col>
         <v-col cols="12">
            <Loading :size="30" v-if="show_server_loading">
               <template #text>Awaiting Server...</template>
            </Loading>
         </v-col>
      </v-row>
   </v-container>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
import Loading from "@/components/Loading.vue";

export default {
   name: "MainComp",
   components: {
      Dialog,
      Loading,
   },
   data() {
      return {
         show1: false,
         show_server_loading: false,
         login_id: "",
         login_pw: "",
         remember_username: false,
         disable_login_button: false,
      };
   },
   computed: {
      input_empty() {
         if (!this.login_id || !this.login_pw) {
            return true;
         } else {
            return false;
         }
      },
   },
   methods: {
      async loginFunc($event) {
         $event.preventDefault();
         this.disable_login_button = true;
         this.show_server_loading = true;

         const response = await fetch(window.server_url + "/login", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               displayName: this.login_id,
               password: this.login_pw,
            }),
         });

         const res = await response.json();
         if (!res.login) {
            this.disable_login_button = false;
            this.show_server_loading = false;
            return alert(res.msg);
         }

         this.$store.commit("guest/GUEST_DISPLAY_NAME", "");
         this.$store.commit("user/USER_INFO", res.user);
         this.$store.commit("user/USER_DISPLAY_NAME", res.user.displayName);
         this.$store.commit("general/MY_DISPLAY_NAME", res.user.displayName);
         this.$store.commit("general/CONNECT_SOCKET", true);
         localStorage.___mid = res.user._id;
      },
      clicked_play() {
         this.show_server_loading = true;
      },
   },
   watch: {
      remember_username(newVal) {
         newVal
            ? (localStorage.monster_matches_login = this.login_id)
            : (localStorage.monster_matches_login = "");
      },
   },
   mounted() {
      if (localStorage.monster_matches_login) {
         this.login_id = localStorage.monster_matches_login;
         this.remember_username = true;
      }
   },
};
</script>

<style lang="scss" scoped>
.forgot-credentials{
   color: lightGrey;
   cursor: pointer;
   user-select: none;

   &:hover{
      color: #800080;
   }
}
</style>
