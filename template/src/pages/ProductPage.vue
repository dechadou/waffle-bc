<template>
  <transition name="slide-fade">
    <div>
      <a class="go-back" @click="goBack()" href="#">
        <Icon class="arrow-left-button" name="arrow-left"/>
        <span>Volver a Tienda</span>
      </a>
      <ProductInternal :data="product"/>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import { Icon } from '@/extendables/BaseComponents';
import { StoreDataNamespace } from '@/store/module/StoreData';
import { ProductInternal } from '@/extendables/ProductTypes';

export default {
  name: 'ProductPage',
  components: {
    ProductInternal,
    Icon,
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
      if (!this.product) window.location = `/${this.$route.params.slug || ''}`;
    },
    goBack() {
      window.location = `/${this.$route.params.slug || ''}`;
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
