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

body {
  font-size: 0.9em;
}

.form-control {
  font-size: 0.9em;
}

.btn {
  cursor: pointer;
}

body.modal-open {
  padding-right: 0;
}

.scroll-container {
  height: 80vh;
  overflow: scroll;
  padding-bottom: 20px;
  padding-right: 10px;
  margin-top: 10px;
  overflow-x: hidden;
}

.card-header {
  background-color: rgba(56, 56, 56, 0.88);
  font-size: 1.2em;
  color: white;
}

.addBtn {
  float: right;
  background-color: #067cfb;
  color: white;
  border: none;
}

.addBtn:hover {
  background-color:#ffc80b;
  color: black;
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


@media (max-width: 1200px) {
  body {
    font-size: 0.9em;
    line-height: 1.0;
  }
}

</style>
