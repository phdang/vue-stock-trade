import stocks from '../../data/stocks';
const state = {
  stocks: []
};

const getters = {
  stocks: state => {
    return state.stocks;
  }
};

const mutations = {
  setStocks(state, stocks) {
    state.stocks = stocks;
  },
  rndStocks(state) {
    state.stocks.forEach(stock => {
      if (stock.price < 25) {
        stock.price = Math.round(stock.price * (1 + Math.random()));
      } else {
        stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
      }
    });
  }
};
const actions = {
  buyStock: ({ commit }, order) => {
    commit('portfolio/buyStock', order, { root: true }); //potential bugs
  },
  initStocks: ({ commit }) => {
    commit('setStocks', stocks);
  },
  randomizeStocks: ({ commit }) => {
    commit('rndStocks');
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
