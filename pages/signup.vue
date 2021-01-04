<template>
   <v-sheet class="d-flex align-self-center" height="100%">
      <v-card
         tile
         class="ma-auto"
         :width="$vuetify.breakpoint.width < 600 ? '100%' : '70%'"
         :height="$vuetify.breakpoint.width < 600 ? '100%' : 'auto'"
      >
         <v-card-title class="deep-purple accent-4">
            <v-btn to="/" class="white--text font-weight-bold deep-purple accent-4" style="font-size:18px;" depressed>Monster Matches</v-btn>
         </v-card-title>
         <v-card-text>
            <v-form ref="registerForm" v-model="valid" lazy-validation>
               <v-row>
                  <v-col cols="12" sm="6" md="6">
                     <v-text-field
                        class="ma-0 pa-0"
                        v-model="firstName"
                        :rules="[rules.required]"
                        label="First Name"
                        maxlength="20"
                        required
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                     <v-text-field
                        class="ma-0 pa-0"
                        v-model="lastName"
                        :rules="[rules.required]"
                        label="Last Name"
                        maxlength="20"
                        required
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8" md="9">
                     <v-text-field
                        class="ma-0 pa-0"
                        v-model="dob"
                        label="Date of Birth"
                        require
                        type="Date"
                        placeholder="mm/dd/yyyy"
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8" md="9">
                     <v-select
                        v-model="gender"
                        label="Gender"
                        :items="['Male', 'Female']"
                        dense
                     ></v-select>
                  </v-col>
                  <v-col cols="12">
                     <v-text-field
                        class="ma-0 pa-0"
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        @keydown.space="($event) => $event.preventDefault()"
                     ></v-text-field>
                  </v-col>
                  <v-col cols="8" md="9">
                     <v-text-field
                        class="ma-0 pa-0"
                        v-model="username"
                        :rules="[rules.required, rules.idMin]"
                        :error-messages="unavailable_message"
                        :success-messages="available_message"
                        label="Username"
                        maxlength="10"
                        required
                        @input="
                           (enable_verify = true),
                              (id_verified = false),
                              (available_message = ''),
                              !username ? enable_verify = false : enable_verify = true
                        "
                        @keydown.space="($event) => $event.preventDefault()"
                     ></v-text-field>
                  </v-col>
                  <v-col cols="4" md="3" class="align-self-center">
                     <v-btn
                        class="white--text"
                        small
                        @click="verify_username()"
                        :disabled="!enable_verify"
                        color="deep-purple accent-4"
                        width="100%"
                        >verify</v-btn
                     >
                  </v-col>
                  <v-col cols="12">
                     <v-text-field
                        class="ma-0 pa-0"
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                        @keydown.space="($event) => $event.preventDefault()"
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                     <v-text-field
                        class="ma-0 pa-0"
                        block
                        v-model="verify"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        counter
                        @click:append="show1 = !show1"
                        @keydown.space="($event) => $event.preventDefault()"
                     ></v-text-field>
                  </v-col>
                  <v-col>
                     <v-btn
                        large
                        block
                        :disabled="!id_verified || enable_verify"
                        color="success"
                        @click="signup_pending()"
                        :loading="signup_loading"
                     >
                        SIGNUP
                     </v-btn>
                  </v-col>
               </v-row>
            </v-form>
         </v-card-text>
      </v-card>
      <v-dialog
         v-model="verification_code_dialog"
         :width="$vuetify.breakpoint.width <= 600 ? '100%' : $vuetify.breakpoint.width < 1000 ? '50%' : '40%'"
         persistent
      >
         <v-card>
            <v-card-title
               class="white--text font-weight-bold deep-purple accent-4"
            >
               <span>
                  Verify Your Email
                  <v-icon color="white">mdi-email-check</v-icon>
               </span>
            </v-card-title>
            <v-card-text class="mt-1 mb-0">
               Email has sent to:
               <span class="font-weight-bold">{{
                  email
               }}</span></v-card-text
            >
            <v-card-title class="mt-0">
               <v-text-field
                  color="deep-purple accent-4"
                  label="Verification Code"
                  v-model="verification_code"
                  :error-messages="invalid_message"
                  @input="invalid_message = ''"
                  autocomplete="off"
                  append-icon="mdi-key"
                  dense
                  filled
               ></v-text-field>
            </v-card-title>
            <v-card-title>
               <v-btn
                  class="white--text font-weight-bold"
                  width="100%"
                  @click="verify_code()"
                  dense
                  plain
                  color="deep-purple accent-4"
                  >Submit</v-btn
               >
            </v-card-title>
         </v-card>
      </v-dialog>
      <v-dialog 
         v-model="account_created_dialog"
         :width="$vuetify.breakpoint.width <= 600 ? '100%' : $vuetify.breakpoint.width < 1000 ? '50%' : '40%'"
         persistent
       >
         <v-card tile>
            <v-card-title>
               <span>
                  Account created! Please log in!
                  <v-icon color="deep-purple accent-4">mdi-party-popper</v-icon> 
                  </span>
            </v-card-title>
            <v-card-actions>
               <v-btn to="/main" class="white--text font-weight-bold deep-purple accent-4">Confirm</v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </v-sheet>
