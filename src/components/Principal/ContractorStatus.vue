<template>
  <b-col lg="7" md="6">
    <b-input-group>
      <b-form-input type="text" :value="contractor.name" readonly/>
        <b-input-group-button slot="right">
          <b-btn :class="{approved: approved}" class="miniBtn">{{status(contractor)}}</b-btn>
        </b-input-group-button>
    </b-input-group>
  </b-col>
</template>

<script>
export default {
  props: ['contractor'],
  data () {
    return {
      approved: false
    }
  },
  methods: {
    status (contractor) {
      if (contractor.approved === true) {
        this.approved = true
        return 'Approved'
      } else {
        return 'Pending'
      }
    }
  }
}
</script>

<style>
  .btn-secondary {
    background-color: rgba(155, 35, 53, 0.88);
  }

  .miniBtn {
    cursor: text;
    min-width: 100px;
  }

  .miniBtn:hover {
    background-color: rgba(155, 35, 53, 0.88);
  }

    .approved {
    background-color: green;
  }
</style>


