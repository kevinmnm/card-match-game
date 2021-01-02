<template>
   <v-sheet>
      <v-card tile class="ma-auto" :width="$vuetify.breakpoint.width < 700 ? '100%' : '70%'">
         <v-card-title
            class="white--text font-weight-bold deep-purple accent-4"
         >
            <v-btn to="/">monster matches</v-btn>
         </v-card-title>
         <v-card-text>
            <v-form ref="registerForm" v-model="valid" lazy-validation>
               <v-row>
                  <v-col cols="12" sm="6" md="6">
                     <v-text-field
                        v-model="firstName"
                        :rules="[rules.required]"
                        label="First Name"
                        maxlength="20"
                        required
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                     <v-text-field
                        v-model="lastName"
                        :rules="[rules.required]"
                        label="Last Name"
                        maxlength="20"
                        required
                     ></v-text-field>
                  </v-col>
                   <v-col cols="8" md="9">
                     <v-text-field
                        v-model="dob"
                        label="Date of Birth"
                        required
                        type='Date'
                     ></v-text-field>
                  </v-col>
                   <v-col cols="8" md="9">
                     <v-text-field
                        v-model="gender"
                        label="Gender"
                        required
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                     <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                     ></v-text-field>
                  </v-col>
                  <v-col cols="8" md="9">
                     <v-text-field
                        v-model="username"
                        :rules="[rules.required, rules.idMin]"
                        :error-messages="unavailable_message"
                        :success-messages="available_message"
                        label="Username"
                        maxlength="10"
                        required
                        @input="enable_verify = true, id_verified = false, available_message = '';"
                     ></v-text-field>
                  </v-col>
                  <v-col cols="4" md="3" class="align-self-center">
                     <v-btn class="white--text" small @click="verify_username()" :disabled="!enable_verify" color="deep-purple accent-4">verify</v-btn>
                  </v-col>
                  <v-col cols="12">
                     <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                     <v-text-field
                        block
                        v-model="verify"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        counter
                        @click:append="show1 = !show1"
                     ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
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
      <v-dialog v-model="verification_code_dialog" persistent>
         <v-card>
            <v-card-title>Verification Code</v-card-title>
            <v-text-field v-model="verification_code" dense ></v-text-field>
            <v-btn @click="verify_code()" dense>Verify</v-btn>
         </v-card>
      </v-dialog>
      <v-dialog v-model="account_created_dialog" persistent>
         <h2>Account create! Please log in.</h2>
         <v-btn to="/" color="info">Confirm</v-btn>
      </v-dialog>
   </v-sheet>
</template>

<script>
export default {
   name: "Signup",
   computed: {
      passwordMatch() {
         return () => this.password === this.verify || "Password must match";
      },
   },
   data: () => ({
      valid: true,
      id_verified: false,
      enable_verify: false,
      available_message: "",
      unavailable_message: "",
      signup_loading: false,
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
         idMin: val => (val && val.length >= 3) || "Min 3 characters"
      },
      verification_code_dialog: false,
      verification_code: null,
      account_created_dialog: false
   }),
   methods: {
      extra_verifier() {
         (this.id_verified && this.available_message && this.username && this.firstName && this.lastName && this.email && this.verify && this.password === this.verify) ?
            true :
            false;
      },
      async verify_username() {
         const response = await fetch(window.server_url + '/username', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
               displayName: this.username
            })
         });

         const res = await response.json();
         if (res.available) {
            this.unavailable= '';
            this.available_message = 'Available';
            this.id_verified = true;
            this.enable_verify = false;
            !this.extra_verifier() ? this.valid = false : null;
         } else {
            this.available_message = '';
            this.unavailable_message = 'Username taken';
         }
      },
      async signup_pending() {
         this.signup_loading = true;
         if (!this.$refs.registerForm.validate() || !this.id_verified) {
            this.signup_loading = false;
            return alert('Please review your information.');
         }

         const response = await fetch(window.server_url + '/pending', {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
               displayName: this.username,
               firstName: this.firstName,
               lastName: this.lastName,
               email: this.email,
               password: this.password,
               dob: this.dob,
               gender: this.gender 
            })
         });

         const res = await response.json();

         if (!res.available) { // If email already pending for verification,
            alert(res.msg);
         } else { // Send email logic needs to go here...
            this.verification_code_dialog = true;
         }

      },
      async verify_code() {
         const response = await fetch(window.server_url + '/verify', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
               displayName: this.username,
               verificationCode: this.verification_code
            })
         });

         const res = await response.json();
         if (res.valid) {
            this.account_created_dialog = true;
         } else {
            alert('Invalid code');
         }
      }
   },
};
</script>

<style>
</style>