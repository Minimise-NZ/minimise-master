<template>
  <b-modal 
    @ok="next" 
    ok-only 
    centered 
    header-bg-variant="info"
    headerTextVariant= 'light'
    title="Success">
    <div class="d-block text-center">
      <h4 >{{message}}}/h4>
    </div>
  </b-modal>
</template>
