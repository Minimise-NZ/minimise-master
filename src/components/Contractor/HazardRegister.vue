<template>
  <b-container fluid>
    <b-modal 
        v-model="confirmAction" 
        v-if="confirmAction" 
        @ok="removeHazard"
        @cancel="clear"
        centered 
        header-bg-variant="danger"
        headerTextVariant= 'light'
        title="Confirm Action">
        <div class="d-block text-center">
          <h4 class="mt-2">Remove this hazard<br>from your hazard register?</h4>
        </div>
      </b-modal>
    <b-card>
      <div class="card-header" :class="{ inverted: inverted }" >{{headerTitle}}
        <b-button v-if="register" class="headerBtn" @click="register = !register, inverted = !inverted">Add New Hazard</b-button>
        <b-button v-else class="headerBtn" @click="register = !register, inverted = !inverted, saveHazards()">Back to Hazard Register</b-button>
      </div>
      <div class="scroll-container">
        <b-card
          v-for="(hazard, index) in hazards"
          :key="index"
          class="hazardCard mt-2 mb-4">
          <header class="card-header hazard" :class="{ inverted: inverted }">{{hazard.name}}
            <b-button v-if="register" class="editBtn pt-1 pb-1"  @click="confirm(hazard, index)">Remove Hazard</b-button>
            <b-button v-if="!register" class="addBtn pt-1 pb-1"  @click="addHazard(hazard, index)">Add to my Hazard Register</b-button>
          </header>
          <b-row>
            <b-col>
              <b-img
                :src='hazard.image'
                class="ml-3 mb-2"
                fluid>
              </b-img>
            </b-col>
            <b-col>
              <h5 class="mb-3"><strong>Risks</strong></h5>
              <p v-for="(risk, index) in hazard.risks" :key="index">{{risk}}</p>
            </b-col>
            <b-col>
              <h5 class="mb-3"><strong>Controls</strong></h5>
              <p v-for="(control, index) in hazard.controls" :key="index">{{control}}</p>
            </b-col>
             <b-col>
              <br>
              <p><strong>Risk before controls: </strong>{{hazard.IRA}}</p>
              <p><strong>Risk after controls: </strong>{{hazard.RRA}}</p>
              <p v-if="hazard.taskAnalysis === true" class="alert-text"><strong>Task Analysis Required</strong></p>
              <p v-if="hazard.worksafe === true" class="alert-text"><strong>Worksafe Notification Required</strong></p>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      register: true,
      inverted: false,
      confirmAction: false,
      success: false,
      newHazards: [],
      remove: {}
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
    hazards () {
      if (this.register) {
        return this.$store.getters.myHazards
      } else {
        return this.$store.getters.notMyHazards
      }
    }
  },
  methods: {
    addHazard (hazard, index) {
      // add selected hazard to company hazard register
      this.newHazards.push(hazard)
      // remove selected hazard from hazard list
      this.hazards.splice(index, 1)
    },
    confirm (hazard, index) {
      // confirm that user wants the hazard removed (modal popup)
      this.remove = {hazard, index}
      this.confirmAction = true
    },
    removeHazard () {
      let hazard = this.remove
      this.hazards.splice(hazard.index, 1)
      this.$store.dispatch('removeHazard', this.hazards)
      this.clear()
    },
    saveHazards () {
      if (this.newHazards.length !== 0) {
        this.$store.dispatch('addNewHazards', this.newHazards)
        this.clear()
      }
    },
    clear () {
      this.remove = {}
      this.newHazards = []
    }
  },
  beforeMount () {
    this.$store.dispatch('getMyHazards')
    .then((hazards) => {
      console.log('getMyHazards', hazards)
      this.$store.dispatch('getNotMyHazards', hazards)
    })
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
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

  .addBtn {
    background-color:rgba(223, 233, 255, 0.83);
    color: black;
  }

  .addBtn:hover {
    background-color: #ffc80b;
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
    padding-top: 20px;
    min-width: 240px;
  }
  
</style>