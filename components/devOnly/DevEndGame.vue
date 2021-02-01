<template>
   <v-btn 
      dense
      absolute
      style="z-index:100000; top:0; left:0;"
      @click="end_game_dev()"
      :disabled="(room_info.capacity === room_info.joined && room_info.start) ? false : true"
   >
      END
   </v-btn>
</template>

<script>
export default {
   name: "DevEndGame",
   computed: {
      room_info() {
         return this.$store.state.room.room_info;
      }
   },
   methods: {
      end_game_dev() {
         window.socket.emit('dev-end-game', {
            roomInfo: this.room_info
         });
      }
   }
};
</script>

<style>
</style>