<template>
  <b-container fluid>
     <b-modal 
      v-model="newPopUp" 
      v-if="newPopUp"
      @cancel="title = ''"
      @ok="createNew"
      centered 
      header-bg-variant="info"
      headerTextVariant= 'light'
      title="Create new task analysis">
      <div class="d-block text-center mt-4">
        <h4>Please enter a title for your <br> new Task Analysis</h4>
        <br>
        <b-form-input type="text" v-model="title" required/>
      </div>
    </b-modal>
    <b-card header-tag="header" >
      <header slot="header">Task Analysis/SWMS
        <b-btn
          variant="dark"
          class="addBtn"
          @click="newPopUp = true" 
          v-b-tooltip.hover title="Add New Task Analysis">
          <i class="fa fa-plus" style="color: rgb(1, 206, 187)"></i>
        </b-btn> 
      </header>
      <div class="scroll-container">
        <b-row v-if="taskAnalysis.length === 0" >
          <b-col class="p-0">
            <header class="subheader">Click the add + button to start your first Task Analysis</header>
          </b-col>
        </b-row>
        <taskView v-for="(task, index) in taskAnalysis" :key="index" :taskAnalysis="task" :index="index"></taskView>    
      </div>
    </b-card>
  </b-container>
</template>

<script>
import taskView from '@/components/Components/Task.vue'
export default {
  components: {
    'taskView': taskView
  },
  data () {
    return {
      newPopUp: false,
      title: '',
      changed: false
    }
  },
  computed: {
    taskAnalysis () {
      return this.$store.getters.taskAnalysis
    }
  },
  methods: {
    createNew () {
      console.log(this.title)
      this.$store.dispatch('newTaskAnalysis', this.title)
      .then(() => {
        this.title = ''
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
body {
  font-size: 0.9em;
  line-height: 1.0;
}

.form-control {
  font-size: 1em;
}
   .container-fluid {
    padding-top: 20px;
    padding-right: 20px;
  }

   .scroll-container {
    height: 80vh;
    overflow-y: scroll;
    margin-top: 15px;
    padding-right: 15px;
    padding-bottom: 20px;
  }

  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    font-size: 1.2em;
    color: white;
    line-height: 2em;
  }

  .card-body {
    padding-top: 0;
    padding-bottom: 0;
  }

  .btn {
    float: right;
  }

  .subheader {
    margin-left: 15px;
    font-weight: bold;
    font-size: 1.2em;
    color: #186ca7;
  }
</style>