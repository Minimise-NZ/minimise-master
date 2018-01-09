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
.btn {
  cursor: pointer;
}
.outside-container {
  padding-top: 20px;
}

.scroll-container {
  height: 765px;
  overflow: scroll;
  padding-bottom: 20px;
  padding-right: 10px;
  margin-top: 20px;
  overflow-x: hidden;
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

.alert-text {
  color: red;
}

.my-secondary-accent {
  color:#383838;
}

</style>
