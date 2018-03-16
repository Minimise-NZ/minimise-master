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
     <div class="card-header">Task Analysis
     </div>
     <div class="scroll-container">

        <b-row>
          <b-col>
            <b-button
              class="taskBtn mb-2"
              :class="{activeTaskBtn: selectedIndex === id}"
              v-for="(item, id) in taskAnalysis" 
              :key="id"
              @click="changeTask(id)">
                {{item.title}}
            </b-button>
            <b-button class="mb-2" variant="primary" @click="newPopUp = true" v-b-tooltip.hover title="Add New Task Analysis"><i class="fa fa-plus"></i></b-button> 
          </b-col>
        </b-row>

        <b-row>
          <router-view :task="task"></router-view>
        </b-row>
       
      </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      selectedIndex: 0,
      newPopUp: false,
      title: ''
    }
  },
  computed: {
    taskAnalysis () {
      return this.$store.getters.taskAnalysis
    },
    task () {
      return this.taskAnalysis[this.selectedIndex]
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
    },
    changeTask (index) {
      // check there is nothing to be saved
      this.errors.clear()
      this.selectedIndex = index
      this.$router.push('/contractor/taskAnalysis/task/' + this.selectedIndex)
    }
  },
  beforeMount () {
    this.$router.push('/contractor/taskAnalysis/task/' + this.selectedIndex)
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    padding-right: 30px;
  }
  
  .row {
    padding: 5px;
  }

  .card-header {
    margin: -20px -20px 20px -20px;
    background-color: rgba(155, 35, 53, 0.88);
    font-size: 1.4rem;
    color: white;
  }

  .taskBtn {
    border-radius: 5px;
    color: white;
    margin-right: 15px;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 5px 10px;
    background-color: grey;
    border: none;
  }
  
  .activeTaskBtn {
    background-color: #12807a;
  }

</style>