<template>
  <b-container fluid class="outside-container">
    <b-card>
      <div class="safetyplan card-header">{{headerText}}<span class="expiry">Expires: {{safetyPlan.expiryDate}}</span></div>
        <div class="scroll-container">
          <b-card>
            <div class="section card-header">Hazard Register <span style="font-size: 0.9rem"> (click hazard name to hide/show details)</span></div>
            <div role="tablist">
              <b-card
                v-for="(hazard, index) in hazards"
                :key="index"
                role="tab"
                class="hazardCard mt-2 mb-4">
                <header class="card-header hazard">
                  <b-btn block v-b-toggle="'collapse' + index" class="text-left togglebtn">{{hazard.name}}</b-btn>
                </header>
                <b-collapse :id="'collapse' + index" visible>
                <b-row>
                  <b-col>
                    <b-img
                      :src='hazard.image'
                      class="ml-3 mb-2"
                      fluid>
                    </b-img>
                  </b-col>
                  <b-col>
                    <h5 class="mb-3"><strong>Risks</strong></h5>
                    <p v-for="(risk, index) in hazard.risks" :key="index">{{risk}}</p>
                  </b-col>
                  <b-col cols="6">
                    <h5 class="mb-3"><strong>Controls</strong></h5>
                    <div v-for="(control, index) in hazard.controls" :key="index">
                      <p><i :class="status(control.status)" class="mr-2"></i>{{control.desc}}</p>
                      <p v-if="control.status === 'Uncontrolled'">{{control.corrective}}</p>
                    </div>
                  </b-col>
                </b-row>
                </b-collapse>
              </b-card>
            </div>
          </b-card>
          <b-card v-if="!_.isEmpty(safetyPlan.taskAnalysis)">
            <div class="section card-header">Task Analysis <span style="font-size: 0.9rem"> (click task title to hide/show details)</span></div>
            <b-card class="taskAnalysis">
              <header class="card-header hazard">
                <b-btn block v-b-toggle.collapseTask class="text-left togglebtn">{{task.title}}</b-btn>
              </header>
              <b-collapse id="collapseTask" visible>
                <b-row class="pl-2">
                  <b-col class="ml-0 pl-0">
                    <b-form-checkbox
                      id="notification"
                      value="task.worksafe"
                      disabled
                      class="mb-4">
                      Worksafe notification required
                    </b-form-checkbox><br>
                    <b-form-checkbox
                      id="signage"
                      value="task.signage"
                      disabled
                      class="mb-4">
                      Signage required
                    </b-form-checkbox><br>
                    <b-form-checkbox
                      value="task.ppeRequired"
                      disabled
                      class="mb-4">
                      PPE required
                    </b-form-checkbox><br>
                    <b-form-input
                      name="ppe"
                      class="mb-4"
                      readonly
                      v-if="task.ppeRequired"
                      value="task.ppe">
                    </b-form-input>
                    <b-form-checkbox
                      value="task.plantRequired"
                      disabled
                      class="mb-4">
                      Plant required
                    </b-form-checkbox><br>
                    <b-form-input
                      name="plant"
                      readonly
                      class="mb-4"
                      v-if="task.plantRequired"
                      value="task.plant">
                    </b-form-input>
                  </b-col>
                </b-row>
                <b-row class="mt-5">
                  <b-col lg="1" md="2">
                    <header class="task-subheader">Step</header>
                  </b-col>
                  <b-col>
                    <header class="task-subheader">Task Description</header>
                  </b-col>
                  <b-col> 
                    <header class="task-subheader">Potential Hazards</header>  
                  </b-col>
                  <b-col>
                    <header class="task-subheader">Hazard Controls</header>
                  </b-col>
                </b-row>
                
              <b-row v-for="(step, index) in task.steps" :key="index">
                <b-col cols="1">
                  <h4>{{index + 1}}</h4>
                </b-col>
                <b-col>
                  <textarea class="form-control step" rows="3" value="step.description" readonly></textarea>
                </b-col> 
                <b-col>
                  <textarea class="form-control step" rows="3" value="step.hazards" readonly></textarea>
                </b-col>
                <b-col>
                  <textarea class="form-control step" rows="3" value="step.controls" readonly></textarea>
                </b-col>
              </b-row>
            </b-collapse>
          </b-card>

          </b-card>
          <b-card>
            <div class="section card-header">Training Register</div>
            <b-row class="inner-row mb-2">
              <b-col md="5" class="training-col">
                <header class="card-header subheader bg-secondary text-white">Description</header>
              </b-col>
               <b-col md="3" class="training-col">
                <header class="card-header subheader bg-secondary text-white">Training ID</header>
              </b-col>
              <b-col md="4" class="training-col">
                <header class="card-header subheader bg-secondary text-white">Expiry Date</header>
              </b-col>
            </b-row>
            <b-row class="inner-row mb-2" v-for="(training, index) in safetyPlan.trainingRegister" :key="index">
              <b-col md="5" class="training-col"> 
                <b-form-input readonly :value="training.description"/>
              </b-col>
              <b-col md="3" class="training-col">
                <b-form-input id="id" readonly type="text" v-model="training.ID"/>
              </b-col>
              <b-col md="4" class="training-col">
                <b-form-input id="expiry" type="date" class="no-spinners" :value="training.expiry | formatDate" v-model="training.expiry" readonly/>
              </b-col>
            </b-row>
          </b-card>
        </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  props: ['jobid', 'planid'],
  data () {
    return {
      job: null,
      safetyPlan: null
    }
  },
  created () {
    console.log('jobid', this.jobid, 'planid', this.planid)
    let job = this.$store.getters.jobSite(this.jobid)
    if (job === undefined) {
      this.$router.go(-1)
    } else {
      this.job = job
      this.safetyPlan = this.job.safetyPlans[this.planid]
    }
  },
  computed: {
    headerText () {
      let text = this.safetyPlan.workerName + ' Safety Plan : ' + this.job.address
      return text
    },
    hazards () {
      return this.safetyPlan.hazardRegister
    },
    task () {
      return this.safetyPlan.taskAnalysis
    }
  },
  methods: {
    status (status) {
      if (status === 'Controlled') {
        return 'fa fa-check'
      } else if (status === 'Uncontrolled') {
        return 'fa fa-times'
      } else {
        return 'fa fa-minus'
      }
    }
  }
}
</script>

<style scoped>
  .card-header.safetyplan {
    margin: -20px -20px 20px -20px;
    background-color: #027588;
    font-size: 1.4rem;
    color: white;
  }

  .card-header.section {
    margin: -20px -20px 20px -20px;
    background-color: rgba(111, 50, 130, 0.86);
    font-size: 1.2rem;
    color: white;
  }

  .card-header.hazard {
    margin: -20px -20px 20px -20px;
    padding: 0;
  }
  
  .card-header.subheader{
    padding: 6px 20px;
  }

  .expiry {
    float: right
  }

  .task-subheader {
    padding-bottom: 10px;
    text-align: center;
    font-weight: bold;
    color: black;
    border-bottom: 2px solid rgba(155, 35, 53, 0.88);
  }

  h4 {
    padding-top: 20px;
    text-align: center;
    color: rgba(155, 35, 53, 0.88);
    font-weight: bold;
  }

  .togglebtn:hover {
    background-color: rgba(155, 35, 53, 0.88);
  }

</style>