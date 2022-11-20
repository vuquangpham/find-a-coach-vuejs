import {API_KEY} from "@/utils/config";

let timer;
export default {
    async auth(context, payload){
        const mode = payload.mode;
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        if(mode === 'logout'){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();
        if(!response.ok){
            throw new Error(responseData.error.message);
        }

        const expirationDate = new Date().getTime() + Number.parseInt(responseData.expiresIn * 1000);

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(() => {
            context.dispatch('autoLogout');
        }, expirationDate);

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
        });
    },
    async login(context, payload){
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    async signup(context, payload){
        return context.dispatch('auth', {
            ...payload,
            mode: 'logout'
        });
    },
    tryLogin(context){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if(expiresIn < 0){
            return;
        }
        timer = setTimeout(function(){
            context.dispatch('autoLogout');
        }, expiresIn);

        if(token && userId){
            context.commit('setUser', {
                token,
                userId,
            });
        }
    },
    logout(context){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
        });
    },
    autoLogout(context){
        context.dispatch('logout');
        context.commit('didLogout');
    }
};