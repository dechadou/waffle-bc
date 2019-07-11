import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/HomePage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'DefaultHomePage',
      component: HomePage,
    },
    {
      path: '/:slug',
      name: 'StoreHomePage',
      component: HomePage,
    },
    {
      path: '/producto/:id',
      name: 'DefaultProductPage',
      component: () => import(/* webpackChunkName: "DefaultProductPage" */ './views/ProductPage.vue'),
    },
    {
      path: '/:slug/producto/:id',
      name: 'StoreProductPage',
      component: () => import(/* webpackChunkName: "StoreProductPage" */ './views/ProductPage.vue'),
    },
  ],
});
