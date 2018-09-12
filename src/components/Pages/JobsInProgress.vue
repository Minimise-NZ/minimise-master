<template>
  <b-container fluid>
    <!--JOBSITE CARD-->
    <b-card header-tag="header">
      <header slot="header">Jobs In Progress
        <b-btn
          variant="success"
          @click="newJob" 
          v-b-tooltip.hover title="Create New Job Site">
          <i class="fa fa-plus"></i>
        </b-btn> 
      </header>
      <div class="scroll-container">
        <b-row v-if="jobSites.length === 0">
          <b-col>
            <header class="subheader" style="color: #383838">You currently have no jobs in progress</header>
          </b-col>
        </b-row>
        <jobView v-for="(obj, index) in jobSites" :key="index" :job="obj.job" :index="index"></jobView>
      </div>
    </b-card>
  </b-container>  
</template>

<script>
import JobView from '@/components/Components/JobView.vue'
export default {
  components: {
    'jobView': JobView
  },
  data () {
    return {
    }
  },
  computed: {
    jobSites () {
      return this.$store.getters.jobsInProgress
    }
  },
  methods: {
    newJob () {
      this.$router.push('/dashboard/newJob')
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    padding-right: 20px;
  }

   .scroll-container {
    height: 80vh;
    overflow-y: scroll;
    padding-right:20px;
    margin-top: 10px;
  }

   .card-body {
    padding-top: 0;
    padding-bottom: 0;
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