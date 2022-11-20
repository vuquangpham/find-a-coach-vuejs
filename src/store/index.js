import {createStore} from "vuex";

import coachesModule from "./modules/coaches";
import requestsModule from "./modules/requests";

export default createStore({
    state: {
        userId: 'c3'
    },
    getters: {
        userId(state){
            if(!state.userId) return false;
            return state.userId;
        }
    },

    modules: {
        coaches: coachesModule,
        requests: requestsModule
    },
});
