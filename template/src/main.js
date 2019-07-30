/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
import './utils/publicpath';
import Vue from 'vue';
import getStore from './store';
import { EnvCheck } from './utils';
import { getVariable, VariableNames } from './config';
import App from './App.vue';
import router from './router';
// import './registerServiceWorker'; Uncomment for service worker

console.log(`Waffle Release v${getVariable(VariableNames.WaffleVersion)}`);
EnvCheck();
const store = getStore();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
