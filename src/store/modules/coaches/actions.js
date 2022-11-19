export default {
    registerCoach(context, data){
        const coachData = {
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            hourlyRate: data.rate,
            areas: data.areas,
            id: new Date().toISOString()
        };
        context.commit('registerCoach', coachData);
        context.dispatch('setUserId', coachData.id);
    }
};
