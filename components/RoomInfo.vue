<template>
   <v-sheet width="100%">
      <v-sheet class="d-flex flex-column" width="100%">
         <v-sheet class="flex-grow-1">
            <v-sheet class="d-flex flex-row mb-2" width="100%">
               <AudioControl :custom-game="true" />
            </v-sheet>
            <v-sheet
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

               <v-sheet>
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
         </v-sheet>
         <v-sheet width="100%">
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
   components: { AudioControl, RoomInfoMaster },
   computed: {
      room_info() {
         return this.$store.state.room.room_info;
      },
      all_players() {
         return this.$store.state.room.room_info.players;
      },
      im_master() {
         console.log((this.$store.state.general.my_display_name === this.room_info.room_master.displayName));
         if (this.$store.state.general.my_display_name === this.room_info.room_master.displayName) {
            return true;
         } else {
            return false;
         }
      }
   },
};
</script>

<style lang="scss">
</style>