<template>
  <b-container fluid class="outside-container">
    <b-card>
      <div class="card-header">Incident Reports</div>
      <div class="scroll-container">
        <b-row v-if="incidents.length === 0">
          <b-col>
            <header class="subheader">You have no open incident reports</header>
          </b-col>
        </b-row>
        <b-row class="subheader" v-if="incidents.length !== 0">
          <b-col>
            <p>Site Address</p>
          </b-col>
          <b-col>
            <p>Incident Type</p>
          </b-col>
          <b-col>
            <header>Reported By</header>
          </b-col>
          <b-col>
            <header>Date</header>
          </b-col>
          <b-col>
            <header>Status</header>
          </b-col>
        </b-row>
        <b-row v-for="incident in incidents" :key="incident.address" class="content">
          <b-col>
            <p style="text-decoration: underline; color: #178ac3; cursor: pointer"  @click="viewIncident(incident.id)">{{incident.address}}</p>
          </b-col>
          <b-col>
            <p>{{incident.type}}</p>
          </b-col>
          <b-col>
            <p>{{incident.reportedBy}}</p>
          </b-col>
          <b-col>
            <p>{{formattedDate(incident.date)}}</p>
          </b-col>
          <b-col>
            <p>{{status(incident.open)}}</p>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    incidents () {
      return this.$store.getters.incidents
    }
  },
  methods: {
    viewIncident (id) {
      let companyType = this.$store.getters.user.companyType
      this.$router.push('/' + companyType + '/incidents/incident/' + id)
    },
    status (open) {
      if (open === true) {
        return 'open'
      } else {
        return 'closed'
      }
    },
    formattedDate (date) {
      var d = new Date(date)
      return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/')
    }
  }
}
</script>

<style scoped>

  .card-header {
    margin: -20px -20px 0px -20px;
    background-color: #12807a;
    font-size: 1.4rem;
    color: white;
  }
  
  .subheader {
    padding: 10px 0 10px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color: #12807a;
  }
  
  .col {
    margin: 0;
    padding: 0;
  }
  
  .content {
    margin-left: 0;
    margin-top: 20px;
  }

</style>