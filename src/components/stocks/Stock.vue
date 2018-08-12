<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>(Price: {{ stock.price }})</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
          class="form-control"
          :class="{danger: insufficientFunds}"
          min="0"
          type="number"
          v-model.number="quantity"
          placeholder="Quantity">
        </div>
        <div class="pull-right">
          <button
          class="btn btn-success"
          @click="buyStocks"
          :disabled="quantity <= 0 || insufficientFunds || !Number.isInteger(quantity)"
           >
           {{ insufficientFunds ? 'Insufficient' : 'Buy' }}</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    ...mapGetters('portfolio', ['funds', 'stockPortfolio']), //potential bugs !!!
    ...mapGetters('stocks', ['stocks']), //potential bugs !!!
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    }
  },

  methods: {
    ...mapActions(['putData']),
    ...mapActions('stocks', ['buyStock']),
    buyStocks() {
      const order = {
        stockId: this.stock.id,
        stockName: this.stock.name,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.buyStock(order);
      this.quantity = 0;

      const portfolio = {
        stockPortfolio: this.stockPortfolio,
        funds: this.funds
      };
      const data = {
        portfolio: portfolio,
        stocks: this.stocks
      };

      this.putData(data);
    }
  }
};
</script>

<style scoped>
.danger {
  border: 1px solid red;
}
</style>
