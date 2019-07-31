<template>
  <transition name="slide-fade">
    <ProductInternal :data="product" />
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import { StoreDataNamespace } from '@/store/module/StoreData';
import { ProductInternal } from '@/extendables/ProductTypes';

export default {
  name: 'HomePage',
  components: {
    ProductInternal,
  },
  data() {
    return {
      product: null,
      productClass: null,
      productSlug: null,
    };
  },
  computed: {
    ...mapState(StoreDataNamespace, ['data']),
  },
  methods: {
    getProduct() {
      const productData = this.productClass === 'combo' ? this.data.bundles : this.data.products;
      this.product = productData.find(x => x.slug === this.productSlug);
      if (!this.product) this.$route.params.slug ? router.push('StoreHomePage') : router.push('DefaultHomePage');
    },
  },
  created() {
    const queryUrl = document.location.href.split('/');
    this.productClass = this.$route.params.slug ? queryUrl[0] : queryUrl[1];
    this.productSlug = this.$route.params.product_slug;
    this.getProduct();
  },
};
</script>
