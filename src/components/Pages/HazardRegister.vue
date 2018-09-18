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
        <h5>{{errorMessage}}</h5>
      </div>
    </b-modal>
    <b-modal
      v-model="error" 
      v-if="error" 
      ok-only
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Oops..">
      <div class="d-block text-center">
        <h4>Something went wrong. Please try again</h4>
      </div>
    </b-modal>
    <b-modal 
      v-model="confirmAction" 
      v-if="confirmAction" 
      @ok="removeHazard()"
      @cancel="clear"
      centered 
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Confirm Action">
      <div class="d-block text-center">
        <h4 class="mt-2">Remove this hazard<br>from your hazard register?</h4>
      </div>
    </b-modal>

    <b-card header-tag="header">
      <header slot="header">{{headerTitle}}
        <b-btn
          v-if="register"
          variant="success"
          @click="register = !register, inverted = !inverted"
          v-b-tooltip.hover title="Add New Hazard">
          <i class="fa fa-plus"></i>
        </b-btn>
        <b-btn
          v-else
          variant="primary"
          @click="register = !register, inverted = !inverted"
          v-b-tooltip.hover title="Back to Hazard Register">
          <i class="fa fa-undo"></i>
        </b-btn> 
      </header>
      <div class="scroll-container">
        <b-row v-if="hazards.length === 0" >
          <b-col class="p-0">
            <header class="subheader">Click the add + button to create your hazard register </header>
          </b-col>
        </b-row>

        <b-card
          v-for="(hazard, index) in hazards"
          :key="index"
          :class="{inverted: inverted}"
          class="hazardCard">
          <header slot="header" >{{hazard.name}}
            <b-button
              v-if="register && !loading"
              class="addBtn remove"
              variant="danger"
              @click="confirm(hazard, index)"
              v-b-tooltip.hover title="Remove Hazard">
              <i class="fa fa-minus"></i>
            </b-button>
            <b-button
              v-if="!register  && !loading"
              class="addBtn add"
              @click="addHazard(hazard)"
              v-b-tooltip.hover title="Add to my Hazard Register">
              <i class="fa fa-plus"></i>
            </b-button>
            <div class="loader mini" v-if="loading">
              <pulse-loader :loading="loading"></pulse-loader>
            </div>
          </header>
          <b-row class="hazard-row">
            <b-col md="3" class="img-col"> 
              <b-img
                thumbnail
                :src='hazard.imageURL'
                fluid>
              </b-img>
            </b-col>
            <b-col sm="12" md="3" class="hazard-col">
              <h5 class="mb-3"><strong>Risks</strong></h5>
              <ul v-for="(risk, index) in hazard.risks" :key="index">
                <li>{{risk}}</li>
              </ul>
              <!--<b-form-input v-for="(risk, index) in hazard.risks" :key="index" :value="risk" class="mb-1"></b-form-input>-->
            </b-col>
            <b-col sm="12" md="3" class="hazard-col">
              <h5 class="mb-3"><strong>Controls</strong></h5>
              <ul v-for="(control, index) in hazard.controls" :key="index">
                <li>{{control}}</li>
              </ul>
              <!--<b-form-input v-for="(control, index) in hazard.controls" :key="index" :value="control" readonly class="mb-1"></b-form-input>-->
            </b-col>
            <b-col sm="12" md="3" class="hazard-col">
              <p class="mb-1"><strong>Risk before controls: </strong></p>
              <div :class="hazard.IRA" class="heat-div">{{hazard.IRA}}</div>
              <p class="mb-1"><strong>Risk after controls: </strong></p>
              <div :class="hazard.RRA" class="heat-div">{{hazard.RRA}}</div>
              <p class="mb-1"><strong>Level of control: </strong></p>
              <div style="background-color: #928e8e" class="heat-div">{{hazard.controlLevel}}</div>
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
      error: false,
      errorMessage: '',
      hazard: ''
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
    addHazard (hazard) {
      // add selected hazard to company hazard register
      this.loading = true
      this.$store.dispatch('addHazard', hazard)
      .then(() => {
        this.success = true
        this.loading = false
      })
      .catch((error) => {
        this.error = true
        this.errorMessage = error.message
        this.loading = false
      })
    },
    confirm (hazard, index) {
      // confirm that user wants the hazard removed (modal popup)
      this.confirmAction = true
      console.log(hazard, index)
      this.hazard = hazard
    },
    removeHazard () {
      this.loading = true
      this.$store.dispatch('removeHazard', this.hazard)
      .then(() => {
        this.success = true
        this.loading = false
      })
      .catch((error) => {
        this.errorMessage = error.message
        this.error = true
        this.loading = false
      })
    },
    clear () {
      this.loading = false
      this.hazard = ''
    }
  }
}
</script>

<style scoped>

  .container-fluid {
    padding-top: 20px;
  }

   .scroll-container {
    height: 80vh;
    overflow-y: scroll;
    margin-top: 15px;
    padding-right: 10px;
  }

  .card-body {
    padding-top: 0;
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
  
  .subheader {
    margin-left: 15px;
    font-weight: bold;
    font-size: 1.2em;
    color: #186ca7;
  }
  
  .addBtn.remove{
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: rgb(226, 57, 82);
  }

  .addBtn.add{
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: #22ab57;
  }

  .loader {
    float: right;
    width: 80px;
  }

  img {
    max-height: 210px;
  }

  .hazardCard {
    margin-bottom: 15px;
  }

  .hazardCard > .card-header {
    background-color: rgba(12, 84, 96, 0.91);
    padding-top: 7px;
    padding-bottom: 7px;
    padding-right: 10px;
    font-size: 1.1em;
  }

  .inverted > .card-header{
    background-color: rgba(140, 54, 83, 0.85);
  }

  .hazard-row {
    padding-top: 15px;
  }

  ul {
    padding-left: 15px;
    margin-bottom: 5px;
  }

  .heat-div {
    width: 80%;
    margin-bottom: 15px;
    padding: 8px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    line-height: 1.5em;
  }

  .Low {
    background-color: rgb(76, 175, 80);
  }

  .Moderate {
    background-color: rgba(255, 87, 34, 0.75);
  }

  .High {
    background-color: rgb(244, 67, 54);
  }

  .Critical {
    background-color:rgba(233, 30, 99, 0.75);
  }

  @media screen and (max-width: 768px) {
    .img-col {
      display: none;
    }
    .hazard-col {
      margin-top: 10px;
      margin-bottom: 15px;
    }
  }

  @media screen and (max-width: 992px) {
    .heat-div {
      line-height: 1em;
      width: 100%;
    }
  }
</style>