<template>
  <div id="container">
    <div class="container">
    <!--corner branding-->
     <router-link to="/" style="text-decoration: none">
        <div class="row brand">
          <div class="logo">
            <img src='../../assets/yellow-mini.png'>
            <span class="my-primary-accent" style="margin-left: 10px">minimise</span>
          </div>
        </div>
      </router-link>
    
    <!--form container-->
      <div class="form-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
    }
  }
  
</script>

<style scoped>
  #container {
    /*
    height: 100vh;
    background-image: url(../../assets/grey-background.jpg);
    background-size: 100% 100%;
    min-height: 780px;
    */
    background: rgb(56,56,56); /* Old browsers */
    background: -moz-linear-gradient(top, rgba(56, 56, 56, 1) 0%, rgba(125,126,125,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(56, 56, 56, 1) 0%,rgba(125,126,125,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(56, 56, 56, 1) 0%,rgba(125,126,125,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#383838', endColorstr='#7d7e7d',GradientType=0 ); /* IE6-9 */
    height: 100%;
    min-height: 940px;
    margin: 30px 50px;
  }
  
  .brand {
    padding-left: 6%;
    padding-top: 80px;
    font-size: 2rem;
  }
  
  .form-container {
    max-width: 400px;
    margin: 50px auto 50px auto;
  }
  
  
  @media only screen and (min-width: 1000px) {
    .brand {
      padding-left: 25%;
    }
  }
</style>