</template>

<script>
export default {
   name: "Signup",
   computed: {
      passwordMatch() {
         return () => this.password === this.verify || "Passwords must match";
      },
   },
   data: () => ({
      valid: true,
      id_verified: false,
      enable_verify: false,
      available_message: "",
      unavailable_message: "",
      signup_loading: false,
      invalid_message: "",
      username: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      email: "",
      password: "",
      verify: "",
      emailRules: [
         (v) => !!v || "Required",
         (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],

      show1: false,
      rules: {
         required: (value) => !!value || "Required.",
         min: (v) => (v && v.length >= 8) || "Min 8 characters",
         idMin: (val) => (val && val.length >= 3) || "Min 3 characters",
      },
      verification_code_dialog: false,
      verification_code: null,
      account_created_dialog: false,
   }),
   methods: {
      extra_verifier() {
         this.id_verified &&
         this.available_message &&
         this.username &&
         this.firstName &&
         this.lastName &&
         this.email &&
         this.verify &&
         this.password === this.verify
            ? true
            : false;
      },
      async verify_username() {
         if (this.username.toLowerCase().includes('guest')) {
            return this.unavailable_message ="Cannot contain the word 'guest'"
         }
         const response = await fetch(window.server_url + "/username", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               displayName: this.username,
            }),
         });

         const res = await response.json();
         if (res.available) {
            this.unavailable_message = "";
            this.available_message = "Username available";
            this.id_verified = true;
            this.enable_verify = false;
            !this.extra_verifier() ? (this.valid = false) : null;
         } else {
            this.available_message = "";
            this.unavailable_message = "Username taken";
         }
      },
      async signup_pending() {
         this.signup_loading = true;
         if (!this.$refs.registerForm.validate() || !this.id_verified) {
            this.signup_loading = false;
            return alert("Please review your information.");
         }

         const response = await fetch(window.server_url + "/pending", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               displayName: this.username,
               firstName: this.firstName,
               lastName: this.lastName,
               email: this.email,
               password: this.password,
               dob: this.dob,
               gender: this.gender,
            }),
         });

         const res = await response.json();

         if (!res.available) {
            if (res.status === 'pending') {
               alert(res.msg);
               this.verification_code_dialog = true;
            } else {
               alert(res.msg);
               window.$nuxt.$router.push('/main');
            }
         } else {
            // Send email logic triggers from backend;
            this.verification_code_dialog = true;
         }
      },
      async verify_code() {
         const response = await fetch(window.server_url + "/verify", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               displayName: this.username,
               verificationCode: this.verification_code,
            }),
         });

         const res = await response.json();
         if (res.valid) {
            this.account_created_dialog = true;
         } else {
            this.invalid_message = res.msg;
         }
      },
   },
};
</script>
