export default {
    setUser(state, payload){
        state.token = payload.token;
        state.userId = payload.userId;
        state.didLougout = false;
    },
    setDidLogout(state){
        state.didLougout = true;
    }
};