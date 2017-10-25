<template>
  <b-container fluid>
    <b-card>
      <div class="card-header">Hazard Register
       <b-button 
         class="addBtn"
         @click="goDatabase">Add Hazard</b-button>
      </div>
      <b-card
       v-for="hazard in hazards"
       :key="hazard.name"
       class="hazardCard mt-2 mb-4">
        <header class="card-header hazard">{{hazard.name}}
          <b-button class="editBtn pt-1 pb-1">Remove Hazard</b-button>
          <b-button class="editBtn pt-1 pb-1">Edit Hazard</b-button>
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
      hazards: [
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
      ]
    }
  },
  methods: {
    goDatabase () {
      this.$router.push('/contractor/hazardDatabase')
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;;
  }
  
  .card {
    border: 1px solid grey;
  }
  
   .card-header {
    margin: -20px -20px 20px -20px;
    background-color: rgb(18, 128, 122);
    font-size: 1.4rem;
    color: white;
  }
  
  .btn {
    float: right;
    margin-left: 10px;
    cursor:pointer;
  }
  .addBtn {
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
    background-color: rgba(67, 50, 138, 0.83);
    margin: 0;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
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