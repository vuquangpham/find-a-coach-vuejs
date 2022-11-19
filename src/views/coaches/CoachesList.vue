<template>
  <section>
    <CoachFilter @change-filter="setFilters"/>
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline">Refresh</BaseButton>
        <BaseButton v-if="!userId" link to="/register">Register as Coach</BaseButton>
      </div>
      <ul v-if="hasCoaches">
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
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import CoachFilter from "@/components/coaches/CoachFilter";

export default {
  components: {
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
      }
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
      return this.$store.getters["coaches/hasCoaches"];
    },
    userId(){
      console.log(this.$store, this.$store.getters['userId']);
      return this.$store.getters['userId'];
    }
  },
  methods: {
    setFilters(updatedFilters){
      this.activeFilters = updatedFilters;
    }
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
