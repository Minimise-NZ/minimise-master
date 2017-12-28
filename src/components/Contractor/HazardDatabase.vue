<template>
  <b-container fluid>
    <b-card>
      <div class="card-header">Hazard Database</div>
      <div class="scroll-container">
        <b-card
        v-for="hazard in hazards"
        :key="hazard.id"
        class="hazardCard mt-2 mb-4">
          <header class="card-header hazard">{{hazard.name}}
            <b-button class="addBtn pt-1 pb-1">Add to my Hazard Register</b-button>
          </header>
          <b-row>
            <b-col lg="3" md="12">
              <b-img
                :src='hazard.image'
                fluid>
              </b-img>
            </b-col>
            <b-col lg="3" md="12">
              <h5 class="mb-3"><strong>Risks</strong></h5>
              <p>Risk before controls: <strong><span>{{hazard.IRA}}</span></strong></p>
              <ul>
                <li v-for="(risk, key) in hazard.risks" :key="key" class="mb-1">{{risk}}</li>
              </ul>
            </b-col>
            <b-col>
              <h5 class="mb-3"><strong>Controls</strong></h5>
              <p>Risk after controls: <strong><span>{{hazard.RRA}}</span></strong></p>
              <ul>
                <li v-for="(control, key) in hazard.controls" :key="key" class="mb-1">{{control}}</li>
              </ul>
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
      companyHazards: []
    }
  },
  computed: {
    hazards () {
      let companyHazards = this.$store.getters.company.hazards
      if (companyHazards <= 0) {
        console.log('this company has no hazards')
        this.companyHazards = null
      } else {
        // do dome other stuff
      }
      // let allHazards = this.$store.getters.allHazards
      // let hazards = new Set ([...allHazards]).filter(x => !myHazards.has(x))
      // return hazards
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;
    min-width: 550px;
  }

  .card-header {
    margin: -20px -20px 20px -20px;
    background-color: rgba(111, 50, 130, 0.86);
    font-size: 1.4rem;
    color: white;
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
  
  .card-header.hazard{
    background-color: #12807a;
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
  
  .col, .col-lg-3, .col-md-12 {
    margin: 20px 10px 15px 10px;
  }

  ul {
    padding: 0;
  }

</style>