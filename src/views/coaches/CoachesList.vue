<template>
  <div>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <CoachFilter @change-filter="setFilters"/>
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)">Refresh</BaseButton>
          <BaseButton link to="/auth" v-if="!isLoggedIn">Login</BaseButton>
          <BaseButton v-if="isLoggedIn && !isCoach && !isLoading" link to="/register">Register as Coach</BaseButton>
        </div>
        <div v-if="isLoading">
          <BaseSpinner/>
        </div>
        <ul v-else-if="hasCoaches">
          <CoachItem
              v-for="coach in filteredCoaches"
              :key="coach.id"
              :id="coach.id"
              :firstName="coach.firstName"
              :lastName="coach.lastName"
              :areas="coach.areas"
              :rate="coach.hourlyRate"
          />
        </ul>
        <h3 v-else>No coaches found.</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import CoachFilter from "@/components/coaches/CoachFilter";
import BaseSpinner from "@/components/ui/BaseSpinner";
import BaseDialog from "@/components/ui/BaseDialog";

export default {
  components: {
    BaseDialog,
    BaseSpinner,
    CoachFilter,
    CoachItem,
    BaseCard,
    BaseButton,
  },
  data(){
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
      isLoading: false,
      error: ''
    };
  },
  computed: {
    filteredCoaches(){
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter(coach => {
        if(this.activeFilters.frontend && coach.areas.includes('frontend')) return true;
        if(this.activeFilters.backend && coach.areas.includes('backend')) return true;
        if(this.activeFilters.career && coach.areas.includes('career')) return true;
        return false;
      });
    },
    hasCoaches(){
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
    isCoach(){
      return this.$store.getters['coaches/isCoach'];
    },
    isLoggedIn(){
      return this.$store.getters['isAuthenticated'];
    }
  },
  methods: {
    setFilters(updatedFilters){
      this.activeFilters = updatedFilters;
    },
    loadCoaches(forced = false){
      this.isLoading = true;
      this.$store.dispatch('coaches/loadCoaches', {forceRefresh: forced})
          .catch(err => {
            this.error = err.message;
          })
          .finally(() => {
            this.isLoading = false;
          });
    },
    handleError(){
      this.error = false;
    }
  },
  created(){
    this.loadCoaches();
  }
};
</script>

<style scoped>
ul {
  list-style:none;
  margin:0;
  padding:0;
}

.controls {
  display:flex;
  justify-content:space-between;
}
</style>
