<template>
  <b-container fluid>
     <b-card>
      <div class="card-header">Incident Management
      </div>
      <b-card class="itemCard mt-2 mb-4">
        <header class="card-header item">Incident Title</header>
      </b-card>
  </b-card>
  </b-container>
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
    margin-bottom: 100px;;
  }

  .card-header {
     margin: -20px -20px 20px -20px;
    background-color: rgba(29, 92, 158, 0.89);
    font-size: 1.4rem;
    color: white;
  }
  
   .card-header.item{
    background-color: rgba(155, 35, 53, 0.88);
    margin: 0;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }
  
    .itemCard > .card-body {
    padding: 0;
  }
  
</style>