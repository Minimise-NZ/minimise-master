<template>
  <b-container fluid class="outside-container">
    <b-card>
      <div class="card-header">User Management
       <b-button class="addBtn" @click="newWorker">Add New Worker</b-button>
      </div>
      <div class="scroll-container">
        <div v-for="worker in workers" :key="worker.id">
          <workerview :worker="worker.worker"></workerview>
        </div>
       </div>
    </b-card>
  </b-container>
</template>

<script>
import WorkerView from '@/components/Shared/Worker.vue'
export default {
  components: {
    'workerview': WorkerView
  },
  data () {
    return {
    }
  },
  computed: {
    workers () {
      return this.$store.getters.workers
    }
  },
  methods: {
    newWorker () {
      // modal pop up
    }
  }
}
</script>

<style scoped>
  .card-header {
    margin: -20px -20px 20px -20px;
    background-color: rgba(29, 92, 158, 0.89);
    font-size: 1.4rem;
    color: white;
  }
  
  .addBtn {
    float: right;
    background-color: #ffc80b;
    color: black;
    cursor: pointer;
  }
  
</style>