import {createStore} from "vuex";

import coachesModule from "./modules/coaches";
import requestsModule from "./modules/requests";

export default createStore({
    state: {
        userId: 'c4'
    },
    getters: {
        userId(state){
            return state.userId;
        }
    },
    modules: {
        coaches: coachesModule,
        requests: requestsModule
    },
});
