<template>
  <b-container fluid class="outside-container">
    <b-card>
      <div class="card-header">Incident Reports</div>
      <b-row class="subheader">
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
          <b-row v-for="incident in incidents" :key="incident.address">
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
      this.$router.push('/' + companyType + '/incident/' + id)
    },
    status (open) {
      if (open === true) {
        return 'open'
      } else {
        return 'closed'
      }
    },
    formattedDate (incidentDate) {
      let newdate = incidentDate.toString().slice(0, 15)
      return newdate
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
  margin-top: 15px;
  border-bottom: 1px solid lightgrey;
  font-weight: bold;
  color: #12807a;
}

.row {
  margin-top: 15px;
}

</style>