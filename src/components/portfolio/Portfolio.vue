<template>
  <div>
    <app-stock v-for="stock in stockPortfolio" :stock="stock"></app-stock>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from './Stock.vue';
export default {
  computed: {
    ...mapGetters('portfolio', ['stockPortfolio']) //potential bugs
  },
  components: {
    appStock: Stock
  }
};
</script>

<style>
</style>
