<template>
   <v-sheet width="100%" min-width="280px">
      <v-sheet class="d-flex flex-column pa-2" width="100%">
         <v-sheet class="flex-grow-1">
            <div class="text-center subtitle-1 font-weight-bold">AUDIO</div>
            <v-sheet class="d-flex flex-row ma-auto mb-2" width="50%" min-width="240px">
               <AudioControl :custom-game="true" />
            </v-sheet>

            <div v-if="room_info.capacity === 4" class="text-center subtitle-1 font-weight-bold mt-5">TEAM</div>
            <v-sheet
               v-if="room_info.capacity === 4"
               class="d-flex flex-column ma-auto text-center mb-2"
               height="100%"
               width="50%"
               min-width="240px"
            >
               <RoomInfoMaster v-if="im_master" />

               <v-sheet v-else class="d-flex flex-row align-center">
                  <v-sheet class="d-flex flex-column" width="50%">
                     <v-card class="title">TEAM 1</v-card>
                     <v-card class="subtitle">
                        {{
                           all_players.player_1
                              ? all_players.player_1.displayName
                              : "EMPTY"
                        }}
                     </v-card>
                     <v-card class="subtitle">
                        {{
                           all_players.player_2
                              ? all_players.player_2.displayName
                              : "EMPTY"
                        }}
                     </v-card>
                  </v-sheet>
                  <v-sheet class="d-flex flex-column" width="50%">
                     <v-card class="title">TEAM 2</v-card>
                     <v-card class="subtitle">
                        {{
                           all_players.player_3
                              ? all_players.player_3.displayName
                              : "EMPTY"
                        }}
                     </v-card>
                     <v-card class="subtitle">
                        {{
                           all_players.player_4
                              ? all_players.player_4.displayName
                              : "EMPTY"
                        }}
                     </v-card>
                  </v-sheet>
               </v-sheet>

               <div class="text-center subtitle-1 font-weight-bold mt-5">SETTING</div>
               <v-sheet outlined>
                  <v-simple-table>
                     <tbody>
                        <tr class="text-center">
                           <th>MODE</th>
                           <td>
                              {{ room_info.capacity === 4 ? "2vs2" : "1vs1" }}
                           </td>
                        </tr>
                        <tr class="text-center">
                           <th>THEME</th>
                           <td>{{ room_info.theme.charAt(0).toUpperCase() + room_info.theme.slice(1) }}</td>
                        </tr>
                        <tr class="text-center">
                           <th>PRIVATE</th>
                           <td>
                              {{
                                 room_info.room_type === "public" ? "No" : "Yes"
                              }}
                           </td>
                        </tr>
                     </tbody>
                  </v-simple-table>
               </v-sheet>
            </v-sheet>

            <div v-if="room_info.capacity === 2" class="text-center subtitle-1 font-weight-bold mt-5">PLAYERS</div>
            <v-sheet class="d-flex flex-row" width="100%" v-if="room_info.capacity === 2" outlined>
               <v-card width="50%" v-if="room_info.players.player_1" flat>
                  <v-btn class="text-truncate" width="100%">{{ room_info.players.player_1.displayName }}</v-btn>
               </v-card>
               <v-card v-if="room_info.players.player_2" width="50%" flat>
                  <v-dialog v-model="kick_player_model" persistent overlay-opacity="0.95" max-width="400px">
                     <template v-slot:activator="{ on, attrs }">
                        <v-btn
                           v-on="on"
                           v-bind="attrs"
                           width="100%"
                           class="text-truncate"
                           :disabled="room_info.start"
                        >
                           {{ room_info.players.player_2.displayName }}
                        </v-btn>
                     </template>
                     <v-sheet class="pa-1 ma-auto" color="classic" max-width="400px" style="box-shadow: none;">
                        <v-card color="transparent" class="text-center white--text title mb-3">Kick this player?</v-card>
                        <v-card width="100%" class="d-flex flex-row flex-wrap pa-0 ma-0" color="transparent">
                           <v-btn class="flex-grow-1" color="error" @click="kick_player_model = false;">Cancel</v-btn>
                           <v-btn width="50%" color="warning" @click="kick_player('player_2')">Kick</v-btn>
                        </v-card>
                     </v-sheet>
                  </v-dialog>
               </v-card>
               <v-card class="d-flex align-center justify-center caption" v-else width="50%" flat>
                  empty
               </v-card>
            </v-sheet>

         </v-sheet>
         <v-sheet width="100%" class="mt-3">
            <v-btn width="100%" color="error" @click="$emit('room-info-menu', false)">Close</v-btn>
         </v-sheet>
      </v-sheet>
   </v-sheet>
</template>

<script>
import AudioControl from "@/components/AudioControl.vue";
import RoomInfoMaster from "@/components/RoomInfoMaster.vue";

export default {
   name: "RoomInfoComp",
   data: () => ({ kick_player_model: false }),
   components: { AudioControl, RoomInfoMaster },
   computed: {
      room_info() {
         return this.$store.state.room.room_info;
      },
      all_players() {
         return this.$store.state.room.room_info.players;
      },
      im_master() {
         if (this.room_info.room_master && this.$store.state.general.my_display_name === this.room_info.room_master.displayName) {
            return true;
         } else {
            return false;
         }
      }
   },
   methods: {
      kick_player(playerNumber) {
         window.socket.emit('custom-kick', {
            playerNumber, // player_1, player_2, etc; 
            roomNumber: this.$store.state.room.room_info.room_number,
         });

         this.kick_player_model = false;
      }
   }

};
</script>

<style lang="scss">
</style>