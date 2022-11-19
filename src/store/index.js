import {createStore} from "vuex";

import coachesModule from "./modules/coaches";

export default createStore({
    state: {
        userId: ''
    },
    getters: {
        userId(state){
            if(!state.userId) return false;
            return state.userId;
        }
    },
    mutations: {
        setUserId(state, payload){
            console.log(payload);
            state.userId = payload;
        }
    },
    actions: {
        setUserId(context, payload){
            context.commit('setUserId', payload);
        }
    },
    modules: {
        coaches: coachesModule,
    },
});
