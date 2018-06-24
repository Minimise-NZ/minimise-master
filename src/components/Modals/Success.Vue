<template>
  <b-modal 
    v-model="success" 
    v-if="success"
    ok-only
    centered 
    header-bg-variant="primary"
    headerTextVariant= 'light'
    title="Success">
    <div class="d-block text-center">
      <h4 class="mt-2">{{job.address}}</h4>
      <p>This job has been closed</p>
    </div>
  </b-modal>
</template>
