<template>
  <b-container fluid>
     <b-card>
      <div class="card-header">Administration
      </div>
      <b-card class="itemCard mt-2 mb-4">
        <header class="card-header item">Subtitle</header>
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
    margin-bottom: 100px;
    padding-right: 30px;
  }

  .card-header {
    margin: -20px -20px 20px -20px;
    background-color: rgba(155, 35, 53, 0.88);
    font-size: 1.4rem;
    color: white;
  }
  
   .card-header.item{
    background-color: #12807a;
    margin: 0;
    color: white;
    font-size: 1.2rem;
    padding-left: 15px;
  }
  
    .itemCard > .card-body {
    padding: 0;
  }
  
</style>