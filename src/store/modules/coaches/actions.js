import {API_ENDPOINT} from "@/utils/config";

export default {
    registerCoach(context, data){
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            hourlyRate: data.rate,
            areas: data.areas,
        };

        fetch(`${API_ENDPOINT}/coaches/${userId}.json`, {
            method: 'POST',
            body: JSON.stringify(coachData)
        })
            .then(res => {
                if(!res.ok){
                    //error
                }
            });

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    loadCoaches(context, payload){
        if(!payload.forceRefresh && !context.getters.shouldUpdate){
            return;
        }

        return new Promise((resolve, reject) => {
            fetch(`${API_ENDPOINT}/coaches.json`)
                .then(res => {
                    if(!res.ok){
                        throw new Error('Can not fetch data from Firebase!');
                    }
                    return res.json();
                })
                .then(data => {
                    if(!data){
                        context.commit('setCoaches', []);
                        resolve();
                        return;
                    }
                    const coaches = [];
                    console.log(data);
                    for(const id in data){
                        for(const key in data[id]){
                            const coach = {
                                id,
                                firstName: data[id][key].firstName,
                                lastName: data[id][key].lastName,
                                description: data[id][key].description,
                                hourlyRate: data[id][key].hourlyRate,
                                areas: data[id][key].areas
                            };
                            coaches.push(coach);
                        }
                    }

                    context.commit('setCoaches', coaches);
                    context.commit('setFetchTimesstamp');
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};
