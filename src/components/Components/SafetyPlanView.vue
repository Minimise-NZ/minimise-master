<template>
  <b-container fluid class="outside-container">
    <b-card>
      <div class="safetyplan card-header">{{headerText}}<span class="expiry">Expires: {{plan.expiryDate}}</span></div>
        <div class="scroll-container">
          <!--HAZARD CARD-->
          <b-card>
            <div class="section card-header">Hazard Register <span style="font-size: 0.9em"> (click hazard name to hide/show details)</span></div>
            <div role="tablist">
              <b-card
                v-for="(hazard, index) in hazards"
                :key="index"
                role="tab"
                class="hazardCard">
                <header class="card-header hazard">
                  <b-btn block v-b-toggle="'collapse' + index" class="text-left togglebtn">{{hazard.name}}</b-btn>
                </header>
                <b-collapse :id="'collapse' + index">
                <b-row style="margin-top: 15px">
                  <b-col>
                    <b-img
                      :src='hazard.imageURL'
                      class="ml-3 mb-2"
                      fluid>
                    </b-img>
                  </b-col>
                  <b-col>
                    <h5 class="mb-3"><strong>Risks</strong></h5>
                    <p v-for="(risk, index) in hazard.risks" :key="index">{{risk}}</p>
                  </b-col>
                  <b-col>
                    <h5 class="mb-3"><strong>Controls</strong></h5>
                    <div v-for="(control, index) in hazard.controls" :key="index">
                      <p><i :class="status(control.status)" class="mr-2"></i>{{control.desc}}</p>
                      <p v-if="control.status === 'Uncontrolled'">{{control.corrective}}</p>
                    </div>
                  </b-col>
                  <b-col>
                    <br>
                    <p><strong>Risk before controls: </strong>{{hazard.IRA}}</p>
                    <p><strong>Risk after controls: </strong>{{hazard.RRA}}</p>
                    <p v-if="hazard.taskAnalysis === true" class="alert-text"><strong>Task Analysis Required</strong></p>
                    <p v-if="hazard.worksafe === true" class="alert-text"><strong>Worksafe Notification Required</strong></p>
                  </b-col>
                </b-row>
                </b-collapse>
              </b-card>
            </div>
          </b-card>

          <!--TASK ANALYSIS CARD-->
          <b-card v-if="!_.isEmpty(plan.taskAnalysis)">
            <div class="section card-header">Task Analysis <span style="font-size: 0.9em"> (click task title to hide/show details)</span></div>
            <b-card class="taskAnalysis">
              <header class="card-header hazard">
                <b-btn block v-b-toggle.collapseTask class="text-left togglebtn">{{task.title}}</b-btn>
              </header>
              <b-collapse id="collapseTask">
                <b-row class="pl-2" style="margin-top: 15px">
                  <b-col class="ml-0 pl-0">
                    <b-form-checkbox
                      id="notification"
                      value="task.worksafe"
                       onclick="return false"
                      class="mb-4">
                      Worksafe notification required
                    </b-form-checkbox><br>
                    <b-form-checkbox
                      id="signage"
                      value="task.signage"
                       onclick="return false"
                      class="mb-4">
                      Signage required
                    </b-form-checkbox><br>
                    <b-form-checkbox
                      value="task.ppeRequired"
                       onclick="return false"
                      class="mb-4">
                      PPE required
                    </b-form-checkbox><br>
                    <b-form-input
                      style="max-width: 500px"
                      name="ppe"
                      class="mb-4"
                      readonly
                      v-if="task.ppeRequired"
                      value="task.ppe">
                    </b-form-input>
                    <b-form-checkbox
                      value="task.plantRequired"
                      onclick="return false"
                      class="mb-4">
                      Plant required
                    </b-form-checkbox><br>
                    <b-form-input
                      name="plant"
                      style="max-width: 500px"
                      readonly
                      class="mb-4"
                      v-if="task.plantRequired"
                      :value="task.plant">
                    </b-form-input>
                  </b-col>
                </b-row>
                <b-row class="mt-2 mb-2">
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
                <div v-for="(step, index) in task.steps" :key="index" class="steps">
                  <b-row class="inner-row">
                    <b-col cols="1">
                      <h4 class="index">{{index + 1}}</h4>
                    </b-col>
                    <b-col>
                      <b-form-textarea 
                        class="form-control step" 
                        rows="2" 
                        v-model="step.description" 
                        readonly>
                      </b-form-textarea>
                    </b-col>
                    <b-col>
                      <b-form-textarea 
                        class="form-control step" 
                        rows="2" 
                        v-model="step.hazards" 
                        readonly>
                      </b-form-textarea>
                    </b-col>
                    <b-col>
                      <b-row style="margin: 0">
                        <b-form-textarea 
                          class="form-control step"
                          rows="2" 
                          v-model="step.controls" 
                          readonly>
                        </b-form-textarea>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>
              </b-collapse>
            </b-card>
          </b-card>

          <!--TRAINING CARD-->
          <b-card>
            <div class="section card-header">Training Register<span style="font-size: 0.9em"> (click worker name to hide/show details)</span></div>
            <b-card v-for="(worker, index) in workers" :key="worker.id">
              <header class="card-header hazard">
                <b-btn block v-b-toggle="'worker' + index" class="text-left togglebtn">{{worker.name}}</b-btn>
              </header>
              <b-collapse :id="'worker' + index">
                <b-row class="mb-2" style="margin-top: 15px">
                  <b-col md="5" >
                    <header>Training Description</header>
                  </b-col>
                  <b-col md="3" >
                    <header>ID/Licence No/Certificate</header>
                  </b-col>
                  <b-col md="3" >
                    <header>Expiry Date</header>
                  </b-col>
                  <b-col md="1" >
                  </b-col>
                </b-row>
                <b-row v-for="training in worker.training" :key="training.description" class="mb-1">
                  <b-col md="5" > 
                    <b-form-input readonly :value="training.description"/>
                  </b-col>
                  <b-col md="3" >
                    <b-form-input id="id" type="text" :value="training.ID" readony/>
                  </b-col>
                  <b-col md="3" >
                    <b-form-input id="expiry" type="date" class="no-spinners" :value="training.expiry" readonly/>
                  </b-col>
                  <b-col md="1" >
                  </b-col>
                </b-row>
              </b-collapse>
            </b-card>
          </b-card>
        </div>
    </b-card>
  </b-container>
