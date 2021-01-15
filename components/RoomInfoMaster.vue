<template>
   <v-sheet class="d-flex flex-row align-center">
      <v-sheet class="d-flex flex-column" width="50%">
         <v-card class="title">TEAM 1</v-card>
<!--Player 1 -->
         <v-btn class="subtitle">{{ all_players.player_1.displayName }}</v-btn>
         <!-- <v-menu>
            <template v-slot:activator="{ on, attrs }">
               <v-btn class="subtitle" v-bind="attrs" v-on="on" :disabled="!all_players.player_1">
                  {{
                     all_players.player_1
                        ? all_players.player_1.displayName
                        : "Position #1"
                  }}
               </v-btn>
            </template>
            <v-sheet class="d-flex flex-column">
               <v-card>MOVE TO</v-card>
               <v-btn @click="move_position({current: 'player_1', to: 'player_2' })">Position 2</v-btn>
               <v-btn @click="move_position({current: 'player_1', to: 'player_3'})">Position 3</v-btn>
               <v-btn @click="move_position({current: 'player_1', to: 'player_4'})">Position 4</v-btn>
            </v-sheet>
         </v-menu> -->
<!--Player 2 -->
         <v-menu>
            <template v-slot:activator="{ on, attrs }">
               <v-btn class="subtitle" v-bind="attrs" v-on="on" :disabled="!all_players.player_2">
                  {{
                     all_players.player_2
                        ? all_players.player_2.displayName
                        : "Position #2"
                  }}
               </v-btn>
            </template>
            <v-sheet class="d-flex flex-column">
               <v-card>MOVE TO</v-card>
               <v-btn @click="move_position({current: 'player_2', to: 'player_3'})">Position 3</v-btn>
               <v-btn @click="move_position({current: 'player_2', to: 'player_4'})">Position 4</v-btn>
               <v-btn @click="kick_player('player_2')" color="error">Kick</v-btn>
            </v-sheet>
         </v-menu>

      </v-sheet>
      <v-sheet class="d-flex flex-column" width="50%">
         <v-card class="title">TEAM 2</v-card>

<!--Player 3 -->
         <v-menu>
            <template v-slot:activator="{ on, attrs }">
               <v-btn class="subtitle" v-bind="attrs" v-on="on" :disabled="!all_players.player_3">
                  {{
                     all_players.player_3
                        ? all_players.player_3.displayName
                        : "Position #3"
                  }}
               </v-btn>
            </template>
            <v-sheet class="d-flex flex-column">
               <v-card>MOVE TO</v-card>
               <v-btn @click="move_position({current: 'player_3', to: 'player_2' })">Position 2</v-btn>
               <v-btn @click="move_position({current: 'player_3', to: 'player_4'})">Position 4</v-btn>
               <v-btn @click="kick_player('player_3')" color="error">Kick</v-btn>
            </v-sheet>
         </v-menu>
<!--Player 4 -->
         <v-menu>
            <template v-slot:activator="{ on, attrs }">
               <v-btn class="subtitle" v-bind="attrs" v-on="on" :disabled="!all_players.player_4">
                  {{
                     all_players.player_4
                        ? all_players.player_4.displayName
                        : "Position #4"
                  }}
               </v-btn>
            </template>
            <v-sheet class="d-flex flex-column">
               <v-card>MOVE TO</v-card>
               <v-btn @click="move_position({current: 'player_4', to: 'player_2' })">Position 2</v-btn>
               <v-btn @click="move_position({current: 'player_4', to: 'player_3'})">Position 3</v-btn>
               <v-btn @click="kick_player('player_4')" color="error">Kick</v-btn>
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
   methods: {
      move_position(obj) {
         this.$store.commit('general/GLOBAL_LOADING', true);
         window.socket.emit('change-position', { 
            roomNumber: this.$store.state.room.room_info.room_number,
            changeInfo: obj,
         });
      },
      kick_player(playerNumber) {
         alert('Under development');
      }
   }
};
</script>

