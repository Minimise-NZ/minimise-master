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
        <b-button v-if="register" class="addBtn" @click="register = !register, inverted = !inverted">Add New Hazard</b-button>
        <b-button v-else class="addBtn" @click="saveHazards()">Back to Hazard Register</b-button>
      </div>
      <div class="scroll-container">
        <b-card
          v-for="(hazard, index) in hazards"
          :key="index"
          class="hazardCard mt-2 mb-4">
          <header class="card-header hazard" :class="{ inverted: inverted }">{{hazard.name}}
            <b-button v-if="register" class="addBtn pt-1 pb-1"  @click="confirm(hazard, index)" :disabled="disabled">
              <p style="font-size: 1rem; margin-bottom: 0" v-if="loading===false">Remove Hazard</p>
              <div class="loader">
                <pulse-loader :loading="loading" color="#ffc80b"></pulse-loader>
              </div>
            </b-button>
            <b-button v-if="!register" class="addBtn pt-1 pb-1"  @click="addHazard(hazard, index)" :disabled="disabled">
              <p style="font-size: 1rem; margin-bottom: 0" v-if="loading===false">Add to my Hazard Register</p>
              <div class="loader">
                <pulse-loader :loading="loading" color="#ffc80b"></pulse-loader>
              </div>
            </b-button>
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
              <p v-for="(control, index) in hazard.controls" :key="index">{{control.desc}}</p>
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
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  components: {
    PulseLoader
  },
  data () {
    return {
      loading: false,
      disabled: false,
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
        'getting my hazards'
        return this.$store.getters.myHazards
      } else {
        'getting not my hazards'
        return this.$store.getters.notMyHazards
      }
    }
  },
  methods: {
    addHazard (hazard, index) {
      this.loading = true
      this.disabled = true
      // remove selected hazard from hazard list
      this.hazards.splice(index, 1)
      // add selected hazard to company hazard register
      this.newHazards.push(hazard)
      setTimeout(() => {
        this.loading = false
        this.disabled = false
      }, 1000)
    },
    confirm (hazard, index) {
      // confirm that user wants the hazard removed (modal popup)
      this.remove = {hazard, index}
      this.confirmAction = true
    },
    removeHazard () {
      this.loading = true
      this.disabled = true
      let hazard = this.remove
      this.hazards.splice(hazard.index, 1)
      this.$store.dispatch('removeHazard', this.hazards)
      .then(() => {
        this.clear()
        this.loading = false
        this.disabled = false
      })
      .catch((error) => {
        console.log(error)
      })
    },
    saveHazards () {
      if (this.newHazards.length !== 0) {
        this.loading = true
        this.disabled = true
        this.$store.dispatch('addNewHazards', this.newHazards)
        .then(() => {
          this.loading = false
          this.disabled = false
          this.register = !this.register
          this.inverted = !this.inverted
          this.clear()
        })
        .catch((error) => {
          this.loading = false
          this.disabled = false
          this.register = !this.register
          this.inverted = !this.inverted
          this.clear()
          alert(error.message, error)
        })
      } else {
        this.register = !this.register
        this.inverted = !this.inverted
      }
    },
    clear () {
      this.remove = {}
      this.newHazards = []
    }
  },
  beforeMount () {
    this.$store.dispatch('getMyHazards')
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
  
  .card-header.hazard{
    background-color: rgba(111, 50, 130, 0.86);
    margin: 0;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }
  .btn {
    float: right;
    margin-left: 10px;
    cursor:pointer;
  }

  .addBtn {
    background-color:rgba(223, 233, 255, 0.83);
    color: black;
  }

  .addBtn:hover {
    background-color: #ffc80b;
    color: black;
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

  :disabled {
    background-color: #ffffff00;
    cursor: default;
    border: none;
  }

   :disabled:hover{
    background-color: #ffffff00;
    border: none;
  }
  
</style>