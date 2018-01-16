<template>
  <b-container fluid class="outside-container">
    <b-modal
      v-model="createNew"
      v-if="createNew" 
      @ok="saveWorker" 
      centered 
      header-bg-variant="info"
      headerTextVariant= 'light'
      title="Add New Worker">
      <div>
         <b-row class="inner-row">
          <b-col md="6" lg="4">
            <p>Name:</p>
          </b-col>
          <b-col md="6" lg="8">
            <b-form-input type="text" :value="newWorker.name" required/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col md="6" lg="4">
            <p>Email Address:</p>
          </b-col>
          <b-col md="6" lg="8">
            <b-form-input type="text" :value="newWorker.email" required/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col md="6" lg="4">
            <p>Phone Number:</p>
          </b-col>
          <b-col md="6" lg="8">
            <b-form-input type="text" :value="newWorker.phone" required/>
          </b-col>
        </b-row>
        <b-row class="inner-row">
          <b-col md="6" lg="4">
            <p>Role:</p>
          </b-col>
          <b-col md="6" lg="8">
            <b-form-input type="text" :value="newWorker.role" required/>
          </b-col>
        </b-row>
          <b-row class="inner-row">
          <b-col md="6" lg="4">
            <p>Admin User:</p>
          </b-col>
          <b-col md="6" lg="8">
            <b-form-checkbox id="checkbox"
              class="mt-1 mb-1"
              v-model="newWorker.admin"
              value=true
              unchecked-value=false>
            </b-form-checkbox>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <b-card>
      <div class="card-header">Worker Management
       <b-button class="addBtn" @click="createWorker">Add New Worker</b-button>
      </div>
      <div class="scroll-container">
        <div v-for="worker in workers" :key="worker.id">
          <workerview :worker="worker.worker"></workerview>
        </div>
       </div>
    </b-card>
  </b-container>
</template>

<script>
import WorkerView from '@/components/Shared/Worker.vue'
export default {
  components: {
    'workerview': WorkerView
  },
  data () {
    return {
      createNew: false,
      newWorker: {
        name: '',
        email: '',
        phone: '',
        role: '',
        admin: false
      }
    }
  },
  computed: {
    workers () {
      return this.$store.getters.workers
    }
  },
  methods: {
    createWorker () {
      // modal pop up with new worker details
      this.createNew = true
    },
    saveWorker () {
      // save worker in firebase
    }
  }
}
</script>

<style scoped>
  .card-header {
    margin: -20px -20px 20px -20px;
    background-color: rgba(29, 92, 158, 0.89);
    font-size: 1.4rem;
    color: white;
  }
  
  .addBtn {
    float: right;
    background-color: #ffc80b;
    color: black;
    cursor: pointer;
  }
  
</style>