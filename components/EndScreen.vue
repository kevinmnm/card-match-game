<template>
   <v-sheet
      v-if="room_capacity === 2 && end_game_message.toLowerCase() !== 'draw'"
      class="d-flex flex-row flex-grow-1"
   >
      <v-sheet width="50%" color="classic" outlined>
         <v-card
            class="align-center justify-center font-weight-bold text-center"
            color="transparent orange--text"
            style="font-family: 'Potta One', cursive;"
            tile
            flat
            >Winner</v-card
         >
         <v-card width="100%" tile flat color="transparent">
            <v-img
               :src="require(`@/assets/img/main/victory.png`)"
               :aspect-ratio="1 / 1"
               width="50%"
               max-width="300px"
               class="ma-auto mt-1 mb-1"
            ></v-img>
         </v-card>
         <v-card width="100%" class="text-center font-weight-bold" flat tile color="transparent">{{ winner_info.displayName }}</v-card>
      </v-sheet>
      <v-sheet width="50%" color="yellow" outlined>
         <v-card
            class="align-center justify-center font-weight-bold text-center"
            color="transparent"
            style="font-family: 'Potta One', cursive;"
            tile
            flat
            >Loser</v-card
         >
         <v-card width="100%" tile flat color="transparent">
            <v-img
               :src="require(`@/assets/img/main/defeat.png`)"
               :aspect-ratio="1 / 1"
               width="50%"
               max-width="300px"
               class="ma-auto mt-1 mb-1"
            ></v-img>
         </v-card>
         <v-card width="100%" class="text-center font-weight-bold" flat tile color="transparent">{{ loser_info.displayName }}</v-card>
      </v-sheet>
   </v-sheet>
</template>

<script>
export default {
   name: "EndScreen",
   computed: {
      room_capacity() {
         return this.$store.state.room.room_info.capacity;
      },
      end_game_message() {
         return this.$store.state.general.end_game_message;
      },
      end_game_img() {
         return this.end_game_message.toLowerCase();
      },
      winner_info() {
         if (this.room_capacity === 2) {  
            return this.$store.state.general.winner_1vs1 || null;
         }
      },
      loser_info() {
         if (this.room_capacity === 2) {
            console.log(this.$store.state.general.loser_1vs1);
            return this.$store.state.general.loser_1vs1 || null;
         }
      }
   },
};
</script>

<style>
</style>