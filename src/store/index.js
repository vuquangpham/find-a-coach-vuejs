import {createStore} from "vuex";

import coachesModule from "./modules/coaches";
import requestsModule from "./modules/requests";
import authModule from "@/store/modules/auth";

export default createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule,
        auth: authModule
    },
});
