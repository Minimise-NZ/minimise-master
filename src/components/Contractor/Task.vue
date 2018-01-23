<template>
  <b-container fluid>
    <b-card class="taskAnalysis">
      <b-row>
        <b-col class="ml-0 pl-0">
          <b-form-checkbox
            id="notification"
            v-model="task.worksafe"
            value=true
            class="mb-4">
            Worksafe notification required
          </b-form-checkbox><br>
          <b-form-checkbox
            id="signage"
            v-model="task.signage"
            value=true
            class="mb-4">
            Signage required
          </b-form-checkbox><br>
          <b-form-checkbox
            v-model="task.ppeRequired"
            value=true
            class="mb-4">
            PPE required
          </b-form-checkbox><br>
          <b-form-input
            class="mb-4"
            style = "border: 1px solid rgba(0, 123, 255, 0.37)"
            v-if="task.ppeRequired"
            v-model="task.ppe">
          </b-form-input>
          <b-form-checkbox
            v-model="task.plantRequired"
            value=true
            class="mb-4">
            Plant required
          </b-form-checkbox><br>
          <b-form-input
            class="mb-4"
            style = "border: 1px solid rgba(0, 123, 255, 0.37)"
            v-if="task.plantRequired"
            v-model="task.plant">
          </b-form-input>
        </b-col>
        <b-col position: relative>
          <b-row class="right-btns">
            <b-button
              @click="addStep"
              class="editBtn mb-2"
              variant="primary">
              Add Step
            </b-button>
            <b-button
              @click="save"
              class="editBtn mb-2 ml-2"
              style="background-color: #12807a">
              Save updates
            </b-button>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col lg="1" md="2">
          <header class="subheader">Step</header>
        </b-col>
        <b-col>
          <header class="subheader">Task Description</header>
        </b-col>
        <b-col> 
          <header class="subheader">Potential Hazards</header>  
        </b-col>
        <b-col>
          <header class="subheader">Hazard Controls</header>
        </b-col>
      </b-row>
        
      <b-row v-for="(step, index) in task.steps" :key="index">
        <b-col cols="1">
          <h4>{{index + 1}}</h4>
        </b-col>
        <b-col>
          <textarea class="form-control step" rows="3" v-model="step.description" placeholder="Please enter description of step"></textarea>
        </b-col>
        <b-col>
          <textarea class="form-control step" rows="3" v-model="step.hazards" placeholder="Please enter hazards"></textarea>
        </b-col>
        <b-col>
          <textarea class="form-control step" rows="3" v-model="step.controls" placeholder="Please enter controls"></textarea>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
export default {
  props: ['task'],
  data () {
    return {
      originalTask: {}
    }
  },
  computed: {
    stepCount () {
      return this.task.steps.length
    }
  },
  methods: {
    save () {
      if (this._.isEqual(this.task, this.originalTask)) {
        console.log('Task has NOT been changed')
        return
      } else {
        // save new taskAnalysis
        this.$store.dispatch('updateTaskAnalysis', {task: this.task})
      }
    },
    addStep () {
      this.task.steps.push({
        description: '',
        hazards: '',
        controls: ''
      })
    }
  },
  beforeMount () {
    this.originalTask = Object.assign({}, this.task)
  }
}
</script>

<style scoped>

  .right-btns {
    margin-right: 15px;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .editBtn {
    width: 120px;
    color: white;
  }

  .taskAnalysis {
    border: none;
  }
  
  .subheader {
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

  .form-control {
    color: black;
  }

  .form-control.step {
    text-align: center;
    border: 1px solid #7979792e;
  }
  
  .row {
    padding: 5px;
  }

  [class*="col-"] {
    padding: 2px;
  }

</style>