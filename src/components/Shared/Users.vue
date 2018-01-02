<template>
  <b-container fluid>
    <b-card>
      <div class="card-header">User Management
       <b-button class="addBtn" @click="newWorker">Add New Worker</b-button>
      </div>
      <b-card
         v-for="worker in workers"
         :key="worker.name"
         class="workerCard mt-2 mb-4" 
        >
        <header class="card-header worker">{{worker.name}}
           <b-button class="editBtn pt-1 pb-1">Edit Worker</b-button>
        </header>
          <b-row>
            <b-col>
              <header class="subheader">Personal Information</header>
              <ul>
                <li>Role: {{worker.role}}</li>
                <li>Phone: {{worker.phone}}</li>
                <li>{{worker.email}}</li>
              </ul>
            </b-col>
            <b-col>
              <header class="subheader">Training Description</header>
              <ul>
                <li v-for="training in worker.training">{{training.description}}</li>
              </ul>
            </b-col>
            <b-col> 
              <header class="subheader">Trained Date</header>
              <ul>
                <li v-for="training in worker.training">{{training.date}}</li>
              </ul>
            </b-col>
            <b-col>
              <header class="subheader">Expiry Date</header>
              <ul>
                <li v-for="training in worker.training">{{training.expiry}}</li>
              </ul>
            </b-col>
          </b-row>
      </b-card>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      workers: [
        {
          name: 'John Smith',
          role: 'Project Manager',
          phone: '021 123 456',
          email: 'john.smith@stonewoodhomes.co.nz',
          training: [
            {
              description: 'Company Induction',
              date: '03/04/2017',
              expiry: '03/04/2018'
            },
            {
              description: 'Site Safe Passport',
              date: '15/05/2017',
              expiry: '15/05/2018'
            },
            {
              description: 'First Aid Certrificate',
              date: '12/04/2017',
              expiry: '12/04/2018'
            }
          ]
        },
        {
          name: 'Sam Stevens',
          role: 'Worker',
          phone: '021 111 222',
          email: 'sam.stevens@stonewoodhomes.co.nz',
          training: [
            {
              description: 'Company Induction',
              date: '03/04/2017',
              expiry: '03/04/2018'
            },
            {
              description: 'Site Safe Passport',
              date: '15/05/2017',
              expiry: '15/05/2018'
            },
            {
              description: 'First Aid Certrificate',
              date: '12/04/2017',
              expiry: '12/04/2018'
            }
          ]
        }
      ]
    }
  },
  methods: {
    newWorker () {
      this.workers.unshift({name: 'New Worker'})
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;;
  }
  
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
  
  .editBtn {
    float: right;
    background-color:rgba(223, 233, 255, 0.83);
    color: black;
  }
  
  .card-header.worker{
    background-color: rgba(111, 50, 130, 0.86);
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
  
  .workerCard > .card-body {
    padding: 0;
  }
  
  .row {
    margin:auto;
  }
  
  .col {
    padding: 0;
    min-width: 250px;
  }
  
  ul {
    list-style: none;
    padding-left: 15px;
    margin-top: 10px;
  }
  
</style>