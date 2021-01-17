<template>
   <v-sheet ref="myinfo" class="d-flex flex-column text-center">
      <v-card class="mb-1 font-weight-bold" style="font-size:16px;">
         <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
               <v-btn 
                  v-if="user_info && user_info.friend_pending.length > 0"
                  @click="show_friend_pending = true"
                  absolute 
                  text 
                  style="top:0; left:0;" 
                  height="100%" 
                  width="50px" 
                  v-on="on" 
                  v-bind="attrs"
               >
                  <v-badge :content="user_info.friend_pending.length" offset-x="-5" offset-y="22">
                     <v-icon color="info">mdi-account-group</v-icon>
                  </v-badge>
               </v-btn>
            </template>
            <span>Friend Requests</span>
         </v-tooltip>
         {{ my_display_name }}
         <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
               <v-btn absolute text style="top:0; right:0;" height="100%" width="50px" v-bind="attrs" v-on="on" v-if="!my_info.guest">
                  <v-icon color="secondary">mdi-cog</v-icon>
               </v-btn>
            </template>
            <v-sheet class="d-flex flex-column text-center">
               <v-btn @click="comming_soon()">Change Username</v-btn>
               <v-btn @click="show_change_cred = true;">Change Password</v-btn>
            </v-sheet>
         </v-menu>
      </v-card>

      <v-dialog v-model="show_change_cred" persistent>
         <v-sheet>
            <v-card>
               <v-card-title>Change Password</v-card-title>
            </v-card>
            <v-text-field
               class="ma-0 pa-0"
               v-model="current_pw"
               :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
               :type="show1 ? 'text' : 'password'"
               label="Current Password"
               @click:append="show1 = !show1"
               @keydown.space="($event) => $event.preventDefault()"
               @input="current_pw_error = false;"
               :error="current_pw_error"
               dense
               filled
               hide-details
               full-width
            ></v-text-field>
            <v-text-field
               class="ma-0 pa-0"
               v-model="new_pw"
               :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
               :type="show1 ? 'text' : 'password'"
               label="New Password"
               @click:append="show1 = !show1"
               @keydown.space="($event) => $event.preventDefault()"
               @input="new_pw_error = false;"
               :error="new_pw_error"
               dense
               filled
               hide-details
               full-width
            ></v-text-field>
            <v-text-field
               class="ma-0 pa-0"
               v-model="confirm_new_pw"
               :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
               :type="show1 ? 'text' : 'password'"
               label="Confirm New Password"
               @click:append="show1 = !show1"
               @keydown.space="($event) => $event.preventDefault()"
               @input="new_pw_error = false;"
               :error="new_pw_error"
               dense
               filled
               hide-details
               full-width
            ></v-text-field>
            <v-col cols="12" class="ma-o pa-0 d-flex flex-row">
               <v-btn width="50%" color="error" @click="show_change_cred = false, reset_change_cred()">Cancel</v-btn>
               <v-btn color="primary" width="50%" @click="cred_action = 'change-password', change_cred()" :disabled="(!current_pw || !new_pw || !confirm_new_pw) ? true : false" :loading="change_button_loading">Change</v-btn>
            </v-col>
         </v-sheet>
      </v-dialog>
      
      <Loading v-if="loader_show" />
      <!-- <v-sheet v-else class="d-flex justify-center" :class="$vuetify.breakpoint.name === 'xs' ? 'flex-column' : 'flex-row'"> -->
      <v-sheet v-else class="d-flex" :class="($vuetify.breakpoint.width < $vuetify.breakpoint.height) ? 'flex-column' : 'flex-row'">
         <!-- <v-card flat tile height="100%" width="50%" min-width="240px" class="ma-auto"> -->
         <v-card flat tile height="100%" width="50%" max-width="240px" class="ma-auto">
            <v-img height="100%" :src="require(`@/assets/img/rank/${my_info.rank}.png`)"></v-img>
         </v-card>
         <v-sheet class="d-flex flex-column ma-auto" height="100%" width="50%" min-width="240px">
            <v-simple-table dense>
               <tbody>
                  <tr class="text-left">
                     <th>RANK</th>
                     <td>{{ (my_info.rank).toUpperCase() }}</td>
                  </tr>
                  <tr class="text-left">
                     <th>TIER</th>
                     <td>{{ my_info.guest ? 'N/A' : my_info.tier }}</td>
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
                  <v-tooltip bottom>
                     <template v-slot:activator="{ on, attrs }">
                        <tr class="text-left" v-bind="attrs" v-on="on">
                           <th>EXP</th>
                           <td>{{ my_info.guest ? 'N/A' : `${my_info.totalScore} / ${exp_needed}` }}</td>
                        </tr>
                     </template>
                     <div>{{my_info.tier === 'III' ? 'Until Next Rank' : 'Until Next Tier'}}</div>
                  </v-tooltip>
                  <tr class="text-left">
                     <th>JOINED</th>
                     <td>{{ my_info.guest ? 'N/A' : my_info.joinedOn }}</td>
                  </tr>
               </tbody>
            </v-simple-table>
         </v-sheet>
      </v-sheet>
      <v-btn color="error" @click="$emit('hide-my-info')">Close</v-btn>

