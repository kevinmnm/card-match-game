<template>
   <v-sheet class="d-flex flex-row align-center">
      <v-sheet class="d-flex flex-column" width="50%">
         <v-card class="title">TEAM 1</v-card>
<!-- PLAYER 1 -->
         <v-menu>
            <template v-slot:activator="{ on, attrs }">
               <v-btn class="subtitle" v-bind="attrs" v-on="on">
                  {{
                     all_players.player_2
                        ? all_players.player_1.displayName
                        : "EMPTY"
                  }}
               </v-btn>
            </template>
            <v-sheet class="d-flex flex-column">
               <v-card>MOVE TO</v-card>
               <v-btn>Player 2</v-btn>
               <v-btn>Player 3</v-btn>
               <v-btn>Player 4</v-btn>
            </v-sheet>
         </v-menu>
<!-- PLAYER 2 -->
         <v-menu>
            <template v-slot:activator="{ on, attrs }">
               <v-btn class="subtitle" v-bind="attrs" v-on="on">
                  {{
                     all_players.player_2
                        ? all_players.player_2.displayName
                        : "EMPTY"
                  }}
               </v-btn>
            </template>
            <v-sheet class="d-flex flex-column">
               <v-card>MOVE TO</v-card>
               <v-btn>Player 3</v-btn>
               <v-btn>Player 4</v-btn>
            </v-sheet>
         </v-menu>

      </v-sheet>
      <v-sheet class="d-flex flex-column" width="50%">
         <v-card class="title">TEAM 2</v-card>

<!-- PLAYER 3 -->
         <v-menu>
            <template v-slot:activator="{ on, attrs }">
               <v-btn class="subtitle" v-bind="attrs" v-on="on">
                  {{
                     all_players.player_3
                        ? all_players.player_3.displayName
                        : "EMPTY"
                  }}
               </v-btn>
            </template>
            <v-sheet class="d-flex flex-column">
               <v-card>MOVE TO</v-card>
               <v-btn>Player 2</v-btn>
               <v-btn>Player 4</v-btn>
            </v-sheet>
         </v-menu>
<!-- PLAYER 4 -->
         <v-menu>
            <template v-slot:activator="{ on, attrs }">
               <v-btn class="subtitle" v-bind="attrs" v-on="on">
                  {{
                     all_players.player_4
                        ? all_players.player_4.displayName
                        : "EMPTY"
                  }}
               </v-btn>
            </template>
            <v-sheet class="d-flex flex-column">
               <v-card>MOVE TO</v-card>
               <v-btn>Player 2</v-btn>
               <v-btn>Player 3</v-btn>
            </v-sheet>
         </v-menu>
      </v-sheet>
   </v-sheet>
</template>

<script>
export default {
   name: "RoomInfoMaster",
   computed: {
      all_players() {
         return this.$store.state.room.room_info.players;
      }
   },
};
</script>

<style>
</style>