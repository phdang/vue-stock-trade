<template>
  <div>
    <app-stock v-for="stock in stocks" :stock="stock"></app-stock>
  </div>
</template>

<script>
import Stock from './Stock.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    appStock: Stock
  },
  computed: {
    ...mapGetters('stocks', ['stocks']) //potential bugs !!!
  }
};
</script>

<style>
</style>
