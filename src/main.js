import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { routes } from './routes';
import store from './store/store';
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'https://vuejs-http-17bef.firebaseio.com/';
Vue.filter('currency', value => {
  return '$' + value.toLocaleString();
});

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
