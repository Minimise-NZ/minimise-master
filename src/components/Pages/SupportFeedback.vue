<template>
  <b-container fluid>
    <b-modal 
      v-model="success" 
      v-if="success" 
      @ok="clear" 
      ok-only 
      centered 
      header-bg-variant="success"
      headerTextVariant= 'light'
      title="Success">
      <div class="d-block text-center">
        <h4>Thank you for your feedback</h4><br>
        <h5>We will respond to you as soon as we can</h5>
      </div>
    </b-modal>
    <b-card>
    <div class="card-header">Support/Feedback
    </div>
    <b-card class="itemCard mt-2 mb-4">
      <header class="card-header item">Please enter feedback details below<br><span style="font-size: 0.8em">We will typically respond via email within 24 hours</span></header>
      <b-form @submit.prevent="onSubmit">
        <b-row>
          <b-col sm="3"><label>Feedback Type:</label></b-col>
          <b-col sm="7" class="error">
            <b-form-select v-model="form.subject" :options="subjects"/>
            <b-alert variant="danger" :show="subjectError">Please select feedback type</b-alert>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3"><label>Application Type:</label></b-col>
          <b-col sm="7">
            <b-form-select v-model="form.platform" :options="platforms"/>
            <b-alert variant="danger" :show="platformError">Please select application type</b-alert>
          </b-col>
        </b-row>
        <b-row v-if="form.platform === 'web'">
          <b-col sm="3"><label>Which operating system do you use?</label></b-col>
          <b-col sm="7">
            <b-form-select v-model="form.os" :options="osTypes"/>
            <b-alert variant="danger" :show="osError">Please select operating system</b-alert>
          </b-col>
        </b-row>
          <b-row v-if="form.platform === 'mobile'">
          <b-col sm="3"><label>Mobile type:</label></b-col>
          <b-col sm="7">
            <b-form-select v-model="form.mobile" :options="mobiles"/>
            <b-alert variant="danger" :show="mobileError">Please select mobile type</b-alert>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3"><label>Description:</label></b-col>
          <b-col sm="7">
            <b-form-textarea 
              required
              v-model="form.details"
              placeholder="Please enter detailed description"
              :rows="8">
            </b-form-textarea>
            <b-alert variant="danger" :show="detailError">Please enter details</b-alert>
          </b-col>
        </b-row>
        <div class="text-center">
          <b-button-group class="pt-4 pb-4">
            <b-button class="buttons" variant="success" @click="submit">
              <p style="font-size: 1em; margin-bottom: 0" v-if="loading===false">Submit</p>
              <div class="loader">
                <pulse-loader :loading="loading" ></pulse-loader>
              </div>
            </b-button>
            <b-button class="buttons" variant="danger" @click="clear" :disabled="loading">Clear</b-button>
          </b-button-group>
        </div>
      </b-form>
    </b-card>
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
      subjectError: false,
      platformError: false,
      osError: false,
      mobileError: false,
      detailError: false,
      subjects: [
        { value: 'Support Request', text: 'Help/Support' },
        { value: 'Report an issue', text: 'Report an issue' },
        { value: 'New Feature Request', text: 'New Feature Request' },
        { value: 'User Experience', text: 'User Experience' },
        { value: 'General Feedback', text: 'General Feedback' }
      ],
      platforms: [
        { value: 'web', text: 'Web Application' },
        { value: 'mobile', text: 'Mobile Application' },
        { value: 'nonSpecific', text: 'NonSpecific' }
      ],
      osTypes: [
        { value: 'Windows', text: 'Windows' },
        { value: 'Apple', text: 'Apple Mac' },
        { value: 'unknown', text: 'I don\'t know' }
      ],
      mobiles: [
        { value: 'Android', text: 'Android' },
        { value: 'ios', text: 'iPhone' },
        { value: 'nonSpecific', text: 'NonSpecific' }
      ],
      form: {
        subject: '',
        platform: '',
        os: '',
        mobile: '',
        details: ''
      },
      success: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    submit () {
      // submit
      this.loading = true
      this.subjectError = false
      this.platformError = false
      this.osError = false
      this.mobileError = false
      this.detailError = false
      let form = this.form
      if (form.subject === '') {
        this.subjectError = true
        this.loading = false
        return
      }
      if (form.platform === '') {
        this.platformError = true
        this.loading = false
        return
      }
      if (form.platform === 'web' && form.os === '') {
        this.osError = true
        this.loading = false
        return
      }
      if (form.platform === 'mobile' && form.mobile === '') {
        this.mobileError = true
        this.loading = false
        return
      }
      if (form.details === '') {
        this.detailError = true
        this.loading = false
        return
      } else {
        form.username = this.user.name
        form.userEmail = this.user.email
        this.$store.dispatch('submitFeedback', form)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            this.loading = false
            this.success = true
          } else {
            this.loading = false
            console.log('error')
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
      }
    },
    clear () {
      this.form.subject = ''
      this.form.platform = ''
      this.form.os = ''
      this.form.mobile = ''
      this.form.details = ''
      this.subjectError = false
      this.platformError = false
      this.osError = false
      this.mobileError = false
      this.detailError = false
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;
  }

  .card-header {
    background-color: rgba(56, 56, 56, 0.88);
    margin: -20px -20px 20px -20px;
  }
  
   .card-header.item{
    background-color: rgba(29, 92, 158, 0.89);
    margin: 0;
    color: white;
    font-size: 1.2em;
    padding-left: 15px;
    margin-bottom: 20px;
  }

  .col-sm-3 {
    text-align: right;
  }
  
  .itemCard > .card-body {
    padding: 0;
  }

   .row {
    padding: 15px;
  }

  .col {
    padding: 0;
    margin: 0;
  }
  
  .btn-group {
    align-items: center;
    width: 40%;
  }

  .btn-secondary {
    background-color: #3366cc;
    cursor:pointer;
  }

  .buttons {
    cursor: pointer;
    margin: 20px;
    width: 50%;
  }
</style>