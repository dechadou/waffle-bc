<template>
  <transition name="slide-fade">
    <!--<section id="shop" class="internal" v-if="isLoaded">
      <HeaderSection/>
      <cart/>
      <product :type="'internal'" :data="prod"/>
      <FeedbackSection/>
      <RelatedProducts :products="product"/>
      <FooterSection/>
    </section>-->
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { StoreDataActionTypes, StoreDataGetterTypes } from '../store/module/StoreData';

export default {
  name: 'ProductPage',
  data() {
    return {
      prod: null,
    };
  },
  computed: {
    ...mapGetters({
      product: StoreDataGetterTypes.GET_PRODUCTS,
      bundle: StoreDataGetterTypes.GET_BUNDLES,
      isLoaded: StoreDataGetterTypes.IS_LOADED,
    }),
  },
  created() {
    this.fetchProducts();
    if (this.isLoaded) this.getProduct();
  },
  watch: {
    isLoaded(value) {
      if (value) this.getProduct();
    },
    '$route.params.slug'(to, from) {
      this.getProduct();
    },
  },
  methods: {
    ...mapActions({
      fetchProducts: ProductsActionTypes.FETCH_PRODUCTS,
    }),
    getProduct() {
      [this.prod] = this.product.filter(product => product.slug === this.$route.params.slug);
      if (!this.prod) this.$route.push('/');
    },
  },
};
</script>
