<template>
    <b-card class="taskAnalysis mt-2">
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
      <b-form @submit.prevent="save">
        <b-btn block v-b-toggle="'collapse' + this.index" 
          class="text-left togglebtn card-header task"
          v-b-tooltip.hover title="Click to show/hide task details">
            {{task.title}}
            <i style="float:right" class="fa fa-chevron-down"></i>
        </b-btn>
        <b-collapse :id="'collapse' + this.index" accordion="my-accordion" visible>
          <b-row class="outer-row">
            <b-col class="ml-0 pl-0">
              <b-form-checkbox
                id="notification"
                v-model="task.worksafe"
                v-if="!readonly"
                value=true
                class="mb-4 mt-2">
                Worksafe notification required
              </b-form-checkbox>
              <b-form-checkbox
                id="notification"
                v-model="task.worksafe"
                onclick="return false"
                v-if="readonly"
                value=true
                class="mb-4 mt-2">
                Worksafe notification required
              </b-form-checkbox>
              <br>

              <b-form-checkbox
                id="signage"
                v-if="!readonly"
                v-model="task.signage"
                value=true
                class="mb-4">
                Signage required
              </b-form-checkbox>
               <b-form-checkbox
                id="signage"
                v-if="readonly"
                onclick="return false"
                v-model="task.signage"
                value=true
                class="mb-4">
                Signage required
              </b-form-checkbox>
              <br>

              <b-form-checkbox
                v-model="task.ppeRequired"
                v-if="!readonly"
                value=true
                class="mb-4">
                PPE required
              </b-form-checkbox>
              <b-form-checkbox
                v-if="readonly"
                onclick="return false"
                v-model="task.ppeRequired"
                value=true
                class="mb-4">
                PPE required
              </b-form-checkbox>
              <br>
              <b-form-input
                name="ppe"
                class="mb-4"
                :readonly = "readonly"
                v-validate="'required'" 
                v-if="task.ppeRequired"
                placeholder="Please enter required PPE"
                :class="{'alert-border': errors.has('ppe')}"
                v-model="task.ppe">
              </b-form-input>

              <b-form-checkbox
                v-if="!readonly"
                v-model="task.plantRequired"
                value=true
                class="mb-4">
                Plant required
              </b-form-checkbox>
              <b-form-checkbox
                v-if="readonly"
                onclick="return false"
                v-model="task.plantRequired"
                value=true
                class="mb-4">
                Plant required
              </b-form-checkbox>
              <br>
              <b-form-input
                name="plant"
                class="mb-4"
                :readonly = "readonly"
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
                  v-if="readonly"
                  @click="readonly = false"
                  class="editBtn mb-2"
                  style="background-color: rgb(255, 106, 0)">
                  Edit
                </b-button>
                <b-button
                  v-if="!readonly && !loading"
                  @click="cancel()"
                  class="editBtn mb-2 ml-2"
                  style="background-color: rgba(155,35,53,.88); width: 150px">
                  Discard Changes
                </b-button>
                <b-button
                  v-if="!readonly && !loading"
                  @click="save"
                  class="editBtn mb-2 ml-2"
                  variant="primary">
                  Save changes
                </b-button>
                <div class="loader" v-if="loading">
                  <pulse-loader :loading="loading"></pulse-loader>
                </div>
              </b-row>
            </b-col>
          </b-row>

          <b-row class="mt-5 steps">
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
                  placeholder="Please enter description of step"
                  :readonly="readonly">
                </b-form-textarea>
              </b-col>
              <b-col>
                <b-form-textarea 
                  class="form-control step" 
                  rows="2" 
                  v-model="step.hazards" 
                  placeholder="Please enter hazards"
                  :readonly="readonly">
                </b-form-textarea>
              </b-col>
              <b-col>
                <b-row>
                  <b-form-textarea 
                    class="form-control step" 
                    rows="2" 
                    v-model="step.controls" 
                    placeholder="Please enter hazard controls"
                    :readonly="readonly">
                  </b-form-textarea>
                </b-row>
              </b-col>
            </b-row>
          </div>
          <b-button
            v-if="!readonly"
            :disabled = "loading"
            @click="addStep()"
            class="editBtn mb-2 mr-3"
            style="background-color: rgba(40,26,101,.8); float: right">
            Add Step
          </b-button>
        </b-collapse>
      </b-form>
    </b-card>
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
      task: {},
      readonly: true
    }
  },
  computed: {
    stepCount () {
      return this.task.steps.length
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
    save () {
      this.loading = true
      if (this.changed === true) {
        try {
          this.$store.dispatch('updateTaskAnalysis', {task: this.task})
          autosize(document.querySelectorAll('textarea'))
          this.success = true
          this.readonly = true
          this.loading = false
        } catch (err) {
          this.error = true
          this.errorMessage = err.message
          console.log(err)
        }
      } else {
        this.readonly = true
        this.loading = false
        console.log('good to go')
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
        description: '',
        hazards: '',
        controls: ''
      })
      setTimeout(() => {
        autosize(document.querySelectorAll('textarea'))
      }, 1000)
    }
  }
}
</script>

<style scoped>

  .row{
    margin: 0;
    padding: 0;
  }

  [class*="col-"] {
    margin: 0;
    padding: 0;
  }

  .taskAnalysis {
    width: 100%;
    padding-bottom: 15px;
    margin-bottom: 40px;
  }

  .card-header.task{
    background-color: #1c73a7;
    margin: 0;
    color: white;
    font-size: 1.2em;
    padding-left: 15px;
  }

  .card-body {
    padding: 0;
  }

  .outer-row {
    margin-top: 15px;
    padding: 0px 15px;
  }

  .inner-row{
    margin-bottom: 15px;
  }

  .right-btns {
    margin-right: 15px;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .editBtn {
    width: 130px;
    color: white;
  }
  
  .subheader {
    padding-bottom: 10px;
    text-align: center;
    font-weight: bold;
    color: black;
    border-bottom: 2px solid rgba(155, 35, 53, 0.88);
  }

  .index {
    padding-top: 20px;
    text-align: center;
    color: rgba(155, 35, 53, 0.88);
    font-weight: bold;
  }

  .steps {
    padding: 0 15px 15px 15px;
  }

  .form-control {
    color: black;
  }

  .form-control.step {
    text-align: center;
    border: 1px solid #7979792e;
  }
</style>