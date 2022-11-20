<template>
  <div>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <BaseCard>
        <header>
          <h2>Requests Received</h2>
        </header>
        <BaseSpinner v-if="isLoading"></BaseSpinner>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
              v-for="req in receivedRequests"
              :key="req.id"
              :email="req.userEmail"
              :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
import BaseDialog from "@/components/ui/BaseDialog";
import BaseSpinner from "@/components/ui/BaseSpinner";
import BaseCard from "@/components/ui/BaseCard";

export default {
  components: {
    BaseCard,
    BaseSpinner,
    BaseDialog,
    RequestItem,
  },
  data(){
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequests(){
      return this.$store.getters['requests/requests'];
    },
    hasRequests(){
      return this.$store.getters['requests/hasRequests'];
    },
  },
  created(){
    this.loadRequests();
  },
  methods: {
    async loadRequests(){
      this.isLoading = true;
      try{
        await this.$store.dispatch('requests/fetchRequests');
      }catch(error){
        this.error = error.message || 'Something failed!';
      }
      this.isLoading = false;
    },
    handleError(){
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align:center;
}

ul {
  list-style:none;
  margin:2rem auto;
  padding:0;
  max-width:30rem;
}

h3 {
  text-align:center;
}
</style>