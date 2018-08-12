
<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
          class="form-control"
          :class="{ danger: insufficientQuantity }"
          min="0"
          type="number" v-model.number="quantity"
          placeholder="Quantity">
        </div>
        <div class="pull-right">
          <button
          class="btn btn-success"
          @click="sellStock(stock.quantity)"
          :disabled="quantity <= 0 || insufficientQuantity || !Number.isInteger(quantity)"
           >
           {{ insufficientQuantity ? 'Not enough' : 'Sell' }}</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
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
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    }
  },
  methods: {
    ...mapActions('portfolio', ['sellStocks']), //potential bugs
    ...mapActions(['putData']),
    sellStock(quantity) {
      const order = {
        stockId: this.stock.id,
        stockName: this.stock.name,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.sellStocks(order);
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
