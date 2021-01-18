<template>
   <v-card
      v-if="alert_show"
      class="personal-alert white--text animate__animated animate__fadeInUp"
      :elevation="24"
      color="classic"
   >
      <v-sheet
         class="d-flex flex-column flex-wrap justify-space-around align-center"
         width="100%"
         height="100%"
         color="transparent"
      >
         <v-card class="white--text" width="90%" color="transparent" flat tile>
            {{ alert_msg }}
         </v-card>
         <v-card
            v-if="alert_html"
            v-html="alert_html"
            class="text-center yellow--text"
            color="transparent"
            flat
            tile
         ></v-card>
         <v-card
            class="d-flex flex-row flex-wrap justify-space-around"
            color="transparent"
         >
            <v-btn
               v-for="(all, ind) in alert_buttons"
               :key="all + ind"
               :color="all.color"
               @click="(alert_from === 'server') ? click_action(all.action) : all.action($store);"
               :disabled="!alert_show"
            >
               {{ all.text }}
            </v-btn>
         </v-card>
      </v-sheet>
   </v-card>
</template>

<script>
export default {
   // mounted() {
   //    this.$store.commit("alert/SHOW_ALERT", {
   //       msg: "This is a test message. Hope this works well...",
   //       html: "<b>What....</b>",
   //       buttons: [
   //          {
   //             text: "Ok",
   //             color: "primary",
   //             action: ($store) => {
   //                $store.commit("alert/RESET_ALERT");
   //             },
   //          },
   //       ],
   //    });
   // },
   name: "PersonalAlert",
   computed: {
      alert_from() {
         return this.$store.state.alert.alert_from; // String;
      },
      alert_show() {
         return this.$store.state.alert.alert_show; // Boolean;
      },
      alert_msg() {
         return this.$store.state.alert.alert_msg; // String;
      },
      alert_buttons() {
         return this.$store.state.alert.alert_buttons; // Array;
      },
      alert_html() {
         return this.$store.state.alert.alert_html;
      },
   },
   methods: {
      click_action(action) {
         if (action === 'reset_alert') {
            this.$store.commit('alert/RESET_ALERT');
         }
      }
   }
};
</script>

<style lang="scss">
.personal-alert {
   position: fixed;
   z-index: 100000;
   right: 20px;
   bottom: 20px;
   width: 200px;
   height: 200px;
}
</style>