<template>
  <b-container fluid class="outside-container">
    <b-card>
      <!--<div class="safetyplan card-header">{{headerText}}</div>-->
        <b-row class="card-header" >
          <b-col>
          <header>{{headerText}}</header>
          </b-col>
          <b-col>
          <b-button  
            class="addBtn"
            style="background-color: white"
            @click="createPdf" 
            v-b-tooltip.hover title="Export to PDF">
            <i class="fa fa-file-pdf fa-lg" style="color: black"></i>
          </b-button> 
          </b-col>
        </b-row>
        <div class="scroll-container">
          <!--OVERVIEW CARD-->
          <b-card class="section">
            <div class="section card-header">Site Safety Information</div>
          </b-card>
          <!--HAZARD CARD-->
          <b-card class="section">
            <div class="section card-header">Hazard Register</div>
          </b-card>
          <!--HAZARDOUS SUBSTANCES CARD-->
          <b-card class="section">
            <div class="section card-header">Hazardous Substances</div>
          </b-card>
           <!--TASK ANALYSIS CARD-->
          <b-card class="section">
            <div class="section card-header">Task Analysis </div>
          </b-card>
          <!--TRAINING REGISTER CARD-->
          <b-card class="section">
            <div class="section card-header">Training Register</div>
          </b-card>
          <!--INDUCTION CARD-->
          <b-card class="section">
            <div class="section card-header">Induction Register</div>
          </b-card>
          <!--SIGN IN CARD-->
          <b-card class="section">
            <div class="section card-header">Sign In Register </div>
          </b-card>
        </div>
    </b-card>
  </b-container>
</template>

<script>
import autosize from 'autosize'

export default {
  props: ['jobKey'],
  data () {
    return {
      jobSite: '',
      jobId: ''
    }
  },
  beforeMount (jobKey) {
    let jobSite = this.$store.getters.jobSite(jobKey)
    this.jobSite = jobSite.job
    this.jobId = jobSite.jobId
  },
  mounted () {
    autosize(document.querySelectorAll('textarea'))
  },
  computed: {
    workers () {
      return this.$store.getters.workers
    },
    headerText () {
      let text = 'Safety Plan: ' + this.jobSite.address
      return text
    },
    hazards () {
      return this.$store.getters.myHazards
    }
  },
  methods: {
    createPdf () {
    }
  }
}
</script>

<style scoped>

  .card-header {
    margin: -20px -20px 10px -20px;
    padding: 10px;
  }

  header {
    line-height: 2em;
  }

  .section {
    margin-bottom: 10px;
  }

  .card-header.section {
    margin: -20px -20px 20px -20px;
    background-color: rgba(29,92,158,.89);
    font-size: 1em;
    color: white;
  }

</style>