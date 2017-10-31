<template>
  <b-container fluid>
    <b-card>
      <div class="card-header" :class="{ inverted: inverted }" >{{headerTitle}}
        <b-button v-if="register" class="headerBtn" @click="register = !register, inverted = !inverted">{{headerButton}}</b-button>
        <b-button v-else class="headerBtn" @click="register = !register, inverted = !inverted">{{headerButton}}</b-button>
      </div>
      <b-card
       v-for="hazard in hazards"
       :key="hazard.name"
       class="hazardCard mt-2 mb-4">
        <header class="card-header hazard" :class="{ inverted: inverted }">{{hazard.name}}
          <b-button v-if="register" class="editBtn pt-1 pb-1">Remove Hazard</b-button>
          <b-button v-if="register" class="editBtn pt-1 pb-1">Edit Hazard</b-button>
          <b-button v-if="!register" class="editBtn pt-1 pb-1">Add Hazard</b-button>
        </header>
        <b-row>
          <b-col>
            <b-img
              :src='hazard.image'
              fluid>
            </b-img>
          </b-col>
          <b-col>
            <p><strong>Controls</strong></p>
            <p v-for="control in hazard.controls">{{control}}</p>
          </b-col>
          <b-col>
           <br>
            <p>Risk before controls: {{hazard.riskBeforeControls}}</p>
            <p>Method of control: {{hazard.controlMethod}}</p>
            <p>Risk after controls: {{hazard.riskAfterControls}}</p>
          </b-col>
        </b-row>
      </b-card>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      register: true,
      inverted: false,
      myHazards: [
        {
          name: 'Slips, Trips, Falls',
          image: '../../../../static/slips.png',
          riskBeforeControls: 'High',
          controlMethod: 'Minimise',
          riskAfterControls: 'Low',
          controls: [
            'Accessways are clear',
            'Edge protection in place',
            'Clearly mark any holes',
            'Maintain good housekeeping'
          ]
        },
        {
          name: 'Scaffold',
          image: '../../../../static/scaffold.png',
          riskBeforeControls: 'High',
          controlMethod: 'Minimise',
          riskAfterControls: 'Medium',
          controls: [
            'Guard Rails are in place',
            'Safety tag is current',
            'Toe boards are secure',
            'Safe access'
          ]
        }
      ],
      allHazards: [
        {
          name: 'Hazardous Substances',
          image: '../../../../static/Haz-sub.jpg',
          riskBeforeControls: 'High',
          controlMethod: 'Minimise',
          riskAfterControls: 'Low',
          controls: [
            'Wear appropriate PPE',
            'Store safely and securely',
            'Safety data sheets are on site',
            'Keep away from ignition sources'
          ]
        }
      ]
    }
  },
  computed: {
    headerTitle () {
      if (this.register) {
        return 'Hazard Register'
      } else {
        return 'Hazard Database'
      }
    },
    headerButton () {
      if (this.register) {
        return 'Add New Hazard'
      } else {
        return 'Back to Hazard Register'
      }
    },
    hazards () {
      if (this.register) {
        return this.myHazards
      } else {
        return this.allHazards
      }
    }
  },
  methods: {
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
    background-color: #12807a;
    font-size: 1.4rem;
    color: white;
  }
  
  .card-header.inverted {
    background-color: rgba(111, 50, 130, 0.86);
  }
  
  .btn {
    float: right;
    margin-left: 10px;
    cursor:pointer;
  }
  .headerBtn {
    float: right;
    background-color: #ffc80b;
    color: black;
    cursor: pointer;
  }
  
  .editBtn {
    background-color:rgba(223, 233, 255, 0.83);
    color: black;
  }
  
  .card-header.hazard{
    background-color: rgba(111, 50, 130, 0.86);
    margin: 0;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }
  
  .card-header.hazard.inverted {
    background-color: #12807a;
  }
  
  .subheader {
    padding: 15px 0 15px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color: black;
  }
  
  .hazardCard > .card-body {
    padding: 0;
  }
  
  .row {
    margin:auto;
  }
  
  .col {
    padding: 20px;
    max-width: 300px;
    min-width: 240px;
  }
  
</style>