<!-- FRIEND PENDING DIALOG -->
      <v-dialog v-model="show_friend_pending" :fullscreen="($vuetify.breakpoint.width < 500) ? true : false" persistent>

         <v-sheet width="100%" height="100%" style="font-size: 20px;">
            <v-sheet width="100%" height="calc(100% - 35px)">
               <v-card class="text-center" flat tile>Pending Friend Requests</v-card>
               <v-card
                  v-for="(pend,ind) in my_info.friend_pending"
                  :key="pend+ind"
                  color="classic"
                  class="d-flex flex-column justify-center align-center mb-3 ma-auto pa-2"
                  :width="($vuetify.breakpoint.width < 500) ? '100%' : '60%'"
                  :tile="($vuetify.breakpoint.width < 500) ? true : false"
               >
                  <v-card class="text-center" color="white--text transparent" flat>
                     <span style="font-weight:bold; color:orange;">{{pend.displayName}} </span>
                     <span>wants to be your friend.</span>
                  </v-card>
         
                  <v-sheet color="transparent" width="100%" class="d-flex flex-row flex-wrap justify-space-around">
                     <v-btn width="35%" color="success" @click="friend_request_handler('accept', pend.displayName)">Accept</v-btn>
                     <v-btn width="35%" color="error" @click="friend_request_handler('reject', pend.displayName)">Reject</v-btn>
                  </v-sheet>
               </v-card>
            </v-sheet>

            <v-sheet width="100%" height="35px">
               <v-btn @click="show_friend_pending = false;" height="35px" width="100%" color="error" tile depressed>
                  Close
               </v-btn>
            </v-sheet>
         </v-sheet>

      </v-dialog>
   </v-sheet>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
   name: "MyInfoComp",
   components: { Loading },
   data() {
      return {
         show_friend_pending: false,
         loader_show: true,
         show_change_cred: false,
         cred_action: '',
         show1: false,
         current_pw: '',
         new_pw: '',
         confirm_new_pw: '',
         new_pw_error: false,
         current_pw_error: false,
         change_button_loading: false,
      }
   },
   computed: {
      my_display_name() {
         return this.$store.state.general.my_display_name;
      },
      my_info() {
         return this.$store.state.guest.guest_info || this.$store.state.user.user_info;
      },
      guest_info() {
         return this.$store.state.guest.guest_info;
      },
      user_info() {
         return this.$store.state.user.user_info;
      },
      exp_needed() {
         if (this.my_info.rank === 'noobie') {
            if (this.my_info.tier === 'I') {return 500;}
            if (this.my_info.tier === 'II') {return 1000;}
            if (this.my_info.tier === 'III') {return 2000;}
         }
         if (this.my_info.rank === 'junior') {
            if (this.my_info.tier == 'I') {return 4000}
            if (this.my_info.tier === 'II') {return 8000;}
            if (this.my_info.tier === 'III') {return 16000;}
         }
         if (this.my_info.rank === 'bronze') {
            if (this.my_info.tier === 'I') {return 32000;}
            if (this.my_info.tier === 'II') {return 64000;}
            if (this.my_info.tier === 'III') {return 128000;}
         }
         if (this.my_info.rank === 'silver') {
            if (this.my_info.tier === 'I') {return 256000;}
            if (this.my_info.tier === 'II') {return 512000;}
            if (this.my_info.tier === 'III') {return 1024000;}
         }
      }
   },
   methods: {
      comming_soon(){
         alert('Comming Soon');
      },
      friend_request_handler(action, displayName) {
         window.socket.emit("friend-request", {
            action,
            requesterDisplayName: displayName,
            playerInfo: this.user_info,
         });
      },
      reset_change_cred() {
         this.new_pw = '';
         this.current_pw = '';
         this.current_pw_error = false;
         this.confirm_new_pw = '';
         this.new_pw_error = false;
         this.current_pw_error = false;
         this.show1 = false;
      },
      async change_cred() {
         this.change_button_loading = true;
         if (this.new_pw !== this.confirm_new_pw) {
            alert('Passwords are not matching');
            this.new_pw = '';
            this.confirm_new_pw = '';
            this.new_pw_error = true;
            return this.change_button_loading = false;
         }

         const response = await fetch(window.server_url + "/change", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               _id: this.user_info._id,
               action: this.cred_action,
               currentPassword: this.current_pw,
               newPassword: this.new_pw
            })
         })

         const res = await response.json();
         if (!res.status) {
            alert(res.msg);
            this.current_pw_error = true;
            this.current_pw = '';
            return this.change_button_loading = false;
         }
         alert(res.msg);
         window.location.reload();
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