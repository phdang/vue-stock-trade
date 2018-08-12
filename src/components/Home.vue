<template>
  <div>
    <h1>Trade or View your Portfolio</h1>
    <h6>You may save & Load your Data</h6>
    <hr>
    <p>Your funds: : {{ funds | currency }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('portfolio', ['funds']) //potential bugs
  }
};
</script>

<style>
</style>
