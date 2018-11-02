<template>
  <b-card class="hazSubCard mb-2">
    <b-btn block v-b-toggle="'collapse' + index" class="text-left togglebtn card-header substance" v-b-tooltip.hover title="Click to show/hide substance details">
        {{substance.name}}
      <i class="fa fa-chevron-down" style="float:right; padding-top: 7px"></i>
    </b-btn>
    <b-collapse :id="'collapse' + this.index" accordion="my-accordion" visible>
    <b-form @submit.prevent="onSubmit">
      <b-row class="outer-row">
        <b-col sm="12" lg="6">
          <b-row class="inner-row">
            <b-col sm="12" >
              <label>Product/Substance Name:</label>
            </b-col>
            <b-col>
              <b-form-input v-model="substance.name" :readonly="readonly"/>
            </b-col>
          </b-row> 
          <b-row class="inner-row">
            <b-col sm="12" style="margin-bottom: 6px">
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
            <b-col sm="12">
              <label>Storage Requirements:</label>
            </b-col>
            <b-col>
              <b-form-textarea rows="3" v-model="substance.storage" :readonly="readonly" style="white-space: pre-wrap"/>
            </b-col>
          </b-row>
           <b-row class="inner-row">
            <b-col sm="12" >
              <label>PPE required:</label>
            </b-col>
            <b-col>
              <b-form-textarea rows="5" v-model="substance.PPE" :readonly="readonly" style="white-space: pre-wrap" spellcheck="false"/>
            </b-col>
          </b-row>
        </b-col>
        <!--Second column-->
        <b-col class="second-col">
          <b-row class="inner-row">
           <b-col sm="12" lg="3">
              <label>Safety Data Sheet:</label>
            </b-col>
            <b-col v-if="substance.sds === ''">
              <b-form-file v-model="sdsFile" placeholder="Safety Data Sheet"></b-form-file>
            </b-col>
            <b-col sm="1" class="pl-0" v-if="sdsFile !== ''">
              <b-btn variant="primary" @click="uploadFile()" v-b-tooltip.hover title="Upload file">
                <i class="fa fa-cloud-upload-alt"></i>
              </b-btn>
            </b-col>
            <b-col v-if="substance.sds !== ''">
              <a :href="substance.sds" target="_blank">{{substance.name}}</a>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col sm="12">
              <label>Potential Harm:</label>
            </b-col>
            <b-col>
              <b-form-textarea rows="8" v-model="substance.potentialHarm" :readonly="readonly" style="white-space: pre-wrap" spellcheck="false"></b-form-textarea>
            </b-col>
          </b-row>
          <b-row class="inner-row">
            <b-col sm="12">
              <label>Recommended Actions:</label>
            </b-col>
            <b-col>
              <b-form-textarea rows="8" v-model="substance.actions" :readonly="readonly" style="white-space: pre-wrap" spellcheck="false"></b-form-textarea>
            </b-col>
          </b-row>
          <div class="text-right mb-2">
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
      sdsFile: '',
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
    uploadFile () {
      this.loading = true
      this.$store.dispatch('uploadFile', {file: this.sdsFile, type: this.substance.name})
      .then((url) => {
        this.substance.sds = url
        this.sdsFile = ''
        this.loading = false
      })
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
body {
  font-size: 0.9em;
  line-height: 1.0;
}

.form-control {
  font-size: 1em;
}
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
    padding-left: 0;
  }

  label {
    font-weight: bold;
  }

  .card-header.substance {
    background-color: #6b668e;
    margin: 0;
    color: white;
    font-size: 1.1em;
    padding: 7px 20px;
    line-height: 2em;
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

  @media screen and (max-width: 992px) {
    .inner-row {
      margin-top: 15px;
    }
  }

  @media screen and (min-width: 992px) {
    .second-col {
      padding-left: 20px;
    }
  }

</style>
