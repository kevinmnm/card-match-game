<template>
   <v-card height="min-content" flat tag="span" color="transparent">
      <v-icon color="success" v-if="(room_master) && player.displayName !== room_master.displayName && player.ready">mdi-check-bold</v-icon>
      <v-icon color="#d9d930" v-if="(room_master) && player.displayName === room_master.displayName">mdi-crown</v-icon>
   </v-card>
</template>

<script>
export default {
   name: "DisplayNameIcon",
   props: ["playerProp"],
   computed: {
      player() {
         return this.playerProp;
      },
      room_master() {
         return this.$store.state.room.room_info.room_master;
      }
   }
};
</script>

<style>
</style>