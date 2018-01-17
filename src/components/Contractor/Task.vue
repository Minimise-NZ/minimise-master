<template>

  <b-card class="taskAnalysis">
    <b-row>
      <b-col>
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
          v-if="task.plantRequired"
          v-model="task.plant">
        </b-form-input>
      </b-col>
      <b-col position: relative>
        <b-row class="right-btns">
          <b-button
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
      <b-col cols="1">
        <header class="subheader">Step</header>
      </b-col>
      <b-col cols="3">
        <header class="subheader">Task Description</header>
      </b-col>
      <b-col cols="4"> 
        <header class="subheader">Potential Hazards</header>  
      </b-col>
      <b-col cols="4">
        <header class="subheader">Hazard Controls</header>
      </b-col>
    </b-row>
      
    <b-row v-for="(step, index) in task.steps" :key="index">
      <b-col cols="1">
        <ul>
          <li>
            {{index + 1}}
          </li>
        </ul>
      </b-col>
      <b-col cols="3">
        <ul>
          <li>
            {{step.description}}
          </li>
        </ul>
      </b-col>
      <b-col cols="4"> 
        
        <ul>
          <li>
            {{step.hazards}}
          </li>
        </ul>
      </b-col>
      <b-col cols="4">
        <ul>
          <li>
            {{step.controls}}
          </li>
        </ul>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: ['taskKey', 'task'],
  data () {
    return {
      originalTask: {}
    }
  },
  computed: {
  },
  methods: {
    save () {
      if (this._.isEqual(this.task, this.originalTask)) {
        console.log('Task has NOT been changed')
        return
      } else {
        // save new taskAnalysis
        let key = this.taskKey.toString()
        this.$store.dispatch('updateTaskAnalysis', {task: this.task, key})
      }
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

  ul {
    text-align: center;
    padding-left: 0;
    list-style: none;
  }
  
  .row {
    padding: 5px;
  }

</style>