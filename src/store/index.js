import { createStore } from "vuex";

import coachesModule from "./modules/coaches";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    coaches: coachesModule,
  },
});
