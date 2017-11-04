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
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
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
  
.animated.fade-in.enter {
  transition-property: opacity;
  transition-duration: .25s;
}

</style>
