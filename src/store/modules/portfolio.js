const state = {
  funds: 10000,
  stocks: []
};

const getters = {
  stockPortfolio(state, getters, rootState) {
    return state.stocks.map(stock => {
      const record = rootState.stocks.stocks.find(el => el.id === stock.id);
      return {
        id: stock.id,
        quantity: stock.quantity,
        name: record.name,
        price: record.price
      };
    });
  },
  funds(state) {
    return state.funds;
  }
};

const mutations = {
  setPortfolio(state, portfolio) {
    state.funds = portfolio.funds;
    state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
  },
  buyStock(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find(el => el.id === stockId);
    if (record) {
      record.quantity += quantity;
    } else {
      state.stocks.push({
        id: stockId,
        quantity: quantity
      });
    }
    state.funds -= stockPrice * quantity;
  },
  sellStocks(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find(el => el.id === stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * quantity;
  }
};

const actions = {
  sellStocks: ({ commit }, order) => {
    commit('sellStocks', order);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
