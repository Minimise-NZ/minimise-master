<template>
    <b-modal 
      v-model="confirmAction" 
      v-if="confirmAction" 
      @ok="closeJob()"
      @cancel="this.jobToClose = ''"
      centered 
      header-bg-variant="danger"
      headerTextVariant= 'light'
      title="Confirm Action">
      <div class="d-block text-center">
        <h4 class="mt-2">Are you sure you want to close <br>this job site?</h4>
        <br>
        <p>This will prevent any further activity on this job site</p>
        <p>This action cannot be undone</p>
      </div>
    </b-modal>
</template>
