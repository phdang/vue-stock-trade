<template>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">

      <router-link class="navbar-brand" to="/">Stock Trader</router-link>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <router-link activeClass="active" to="/portfolio" tag="li"><a>Portfolio</a></router-link>
        <router-link activeClass="active" to="/stocks" tag="li"><a>Stocks</a></router-link>
      </ul>
      <strong class="navbar-text navbar-right">Funds: {{ funds | currency }}</strong>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#" @click.prevent="endDay">End Day</a></li>
        <li
          class="dropdown"
         :class="{open: isDropdownOpen}"
         @click.prevent="isDropdownOpen = !isDropdownOpen"
         >
          <a
          href="#"
          class="dropdown-toggle"
          data-toggle="dropdown" role="button"
          aria-haspopup="true"
          aria-expanded="false">
          Save & Load <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#" @click.prevent="saveData">Save Data</a></li>
            <li><a href="#" @click.prevent="fetchData">Load Data</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- /.navbar-collapse -->
  </div>
  <!-- /.container-fluid -->
</nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isDropdownOpen: false
    };
  },

  computed: {
    ...mapGetters('portfolio', ['funds', 'stockPortfolio']), //potential bugs !!!
    ...mapGetters('stocks', ['stocks']) //potential bugs !!!
  },
  methods: {
    ...mapActions('stocks', ['randomizeStocks']), //potential bugs !!!
    ...mapActions(['loadData', 'putData']), //potential bugs !!!
    endDay() {
      this.randomizeStocks();
    },
    saveData() {
      const portfolio = {
        stockPortfolio: this.stockPortfolio,
        funds: this.funds
      };
      const data = {
        portfolio: portfolio,
        stocks: this.stocks
      };

      this.putData(data);
    },
    fetchData() {
      this.loadData();
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>
</style>
