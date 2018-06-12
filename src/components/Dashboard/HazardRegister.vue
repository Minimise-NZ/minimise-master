<template>
  <b-container fluid>
    <b-modal 
      v-model="success" 
      v-if="success"
      ok-only
      centered 
      header-bg-variant="success"
      headerTextVariant= 'light'
      title="Success">
      <div class="d-block text-center">
        <h4 class="mt-2">Your hazard register has been updated</h4>
      </div>
    </b-modal>
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
        <b-button
          v-if="register"
          class="addBtn"
          variant="warning"
          @click="register = !register, inverted = !inverted"
          v-b-tooltip.hover title="Add New Hazard">
          <i class="fa fa-plus" style="color:#383838"></i>
        </b-button> 
        <b-button  
          v-else
          class="addBtn"
          variant="warning"
          @click="saveHazards()"
          v-b-tooltip.hover title="Back to Hazard Register">
          <i class="fa fa-undo" style="color:#383838"></i>
        </b-button> 
      </div>
      <div class="scroll-container">
        <b-row v-if="hazards.length === 0">
          <b-col class="p-0">
            <header class="subheader">Add hazards by clicking the add + button </header>
          </b-col>
        </b-row>
        <b-card
          v-for="(hazard, index) in hazards"
          :key="index"
          class="hazardCard mt-2 mb-4">
          <header class="card-header hazard" :class="{ inverted: inverted }">{{hazard.name}}
            <b-button
              v-if="register && !loading"
              class="addBtn mini"
              variant="danger"
              @click="confirm(hazard, index)"
              v-b-tooltip.hover title="Remove Hazard">
              <i class="fa fa-minus"></i>
            </b-button>
            <b-button
              v-if="!register  && !loading"
              class="addBtn mini"
              variant="warning"
              @click="addHazard(hazard, index)"
              v-b-tooltip.hover title="Add to my Hazard Register">
              <i class="fa fa-plus" style="color:#383838"></i>
            </b-button>
            <div class="loader mini" v-if="loading">
              <pulse-loader :loading="loading"></pulse-loader>
            </div>
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
      register: true,
      inverted: false,
      confirmAction: false,
      success: false,
      changed: false,
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
    myHazards () {
      return this.$store.getters.myHazards
    },
    notMyHazards () {
      return this.$store.getters.notMyHazards
    },
    hazards () {
      if (this.register) {
        'getting my hazards'
        return this.myHazards
      } else {
        'getting not my hazards'
        return this.notMyHazards
      }
    }
  },
  methods: {
    addHazard (hazard, index) {
      // add selected hazard to company hazard register
      this.loading = true
      this.changed = true
      this.myHazards.push(hazard)
      // remove selected hazard from hazard list
      this.notMyHazards.splice(index, 1)
      this.loading = false
    },
    confirm (hazard, index) {
      // confirm that user wants the hazard removed (modal popup)
      this.remove = {hazard, index}
      this.confirmAction = true
    },
    removeHazard () {
      this.loading = true
      let hazard = this.remove
      this.myHazards.splice(hazard.index, 1)
      this.notMyHazards.push(hazard)
      this.$store.dispatch('updateHazards', {myHazards: this.myHazards, notMyHazards: this.notMyHazards})
      .then(() => {
        this.clear()
      })
      .catch((error) => {
        alert('Oops something went wrong', error.message)
        this.loading = false
      })
    },
    saveHazards () {
      this.loading = true
      if (this.changed === true) {
        this.$store.dispatch('updateHazards', {myHazards: this.myHazards, notMyHazards: this.notMyHazards})
        .then(() => {
          this.register = !this.register
          this.inverted = !this.inverted
          this.success = true
          this.clear()
        })
        .catch((error) => {
          alert('Oops something went wrong', error.message)
          this.loading = false
        })
      } else {
        this.loading = false
      }
    },
    clear () {
      this.remove = {}
      this.loading = false
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
  
  .btn {
    float: right;
    margin-left: 10px;
    cursor:pointer;
  }

  .addBtn.mini {
    padding-top: 5px;
    padding-bottom: 5px;
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
  
  
  .hazardCard > .card-body {
    padding: 0;
  }

  
  .subheader {
    padding: 15px 0 15px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color: #12807a;
  }
  
  .row {
    margin:auto;
  }
  
  .col {
    padding-top: 20px;
    min-width: 240px;
  }

  .loader {
    float: right;
    width: 80px;
  }
</style>