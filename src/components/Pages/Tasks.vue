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
    <b-card header-tag="header">
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
    padding-right: 20px;
  }

  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    font-size: 1.2em;
    color: white;
    line-height: 2em;
  }

  .btn {
    float: right;
  }
</style>