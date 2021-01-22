export const state = () => ({
   friend_list_all: null,
});

export const mutations = {
   FRIEND_LIST_ALL(state, payload) {
      state.friend_list_all = payload;
   }
}