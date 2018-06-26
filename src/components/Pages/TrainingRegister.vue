<template>
  <b-container fluid class="outside-container">
    <b-card>
      <div class="card-header">Training Register
      </div>
      <div class="scroll-container">
        <div v-for="worker in workers" :key="worker.id">
          <workerview :id="worker.id" :workers="worker"></workerview>
        </div>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import WorkerView from '@/components/Components/Worker.vue'
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
  }
}
</script>

<style scoped>
  .card-header {
    margin: -20px -20px 0px -20px;
  }

</style>