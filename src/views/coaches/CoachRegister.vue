<template>
  <section>
    <BaseCard>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData"/>
    </BaseCard>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm';
import BaseCard from "@/components/ui/BaseCard";

export default {
  components: {BaseCard, CoachForm},
  methods: {
    saveData(data){
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    }
  }
};
</script>

<style></style>
