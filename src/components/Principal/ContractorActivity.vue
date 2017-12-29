<template>
  <b-card
   header="Contractor Activity" 
   header-tag="header">
    <b-row class="subheader">
      <b-col sm="3">
        <header>Site Address</header>
      </b-col>
      <b-col sm="9">
        <header>Description</header>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    padding-top: 20px;
    margin-bottom: 100px;
  }
  
  .card {
    border: 1px solid rgba(29, 92, 158, 0.89);
    margin-bottom: 30px;
  }
  
  .card-header {
    background-color: rgba(29, 92, 158, 0.89);
    font-size: 1.2rem;
    color: white;
  }
  
  .card-body {
    padding-top: 0;
  }
  
  .subheader {
    padding: 15px 0 15px 15px;
    border-bottom: 1px solid lightgrey;
    font-weight: bold;
    color:#1376ad;
  }
  
  .col-sm-3 {
    margin: 0;
    padding: 0;
  }
  
  .content {
    margin-left: 0;
    margin-top: 20px;
  }
  
   ul {
    list-style: none;
    padding-left: 0;
  }
</style>