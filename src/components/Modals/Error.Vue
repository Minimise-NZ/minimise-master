<template>
  <b-modal
    v-model="error" 
    v-if="error" 
    ok-only
    header-bg-variant="danger"
    headerTextVariant= 'light'
    title="Oops..">
    <div class="d-block text-center">
      <h4>{{errorMessage}}</h4>
    </div>
  </b-modal>
</template>
