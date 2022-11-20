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

        fetch(`${API_ENDPOINT}/${userId}.json`, {
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
    loadCoaches(context){
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
                        return;
                    }
                    const coaches = [];
                    for(const key of data){
                        const coach = {
                            id: key,
                            firstName: data[key].firstName,
                            lastName: data[key].lastName,
                            description: data[key].description,
                            hourlyRate: data[key].hourlyRate,
                            areas: data[key].areas
                        };
                        coaches.push(coach);
                    }

                    context.commit('setCoaches', coaches);
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};
