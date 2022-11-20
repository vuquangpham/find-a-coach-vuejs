import getters from "@/store/modules/auth/getters";
import mutations from "@/store/modules/auth/mutations";
import actions from "@/store/modules/auth/actions";

export default {
    state: {
        userId: null,
        token: null,
        tokenExpiration: null,
        didLougout: false
    },
    getters,
    mutations,
    actions
};