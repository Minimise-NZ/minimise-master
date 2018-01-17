<template>
  <b-container fluid>
    <b-card>
     <div class="card-header">Task Analysis
     </div>
     <div class="scroll-container">

        <b-row>
          <b-col>
            <b-button
              class="itemBtn mb-2" 
              v-for="(item,index) in taskAnalysis" 
              :key="index"
              :class="{active: selectedIndex === index}"
              @click="changeTask(index)">
                {{item.title}}
            </b-button>
            <b-button class="itemBtn mb-2" variant="primary" @click="newTA" v-b-tooltip.hover title="Add New Task Analysis"><i class="fa fa-plus"></i></b-button> 
          </b-col>
        </b-row>

        <taskView :task="task" :taskKey="selectedIndex"></taskView>

      </div>
    </b-card>
  </b-container>
</template>

<script>
import Task from '@/components/Contractor/Task.vue'
export default {
  components: {
    'taskView': Task
  },
  data () {
    return {
      selectedIndex: 0
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
    newTA () {
    },
    changeTask (index) {
      // check there is nothing to be saved
      this.selectedIndex = index
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    padding-right: 30px;
  }
  
  .card-header {
    margin: -20px -20px 20px -20px;
    background-color: rgba(155, 35, 53, 0.88);
    font-size: 1.4rem;
    color: white;
  }

  .itemBtn {
    font-size: 1rem;
    margin-right: 15px;
    cursor: pointer;
    font-size: 1.2rem;
  }
  
  .active {
    background-color: #12807a;
  }
  

  .row {
    padding: 5px;
  }

</style>