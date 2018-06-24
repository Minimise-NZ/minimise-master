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
        <h4>Please enter a title for your <br> new task analysis</h4>
        <br>
        <b-form-input type="text" v-model="title" required/>
      </div>
    </b-modal>
    <b-card>
     <div class="card-header">Task Analysis/SWMS
       <b-button  
          variant="primary"
          class="addBtn"
          @click="newPopUp = true" 
          v-b-tooltip.hover title="Add New Task Analysis">
          <i class="fa fa-plus"></i>
        </b-button> 
     </div>
     <div class="scroll-container">
        <b-row v-for="(task, index) in taskAnalysis" :key="index">
          <taskView :taskAnalysis="task" :index="index"></taskView>
        </b-row>      
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
  .container-fluid {
    padding-top: 20px;
  }
  
  .row{
    margin: 0;
    padding: 0;
  }

  .card-header {
    margin: -20px -20px 20px -20px;
    background-color: rgba(155, 35, 53, 0.88);
    font-size: 1.4rem;
    color: white;
  }

</style>