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
  height: 100vh;
}

.btn {
  cursor: pointer;
}

body.modal-open {
  padding-right: 0;
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

.alert-danger {
  margin-top:10px;
  padding: 5px;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.alert-border {
  border: 1px solid salmon;
}

.alert-text {
  color: red;
}

.my-secondary-accent {
  color:#383838;
}

.no-spinners {
  -moz-appearance:textfield;
}

.no-spinners::-webkit-outer-spin-button,
.no-spinners::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>
