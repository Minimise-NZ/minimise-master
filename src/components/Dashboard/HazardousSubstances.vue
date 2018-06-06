<template>
  <b-container fluid>
    <b-card>
    <div class="card-header">
      Hazardous Substances
      <b-button class="addBtn">Add New Hazardous Substance</b-button>
      </div>
      <div class="scroll-container">
        <b-card
          v-for="(hazSub, index) in hazSubs"
          :key="hazSub.id"
          class="hazSubCard mt-2 mb-4">
           <b-btn block v-b-toggle="'collapse' + index" class="text-left togglebtn card-header hazSub">
             {{hazSub.name}}
            <p style="float:right; margin-bottom:0">Click to hide/show</p>
          </b-btn>
          <b-collapse :id="'collapse' + index" visible>
          <b-form @submit.prevent="onSubmit">
            <b-row class="outer-row">
              <b-col m="12" lg="7" class="outer-col">
                <b-row class="inner-row">
                  <b-col md="12" lg="4">
                    <label>Product/ Substance/ Material Name:</label>
                  </b-col>
                  <b-col>
                    <b-form-input v-model="hazSub.name" :readonly="readonly"/>
                  </b-col>
                </b-row>
                <b-row class="inner-row">
                  <b-col md="12" lg="4">
                    <label>UN number:</label>
                  </b-col>
                  <b-col>
                    <b-form-input v-model="hazSub.UN" :readonly="readonly"/>
                  </b-col>
                </b-row>                
                <b-row class="inner-row">
                  <b-col md="12" lg="4">
                    <label>Approval Number/Group Standard:</label>
                  </b-col>
                  <b-col>
                    <b-form-textarea rows="2" v-model="hazSub.group" :readonly="readonly"/>
                  </b-col>
                </b-row>
                <b-row class="inner-row">
                  <b-col md="12" lg="4">
                    <label>Hazard Classification:</label>
                  </b-col>
                  <b-col>
                    <b-form-input v-model="hazSub.hazClassification" :readonly="readonly"/>
                  </b-col>
                </b-row>
                <b-row class="inner-row">
                  <b-col md="12" lg="4" style="margin-bottom: 10px">
                    <label>Storage and Segregation Requirements:</label>
                  </b-col>
                  <b-col>
                    <b-form-textarea rows="2" v-model="hazSub.storageRequirements" :readonly="readonly"/>
                  </b-col>
                </b-row>
                <b-row class="inner-row">
                  <b-col md="12" lg="4" style="margin-bottom: 10px">
                    <label>Max Quantity on Site:</label>
                  </b-col>
                  <b-col>
                    <b-form-input v-model="hazSub.maxQuantity" :readonly="readonly"/>
                  </b-col>
                </b-row>
                <b-row class="inner-row">
                  <b-col md="12" lg="4" style="margin-bottom: 10px">
                    <label>Site Storage Location:</label>
                  </b-col>
                  <b-col>
                    <b-form-input v-model="hazSub.location" :readonly="readonly"/>
                  </b-col>
                </b-row>
                <b-row class="inner-row">
                  <b-col md="12" lg="4" style="margin-bottom: 10px">
                    <label>PPE required:</label>
                  </b-col>
                  <b-col>
                    <b-form-textarea rows="5" v-model="hazSub.PPE" :readonly="readonly"/>
                  </b-col>
                </b-row>
              </b-col>
              <!--Second column-->
              <b-col class="outer-col">
                 <b-row class="inner-row">
                  <b-col md="12" lg="3"></b-col>
                  <b-col>
                    <label style="margin-right: 15px">Is current SDS available?</label>
                    <b-btn style="width: 75px" :style="{backgroundColor: btnColor(hazSub.SDS)}" @click="hazSub.SDS = !hazSub.SDS" :disabled="readonly">{{SDSText(hazSub.SDS)}}</b-btn>
                  </b-col>
                </b-row>
                <b-row class="inner-row">
                  <b-col lg="3">
                    <label>Substance Type:</label>
                  </b-col>
                  <b-col>
                    <b-form-select v-model="hazSub.subType" :disabled="readonly">
                      <option :value="null">Please select an option</option>
                      <option value="solid">Solid</option>
                      <option value="liquid">Liquid</option>
                      <option value="gas">Gas</option>
                    </b-form-select>
                  </b-col>
                </b-row>
                <b-row class="inner-row">
                  <b-col lg="3">
                    <label>Hazard Types:</label>
                  </b-col>
                  <b-col>
                    <b-form-group>
                      <b-form-checkbox-group v-model="hazSub.hazTypes" :options="hazOptions" v-if="!readonly" style="padding: 5px"></b-form-checkbox-group>
                       <b-form-checkbox-group v-model="hazSub.hazTypes" :options="hazOptions" v-if="readonly" onclick="return false"></b-form-checkbox-group>
                    </b-form-group>
                  </b-col>
                </b-row>
                 <b-row class="inner-row">
                  <b-col md="12" lg="3">
                    <label>Hazard Statements:</label>
                  </b-col>
                  <b-col>
                    <b-row style="margin-bottom: 5px;" v-for="(item, index) in hazSub.hazStatements" :key="index">
                       <b-form-input :value="item" :readonly="readonly"/>
                    </b-row>
                  </b-col>
                </b-row>
                  <div class="text-right">
                    <b-button class="button" variant="success" v-if="!readonly">Save</b-button>
                    <b-button class="button" variant="danger" v-if="!readonly">Cancel</b-button>
                    <b-button class="button" style="background-color: #ff6a00" v-else @click="readonly = !readonly">Edit/Update</b-button>
                  </div>     
              </b-col>
            </b-row>
          </b-form>
          </b-collapse>
        </b-card>
      </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      readonly: true,
      hazSubs: [
        {
          name: 'Concrete Stain',
          UN: '1263',
          group: ' Surface Coatings & Colourants - Flammable',
          hazClassification: 'Class 3 Flammable liquid',
          SDS: true,
          storageRequirements: 'Avoid damaging containers. Keep lids on containers when not in use',
          maxQuantity: '10L',
          location: '',
          subType: 'liquid',
          hazTypes: [],
          PPE: 'Safety eyewear, Gloves of neoprene or nitrile rubber, Overalls, impervious clothing, barrier cream, eyewash unit, skin cleansing cream',
          hazStatements: ['May damage fertility or the unborn child', 'Toxic to aquatic life with long lasting effects', 'Harmful to terrestrial vertebrates',
            'Flammable liquid and vapour', 'Causes mild skin irritation', 'Causes eye irritation']
        }
      ],
      hazOptions: [
        { text: 'Explosive', value: 'Explosive' },
        { text: 'Flammable', value: 'Flammable' },
        { text: 'Corrosive', value: 'Corrosive' },
        { text: 'Eco-Toxic', value: 'Eco-Toxic' },
        { text: 'Oxidiser', value: 'Oxidiser' },
        { text: 'Toxic', value: 'Toxic' },
        { text: 'Health Effects', value: 'Health Effects' }
      ]
    }
  },
  computed: {
  },
  methods: {
    btnColor (SDS) {
      if (SDS === true) {
        return '#12807a'
      } else {
        return '#b70011e3'
      }
    },
    SDSText (SDS) {
      if (SDS === true) {
        return 'Yes'
      } else {
        return 'No'
      }
    }
  }
}
</script>

<style scoped>

  .row{
    margin: 0;
    padding: 0;
  }

  [class*="col-"] {
    margin: 0;
    padding: 0;
  }
  .container-fluid {
    padding-top: 20px;
  }

   .card-header {
    margin: -20px -20px 0px -20px;
    background-color: rgba(111, 50, 130, 0.86);
    font-size: 1.4rem;
    color: white;
  }

  .card-header.hazSub {
    background-color: rgba(29, 92, 158, 0.89);
    margin: 0;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }

  .addBtn {
    float: right;
    background-color:rgba(223, 233, 255, 0.83);
    color: black;
  }

  .addBtn:hover {
    background-color:#ffc80b;
    color: black;
  }

  label {
    padding-top: 5px;
  }

  .hazSubCard > .card-body {
    padding: 0;
  }

  .outer-row {
    margin-top: 15px;
    padding: 0px 15px;
  }

  .inner-row{
    margin-bottom: 15px;
  }

  .form-group {
    margin-bottom:0;
  }

  .button {
    cursor: pointer;
    margin: 10px;
    width: 125px;
  }

  .form-control{
    /* color: #007bff; */
  }

</style>