/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
import './utils/publicpath';
import Vue from 'vue';
import VueGtm from 'vue-gtm';
import getStore from './store';
import { EnvCheck } from './utils';
import { getVariable, VariableNames } from './config';
import App from './App.vue';
import router from './router';
// import './registerServiceWorker'; Uncomment for service worker

// Logs waffle version on console
console.log(`Waffle Release v${getVariable(VariableNames.WaffleVersion)}`);

// Checks if user is trying to load another environment on production and asks for password
EnvCheck();

// Loads vuex
const store = getStore();

Vue.use(VueGtm, {
  id: 'GTM-NLPFLCD',
  debug: true, // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
