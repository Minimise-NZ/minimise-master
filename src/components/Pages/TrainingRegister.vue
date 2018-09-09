<template>
  <b-container fluid class="outside-container">
    <b-card header-tag="header">
      <header slot="header">Training Register</header>
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
  .container-fluid {
    padding-top: 20px;
    padding-right: 20px;
  }

  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    font-size: 1.2em;
    color: white;
    line-height: 2em;
  }

  .btn {
    float: right;
  }

</style>