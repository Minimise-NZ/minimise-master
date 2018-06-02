<template>
  <b-container fluid class="pt-0">
    <b-modal 
      v-model="showModal" 
      v-if="showModal"
      ok-only
      centered 
      header-bg-variant="success"
      headerTextVariant= 'light'
      title="Success">
      <div class="d-block text-center">
        <h4 class="mt-2" style="color: black">This task analysis has been updated</h4>
      </div>
    </b-modal>
    <b-card class="taskAnalysis">
      <b-form @submit.prevent="save">
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
              name="ppe"
              class="mb-4"
              v-validate="'required'" 
              v-if="task.ppeRequired"
              placeholder="Please enter required PPE"
              :class="{'alert-border': errors.has('ppe')}"
              v-model="task.ppe">
            </b-form-input>
            <b-form-checkbox
              v-model="task.plantRequired"
              value=true
              class="mb-4">
              Plant required
            </b-form-checkbox><br>
            <b-form-input
              name="plant"
              class="mb-4"
              placeholder="Please enter required plant"
              v-validate="'required'"
              v-if="task.plantRequired"
              :class="{'alert-border': errors.has('plant')}"
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
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  props: ['task'],
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    stepCount () {
      return this.task.steps.length
    }
  },
  methods: {
    save () {
      // validate all fields are complete
      this.$validator.validateAll().then(async(valid) => {
        if (!valid) { return }
        try {
          // check that steps are not empty
          for (let i in this.task.steps) {
            console.log(this.task.steps[i])
            if (this.task.steps[i].description === '' && this.task.steps[i].hazards === '' && this.task.steps[i].controls === '') {
              this.task.steps.splice(i, 1)
              console.log('steps spliced')
            }
          }
          this.$store.dispatch('updateTaskAnalysis', {task: this.task})
          .then(() => {
            this.showModal = true
          })
        } catch (err) {
          console.log(err)
        }
      })
    },
    addStep () {
      this.task.steps.push({
        description: '',
        hazards: '',
        controls: ''
      })
    }
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