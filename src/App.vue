<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.my-primary-bg {
  background-color: #383838;
}

.my-secondary-bg {
  background-color: #FFC80B
}

.my-primary-accent {
  color:#FFC80B;
}

.my-secondary-accent {
  color:#383838;
}

</style>
