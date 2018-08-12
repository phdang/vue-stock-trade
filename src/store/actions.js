import Vue from 'vue';
export const loadData = ({ commit }) => {
  Vue.http
    .get('data.json')
    .then(res => res.json())
    .then(data => {
      if (data) {
        const stocks = data.stocks;
        const funds = data.funds;
        const stockPortfolio = data.stockPortfolio;
        const portfolio = {
          stockPortfolio: stockPortfolio,
          funds: funds
        };
        commit('stocks/setStocks', stocks); // may cause Bugs !!!
        commit('portfolio/setPortfolio', portfolio); // may cause Bugs !!!
      }
    });
};

export const putData = ({ commit }, data) => {
  commit('stocks/setStocks', data.stocks); // may cause Bugs !!!
  commit('portfolio/setPortfolio', data.portfolio); // may cause Bugs !!!
  const dataUpdate = {
    funds: data.portfolio.funds,
    stockPortfolio: data.portfolio.stockPortfolio,
    stocks: data.stocks
  };
  Vue.http.put('data.json', dataUpdate);
};
