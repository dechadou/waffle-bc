<template>
  <transition name="slide-fade">
    <div>
      <a class="go-back" @click="goBack()" href="#">
        <ArrowLeftIcon class="arrow-left-button" />
        <span>Volver a Tienda</span>
      </a>
      <ProductInternal :data="product" />
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { StoreDataNamespace } from '@/store/module/StoreData';
import { ProductInternal } from '@/extendables/ProductTypes';

// @group PAGES
// This page is the extended view of a product or bundle.
export default {
  name: 'ProductPage',
  components: {
    ProductInternal,
    ArrowLeftIcon,
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
    /**
     * @vuese
     * Finds the product/bundle data by the slug indicated on the router params
     */
    getProduct() {
      let productData = null;
      if (this.productClass === 'bundle') {
        productData = this.data.bundles;
        this.product = productData.find(x => x.id === +this.productSlug);
      } else {
        productData = this.data.products;
        this.product = productData.find(x => x.slug === this.productSlug);
      }

      if (!this.product) window.location = `/${this.$route.params.slug || ''}`;
    },
    /**
     * @vuese
     * Redirects to the homepage
     */
    goBack() {
      window.location = `/${this.$route.params.slug || ''}`;
    },
  },
  created() {
    this.productClass = this.$route.name === 'DefaultBundlePage' ? 'bundle' : 'product';
    this.productSlug = this.$route.params.product_slug;
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>
.go-back {
  font-size: 16px;
  position: fixed;
  z-index: 30;
  left: 3%;

  @include lg-up {
    left: unset;
    right: 55%;
    top: 22px;
  }
  span {
    display: none;
    position: relative;
    bottom: 29px;
    left: 40px;
    @include lg-up {
      display: block;
    }
  }

  .arrow-left-button {
    width: 50px;
    height: 50px;
    @include lg-up {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
