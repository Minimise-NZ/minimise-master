<template>
  <div>
    <b-modal 
      v-model="success" 
      v-if="success"
      ok-only
      centered 
      header-bg-variant="success"
      headerTextVariant= 'light'
      title="Success">
      <div class="d-block text-center">
        <h4 class="mt-2">Task Analysis has been updated</h4>
      </div>
    </b-modal>
    <b-modal
      v-model="error" 
      v-if="error" 
      ok-only
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Oops..">
      <div class="d-block text-center">
        <h4>Something went wrong. Please try again</h4>
        <h5>{{errorMessage}}</h5>
      </div>
    </b-modal>
     <b-modal
      v-model="saveError" 
      v-if="saveError" 
      ok-only
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Please fill in all fields">
      <div class="d-block text-center">
        <h4 style="margin: 20px">Step Description is required</h4>
      </div>
    </b-modal>
    <b-modal
      v-model="showHazardModal"
      v-if="showHazardModal"
      @ok="updatestep"
      @cancel="clearHazard"
      header-bg-variant="success"
      headerTextVariant= 'light'
      title="Add Hazard">
      <b-form-select :options="hazardList" v-model="newHazard"></b-form-select>
    </b-modal>

    <div>
      <b-btn block @click="toggleShowTask" class="text-left togglebtn " v-b-tooltip.hover title="Click to show/hide details">
        {{task.title}}
        <i class="fa fa-chevron-down" style="float:right"></i>
      </b-btn>
      <b-card class="task" v-if="showTask === true">
        <div class="section">
          <b-row>
            <b-col sm="6" md="3" lg="2">
              <label>PPE Required</label>
            </b-col>
            <b-col>
              <b-form-textarea :readonly="readonly" v-model="task.ppe"></b-form-textarea>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6" md="3" lg="2">
              <label>Plant Required</label>
            </b-col>
            <b-col>
              <b-form-textarea :readonly="readonly" v-model="task.plant"></b-form-textarea>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6" md="3" lg="2">
              <label>Signage Required</label>
            </b-col>
            <b-col>
              <b-form-textarea :readonly="readonly" v-model="task.signage"></b-form-textarea>
            </b-col>
          </b-row>
        </div>
        <b-row class="btn-row sticky">
          <b-col sm="0" lg="2">
          </b-col>
          <b-col>
            <b-btn
            v-if="readonly === true"
            :disabled ="loading"
            @click="readonly = false"
            style="background-color:rgba(247, 88, 27, 0.92); border: 1px solid rgba(247, 88, 27, 0.92)"
            size="sm"
            class="step-btn">
            Edit/Update
          </b-btn>
          <b-btn
            v-if="readonly === false"
            :disabled ="loading"
            @click="cancel()"
            style="background-color:rgba(247, 88, 27, 0.92); border: 1px solid rgba(247, 88, 27, 0.92)"
            size="sm"
            class="step-btn">
            Discard Changes
          </b-btn>
          <b-btn
            v-if="readonly === false"
            :disabled ="loading"
            @click="save()"
            size="sm"
            style="background-color:rgb(22, 185, 117); border: 1px solid rgb(22, 185, 117)"
            class="step-btn">Save Changes
          </b-btn>
          <b-btn
            v-if="readonly === false"
            :disabled ="loading"
            @click="addStep()"
            size="sm"
            style="background-color:rgb(22, 95, 185); border: 1px solid rgb(22, 95, 185)"
            class="step-btn">
            Add New Step
          </b-btn>
          </b-col>
        </b-row>
        <div class="steps" v-for="(step, index) in task.steps" :key="index">
          <div class="step-header">
            <b-row>
              <b-col sm="2">
                <h5>Step {{index + 1}}: </h5>
              </b-col>
              <b-col>
                <b-form-input v-model="step.description" style="font-weight:bold" placeholder="Please enter description of step" :readonly="readonly"></b-form-input>
              </b-col>
              <b-col sm="1">
                <b-btn
                  class="mini-btn"
                  variant="dark"
                  size="sm"
                  v-if="loading === false && readonly === false"
                  @click="addHazard(index)" 
                  v-b-tooltip.hover title="Add Hazard">
                  <i class="fa fa-plus" style="color: rgb(1, 206, 187)"></i>
                </b-btn> 
              </b-col>
            </b-row>
          </div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th><label>Hazard</label></th>
                <th><label>Risks</label></th>
                <th><label>IRA</label></th>
                <th><label>Controls</label></th>
                <th><label>Control Level</label></th>
                <th><label>RRA</label></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(hazard, index) in step.hazards" :key="index" style="border-bottom: 1px solid #e9ecef">
                <td style="font-weight: bold">{{hazard.name}}</td>
                <td>
                  <ul v-for="(risk, index) in hazard.risks" :key="index">
                    <li>{{risk}}</li>
                  </ul>
                </td>
                <td>{{hazard.IRA}}</td>
                <td>
                    <ul v-for="(control, index) in hazard.controls" :key="index">
                    <li>{{control}}</li>
                  </ul>
                </td>
                <td>{{hazard.controlLevel}}</td>
                <td>{{hazard.RRA}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import autosize from 'autosize'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  props: ['taskAnalysis', 'index'],
  components: {
    PulseLoader
  },
  data () {
    return {
      success: false,
      loading: false,
      error: false,
      errorMessage: '',
      saveError: false,
      showTask: true,
      showHazardModal: false,
      newHazard: null,
      updateStep: null,
      task: {},
      readonly: true
    }
  },
  computed: {
    hazardList () {
      return this.$store.getters.hazardList
    },
    changed () {
      if (this._.isEqual(this.task, this.taskAnalysis)) {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    autosize(document.querySelectorAll('textarea'))
    this.task = this._.cloneDeep(this.taskAnalysis)
  },
  methods: {
    getHazard (id) {
      return this.$store.getters.hazard(id)
    },
    addHazard (index) {
      this.updateStep = index
      this.showHazardModal = true
    },
    updatestep () {
      console.log(this.newHazard)
      let hazard = this.$store.getters.hazard(this.newHazard)
      this.task.steps[this.updateStep].hazards.push(hazard)
      this.newHazard = null
    },
    clearHazard () {
    },
    toggleShowTask () {
      this.showTask = !this.showTask
    },
    save (hazard) {
      this.loading = true
      if (this.changed === true) {
        console.log('task changed')
        try {
          this.$store.dispatch('updateTaskAnalysis', {task: this.task})
          autosize(document.querySelectorAll('textarea'))
          this.success = true
          this.readonly = true
          this.loading = false
        } catch (err) {
          this.error = true
          this.errorMessage = err.message
          this.loading = false
          console.log(err)
        }
      } else {
        this.readonly = true
        this.loading = false
        console.log('no changes')
      }
    },
    cancel () {
      console.log('cancelling')
      this.task = this._.cloneDeep(this.taskAnalysis)
      autosize(document.querySelectorAll('textarea'))
      this.readonly = true
    },
    addStep () {
      this.task.steps.push({
        description: '', hazards: []
      })
      setTimeout(() => {
        autosize(document.querySelectorAll('textarea'))
      }, 1000)
    }
  }
}
</script>

<style scoped>

  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  .togglebtn {
    background-color: rgba(16, 73, 119, 0.91);
    color: white;
    border-radius: 0;
  }

  .card {
    margin-bottom: 20px;
  }

  .row {
    margin-bottom:5px;
  }

  label {
    padding-top: 5px;
  }

  .step-header {
    background-color: #0d7679;
    margin-top: 10px;
    color: white;
    padding-top: 4px;
    padding-right: 5px;
    padding-bottom: 1px;
  }

  h5 {
    padding-top: 10px;
    padding-left: 10px;
    font-size: 1.1em;
  }

  thead {
    background-color: rgba(28, 117, 108, 0.22);
  }

  th {
    padding-top: 5px;
    padding-bottom:5px;
  }

  td {
    padding-bottom: 5px;
  }

  .btn-row {
    margin-top: 10px;
  }

  .step-btn {
    margin-right: 5px;
  }

  .btn {
    float: right;
  }

  .mini-btn {
    margin-right: 10px;
    margin-top: 3px;
  }

  ul {
    padding: 0;
    margin-bottom: 7px;
  }

  li {
    list-style: none;
  }

  :disabled {
    cursor: not-allowed;
  }
</style>