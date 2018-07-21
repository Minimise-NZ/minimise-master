<template>
  <b-card class="hazSubCard mt-2 mb-4">
    <b-btn block v-b-toggle="'collapse' + index" class="text-left togglebtn card-header substance" v-b-tooltip.hover title="Click to show/hide substance details">
        {{substance.name}}
      <i class="fa fa-chevron-down" style="float:right"></i>
    </b-btn>
    <b-collapse :id="'collapse' + this.index" accordion="my-accordion" visible>
    <b-form @submit.prevent="onSubmit">
      <b-row class="outer-row">
        <b-col m="12" lg="6">
          <b-row class="inner-row">
            <b-col md="12" lg="4">
              <label>Product/Substance Name:</label>
            </b-col>
            <b-col>
              <b-form-input v-model="substance.name" :readonly="readonly"/>
            </b-col>
          </b-row>               
          <b-row class="inner-row">
            <b-col md="12" lg="4">
              <label>Approval Number/Group Standard:</label>
            </b-col>
            <b-col>
              <b-form-textarea rows="2" v-model="substance.group" :readonly="readonly"/>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col md="12" lg="4" style="margin-bottom: 10px">
              <label>Storage and Segregation Requirements:</label>
            </b-col>
            <b-col>
              <b-form-textarea rows="2" v-model="substance.storageRequirements" :readonly="readonly" style="white-space: pre-wrap"/>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col md="12" lg="4" style="margin-bottom: 10px">
              <label>Max Quantity on Site:</label>
            </b-col>
            <b-col>
              <b-form-input v-model="substance.maxQuantity" :readonly="readonly"/>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col md="12" lg="4" style="margin-bottom: 10px">
              <label>Site Storage Location:</label>
            </b-col>
            <b-col>
              <b-form-input v-model="substance.location" :readonly="readonly"/>
            </b-col>
          </b-row>
           <b-row class="inner-row">
            <b-col md="12" lg="4" style="margin-bottom: 10px">
              <label>PPE required:</label>
            </b-col>
            <b-col>
              <b-form-textarea rows="5" v-model="substance.PPE" :readonly="readonly" style="white-space: pre-wrap" spellcheck="false"/>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col md="12" lg="4"></b-col>
            <b-col>
              <label style="margin-right: 15px">Is current SDS available?</label>
              <b-btn style="width: 75px" :style="{backgroundColor: btnColor(substance.SDS)}" @click="substance.SDS = !substance.SDS" :disabled="readonly">{{SDSText(substance.SDS)}}</b-btn>
            </b-col>
          </b-row>
        </b-col>
        <!--Second column-->
        <b-col>
          <b-row class="inner-row">
            <b-col md="12" lg="3">
              <label>UN number:</label>
            </b-col>
            <b-col>
              <b-form-input v-model="substance.UN" :readonly="readonly"/>
            </b-col>
          </b-row>
           <b-row class="inner-row">
            <b-col lg="3">
              <label>Hazard Types:</label>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-checkbox-group v-model="substance.hazTypes" :options="hazOptions" v-if="!readonly" style="padding: 5px"></b-form-checkbox-group>
                  <b-form-checkbox-group v-model="substance.hazTypes" :options="hazOptions" v-if="readonly" onclick="return false"></b-form-checkbox-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col md="12" lg="3">
              <label>Hazard Classification:</label>
            </b-col>
            <b-col>
              <b-form-input v-model="substance.hazClassification" :readonly="readonly"/>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col lg="3">
              <label>Substance Type:</label>
            </b-col>
            <b-col>
              <b-form-select v-model="substance.subType" :disabled="readonly">
                <option :value="null">Please select an option</option>
                <option value="solid">Solid</option>
                <option value="liquid">Liquid</option>
                <option value="gas">Gas</option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col md="12" lg="3">
              <label>Hazard Statements:</label>
            </b-col>
            <b-col>
              <b-form-textarea rows="8" v-model="substance.hazStatements" :readonly="readonly" style="white-space: pre-wrap" spellcheck="false"></b-form-textarea>
            </b-col>
          </b-row>
          <div class="text-right">
            <div v-if="!readonly">
              <b-button class="button" variant="success" @click="save" v-if="!itemLoading">Save</b-button>
              <b-button class="button" variant="danger" @click="cancel" v-if="!itemLoading">Cancel</b-button>
              <div class="loader" v-if="itemLoading">
                <pulse-loader :loading="itemLoading"></pulse-loader>
              </div>
            </div>
            <b-button class="button" style="background-color: #ff6a00" v-else @click="edit">Edit/Update</b-button>
          </div>
        </b-col>
      </b-row>
    </b-form>
    </b-collapse>
  </b-card>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  props: ['substance', 'index'],
  components: {
    PulseLoader
  },
  data () {
    return {
      itemLoading: false,
      readonly: true,
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
    hazardousSubstances () {
      return this.$store.getters.hazardousSubstances
    }
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
    },
    edit () {
      this.readonly = false
      this._beforeEditingCache = Object.assign({}, this.substance)
      console.log(this._beforeEditingCache)
    },
    save () {
      this.itemLoading = true
      if (this._.isEqual(this._beforeEditingCache, this.substance)) {
        this.cancel()
      } else {
        this.$store.dispatch('updateSubstance', this.substance)
        .then(() => {
          this.readonly = true
          this.itemLoading = false
        })
        .catch(err => {
          console.log(err.message)
          this.readonly = true
          this.itemLoading = false
        })
      }
    },
    cancel () {
      Object.assign(this.substance, this._beforeEditingCache)
      this._beforeEditingCache = null
      this.readonly = true
      this.itemLoading = false
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

  .loader {
    margin-top: 30px;
    text-align: right;
  }

  .col {
    margin: 0;
    padding-right: 0;
  }

  .card-header.substance {
    background-color: #6b668e;
    margin: 0;
    color: white;
    font-size: 1em;
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
    margin-top: 30px;
    cursor: pointer;
    width: 125px;
  }

</style>