</template>

<script>
import autosize from 'autosize'
import WorkerView from '@/components/Components/Worker.vue'
export default {
  props: ['id'],
  components: {
    'workerview': WorkerView
  },
  data () {
    return {
      plan: {}
    }
  },
  beforeMount () {
    this.plan = this.$store.getters.plan(this.id)
  },
  mounted () {
    autosize(document.querySelectorAll('textarea'))
  },
  computed: {
    workers () {
      return this.$store.getters.workers
    },
    headerText () {
      let text = 'Safety Plan: ' + this.plan.jobAddress
      return text
    },
    hazards () {
      return this.plan.hazardRegister
    },
    task () {
      return this.plan.taskAnalysis
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
    font-size: 1.2em;
    color: white;
  }

  .card-header.section {
    margin: -20px -20px 20px -20px;
    background-color: rgba(29,92,158,.89);
    font-size: 1em;
    color: white;
  }

  .card-header.hazard {
    margin: -20px -20px 0px -20px;
    padding: 0;
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

  .togglebtn {
    background-color: #8e8e8e;
  }

  .togglebtn:hover {
    background-color: #8f4c9aa8;
  }

  header {
    padding-left: 5px;
  }

  .inner-row{
    margin-bottom: 15px;
  }

  .index {
    padding-top: 20px;
    text-align: center;
    color: rgba(155, 35, 53, 0.88);
    font-weight: bold;
  }

</style>