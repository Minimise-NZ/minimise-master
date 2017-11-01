<template>
  <b-container fluid>
    <b-card>
     <div class="card-header">Task Analysis
       <b-button class="addBtn" @click="newTA">Add New Task Analysis</b-button>
     </div>
      <b-button
       class="itemBtn" 
       v-for="(item,index) in taskAnalysis" 
       key="index"
       :class="{active: selectedIndex === index}"
       @click="selectedIndex = index">
        {{item.title}}
      </b-button>
      <b-card class="taskAnalysis">
        <b-form-checkbox
          id="notification"
          v-model="task.notification"
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
          id="PPE"
          v-model="task.PPErequired"
          value=true
          class="mb-4">
          PPE required
        </b-form-checkbox><br>
        <b-form-input
          class="mb-4"        
          v-if="task.PPErequired"
          v-model="task.PPE">
        </b-form-input>
        <b-form-checkbox
          id="plant"
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
        
        <b-row v-for="step in task.steps" key="step">
          <b-col cols="1">
            <ul>
              <li>
                {{step.count}}
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
              <li v-for="hazard in step.potentialHazards">
                {{hazard}}
              </li>
            </ul>
          </b-col>
          <b-col cols="4">
            <ul>
              <li v-for="control in step.hazardControls">
                {{control}}
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-card>
      <b-button 
        class="editBtn pt-1 pb-1 mr-2"
        style="background-color: #12807a">Add Step</b-button>
      <b-button 
        class="editBtn pt-1 pb-1"
        style="background-color: rgba(155, 35, 53, 0.88)">Edit/Update</b-button>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      selectedIndex: 0,
      taskAnalysis: [
        {
          title: 'Working at heights > 5m',
          notification: true,
          signage: false,
          PPErequired: true,
          PPE: [
            'Safety boots', ' Hard Hat', ' Safety Harness'
          ],
          plantRequired: true,
          plant: [
            'Scaffold'
          ],
          steps: [
            {
              count: '1',
              description: 'Here is a description of step one',
              potentialHazards: ['Slips,trips,falls', 'Hit by falling stuff'],
              hazardControls: ['Control 1', 'Control 2', 'Control 3']
            },
            {
              count: '2',
              description: 'Here is a description of step one',
              potentialHazards: ['Slips,trips,falls', 'Hit by falling stuff'],
              hazardControls: ['Here is a list of controls for each hazard']
            },
            {
              count: '3',
              description: 'Here is a description of step one',
              potentialHazards: ['Slips,trips,falls', 'Hit by falling stuff'],
              hazardControls: ['Here is a list of controls for each hazard']
            }
          ]
        },
        {
          title: 'Excavation > 1.5m',
          notification: true,
          signage: true,
          PPErequired: true,
          PPE: [
            'Safety boots', 'Hard Hat'
          ],
          plantRequired: false,
          plant: [],
          steps: [
            {
              count: '',
              description: '',
              potentialHazards: [],
              hazardControls: []
            }
          ]
        },
        {
          title: 'Confined Spaces'
        }
      ]
    }
  },
  computed: {
    task () {
      return this.taskAnalysis[this.selectedIndex]
    }
  },
  methods: {
    newTA () {
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;;
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
  
  .taskAnalysis {
    margin-top: 25px;
    border: none;
  }
  
  .taskAnalysis > .card-body {
    padding: 15px;
  }
  
  .subheader {
    padding-bottom: 10px;
    text-align: center;
    font-weight: bold;
    color: black;
    border-bottom: 2px solid rgba(155, 35, 53, 0.88);
  }
  
  .addBtn {
    float: right;
    background-color: #ffc80b;
    color: black;
    cursor: pointer;
  }
  
  .editBtn {
    margin-top: 30px;
    color: white;
    height: 40px;
    cursor: pointer;
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