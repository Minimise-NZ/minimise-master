<template>
  <b-container fluid>
    <b-card header="Jobs in Progress" header-tag="header">
       <b-card
         v-for="site in sites"
         :key="site.address"
         class="siteCard mt-2 mb-4" 
         :header="site.address"
        >
        <b-row>
          <b-col>
            <header class="subheader">Approved Contractors</header>
            <ul>
              <li v-for="approved in site.approved">{{approved}}</li>
            </ul>
          </b-col>
          <b-col>
            <header class="subheader">Pending Contractors</header>
            <ul>
              <li v-for="pending in site.pending">{{pending}}</li>
            </ul>
          </b-col>
          <b-col> 
            <header class="subheader">Signed In</header>
            <ul v-for="contractor in site.signedIn">
              <li>{{contractor.name}}</li>
              <li>{{contractor.dateTime}}</li>
            </ul>
          </b-col>
          <b-col>
            <header class="subheader">Current Safety Plans</header>
            <ul>
              <li v-for="plan in site.plans">{{plan}}</li>
            </ul>
          </b-col>
        </b-row>
        <button style="float: right">Edit Job</button>
      </b-card>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      sites: [
        {
          address: '44 Centennial Avenue, Riccarton, Christchurch, 8041',
          pending: ['Leaky Pipes', 'Pete the Painter'],
          approved: ['Tim the Toolman', 'Upside Down Scaffold'],
          signedIn: [{
            name: 'Tim Thompson',
            dateTime: '16/12 08:15'
          }],
          plans: ['Tim Thompson 16/12']
        },
        {
          address: '187 Marine Parade, New Brighton, Christchurch 8083',
          pending: ['Leaky Pipes'],
          approved: ['Tim the Toolman', 'Pete the Painter'],
          signedIn: [{
            name: '',
            dateTime: ''
          }],
          plans: ['Pete Wilson 12/12']
        }
      ]
    }
  }
}
</script>

<style scoped>
  
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;;
  }
  
  .card {
    border: 1px solid grey;
  }
  
  .card-header {
    background-color: rgba(111, 50, 130, 0.86);
    font-size: 1.4rem;
    color: white;
  }
  
  .siteCard >.card-header {
    background-color: rgba(29, 92, 158, 0.89);
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }
  
  .subheader {
    padding: 10px 0 10px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color: black;
  }
  
  .siteCard > .card-body {
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