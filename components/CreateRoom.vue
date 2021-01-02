<template>
   <v-sheet>
      <v-card>
         <v-card-title>Create Room</v-card-title>
      </v-card>
      <v-sheet class="d-flex flex-row justify-center" style="overflow:hidden;">
         <v-hover v-slot="{ hover }">
            <v-card :class="{ 'on-hover': hover }" width="25%" style="cursor:pointer;" :elevation="hover ? 24 : 0" :style="hover ? 'opacity:1' : 'opacity:0.9'" @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')" @click="selected_type = 'classic'">
               <v-responsive :aspect-ratio="1/1">
                  <v-img :src="require('@/assets/img/type/classic.png')"></v-img>
               </v-responsive>
            </v-card>
         </v-hover>
         <v-hover v-slot="{ hover }">
            <v-card :class="{ 'on-hover': hover }" width="25%" style="cursor:pointer;" :elevation="hover ? 24 : 0" :style="hover ? 'opacity:1' : 'opacity:0.9'" @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')" @click="selected_type = 'lovely'">
               <v-responsive :aspect-ratio="1/1">
                  <v-img :src="require('@/assets/img/type/lovely.png')"></v-img>
               </v-responsive>
            </v-card>
         </v-hover>
         <v-hover v-slot="{ hover }">
            <v-card :class="{ 'on-hover': hover }" width="25%" style="cursor:pointer;" :elevation="hover ? 24 : 0" :style="hover ? 'opacity:1' : 'opacity:0.9'" @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')" @click="selected_type = 'plain'">
               <v-responsive :aspect-ratio="1/1">
                  <v-img :src="require('@/assets/img/type/plain.png')"></v-img>
               </v-responsive>
            </v-card>
         </v-hover>
         <v-hover v-slot="{ hover }">
            <v-card :class="{ 'on-hover': hover }" width="25%" style="cursor:pointer;" :elevation="hover ? 24 : 0" :style="hover ? 'opacity:1' : 'opacity:0.9'" @mouseenter="$store.commit('audio/PLAY_SOUND', 'bubble_pop')" @click="selected_type = 'colorless'">
               <v-responsive :aspect-ratio="1/1">
                  <v-img :src="require('@/assets/img/type/colorless.png')"></v-img>
               </v-responsive>
            </v-card>
         </v-hover>
      </v-sheet>
      <v-sheet class="mt-6">
         <v-row class="ma-0">
            <v-col cols="12" class="pa-0 ma-0 text-center">
               <v-card>{{ selected_type.toUpperCase() }}</v-card>
            </v-col>
            <v-col cols="12" class="pa-0 ma-0 d-flex flex-row">
               <v-col cols="3" class="pa-0 ma-0">
                  <v-btn class="text-lowercase" width="100%" tile text outlined>1vs1</v-btn>
               </v-col>
               <v-col cols="3" class="pa-0 ma-0">
                  <v-btn class="text-lowercase" width="100%" tile text outlined>2vs2</v-btn>
               </v-col>
               <v-col cols="3" class="pa-0 ma-0">
                  <v-btn class="text-lowercase" width="100%" tile text outlined>3vs3</v-btn>
               </v-col>
               <v-col cols="3" class="pa-0 ma-0 ">
                  <v-btn class="text-lowercase" width="100%" tile text outlined>1vs1vs1</v-btn>
               </v-col>
            </v-col>
            <v-col cols="12" class="pa-0 ma-0">
               <v-text-field 
                  v-model="room_title" 
                  dense 
                  hide-details 
                  flat 
                  single-line 
                  filled 
                  outlined 
                  autocomplete="off"
                  style="border-radius:0;"
                  placeholder="Room Title"
               >
               </v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0 ma-0 flex-row d-flex">
               <v-col cols="6" class="pa-0 ma-0">
                  <v-btn class="ma-0 pa-0" width="100%" tile text outlined @click="room_type = 'public'">public</v-btn>
               </v-col>
               <v-col cols="6" class="pa-0 ma-0">
                  <v-btn class="ma-0 pa-0" width="100%" tile text outlined @click="room_type = 'private'">private</v-btn>
               </v-col>
            </v-col>
            <v-col cols="12" class="ma-0 pa-0" v-if="room_type === 'private'">
               <v-text-field 
                  v-model="secret_key" 
                  dense 
                  hide-details 
                  flat 
                  single-line 
                  filled 
                  outlined 
                  autocomplete="off"
                  style="border-radius:0;"
                  placeholder="Room Key"
                  :type="show_key ? 'text' : 'password'"
                  :append-icon="show_key ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show_key = !show_key"
                  @keydown.space="($event) => $event.preventDefault()"
               >
               </v-text-field>
            </v-col>
            <v-col cols="12" class="flex-row d-flex justify-space-around mt-5">
               <v-col cols="4" class="pa-0 ma-0">
                  <v-btn @click="$emit('close-create-room-dialog')" class="ma-0 pa-0" width="100%" color="error">cancel</v-btn>
               </v-col>
               <v-col cols="4" class="pa-0 ma-0">
                  <v-btn class="ma-0 pa-0" width="100%" color="success" @click="comming_soon()">create</v-btn>
               </v-col>
            </v-col>
         </v-row>
      </v-sheet>
   </v-sheet>
</template>

<script>
export default {
   name: "CreateRoom",
   data: () => ({
      room_title: "Let's play!",
      secret_key: null,
      room_type: "public",
      show_key: false,
      selected_type: ""
   }),
   methods: {
      comming_soon() {
         alert('Under Development');
      }
   },
};
</script>

<style>
</style>