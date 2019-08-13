import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './pages/HomePage.vue';

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
      path: '/producto/:product_slug',
      name: 'DefaultProductPage',
      component: () => import(/* webpackChunkName: "DefaultProductPage" */ './pages/ProductPage.vue'),
    },
    {
      path: '/combo/:product_slug',
      name: 'DefaultBundlePage',
      component: () => import(/* webpackChunkName: "DefaultProductPage" */ './pages/ProductPage.vue'),
    },
    {
      path: '/:slug/producto/:product_slug',
      name: 'StoreProductPage',
      component: () => import(/* webpackChunkName: "StoreProductPage" */ './pages/ProductPage.vue'),
    },
    {
      path: '/:slug/combo/:product_slug',
      name: 'StoreBundlePage',
      component: () => import(/* webpackChunkName: "StoreProductPage" */ './pages/ProductPage.vue'),
    },
  ],
});
