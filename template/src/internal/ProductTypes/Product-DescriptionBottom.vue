<template>
  <article class="product" v-if="price !== null">
    <div class="row">
      <!-- IMAGE -->
      <div class="col-12">
        <div class="badge-free-shipping" v-if="data.envio_gratuito"/>
        <LazyImage
          v-if="singleImage.type === 'image'"
          :source="singleImage.url"
          cssClasses="img-fluid mx-auto d-block"
          :description="`${data.title} image`"
        />
      </div>

      <!-- DESCRIPTION -->
      <div class="col-12 description">
        <!-- TITLE, PRICE, DESCRIPTION -->
        <div class="title_price_block row">
          <div :class="{'col-9': !fakePrice, 'col-8': fakePrice}">
            <h1 class="title">{{ data.name }}</h1>
          </div>
          <div class="col-3 pl-0 price-container" :class="{'col-3': !fakePrice, 'col-4': fakePrice}">
            <span class="price">
              <span>{{ currencySymbol }}</span>
              {{ price }}
            </span>
            <span class="price old-price" v-if="fakePrice">
              <span>{{ currencySymbol }}</span>
              {{ fakePrice }}
            </span>

          </div>
          <div class="col-12 col-md-11">
            <p v-html="data.description"></p>
          </div>
        </div>
        <!-- /TITLE, PRICE, DESCRIPTION -->

        <div class="button_container">
          <component
            class="addToCartButton"
            :is="getButtonType()"
            :slug="data.slug"
            :id="productId"
            :productClass="productClass"
            :image="singleImage.url"
          />
        </div>
      </div>
      <!-- /DESCRIPTION -->
    </div>
  </article>
</template>

<script>
import { LazyImage, ProductType } from '@/extendables/BaseComponents';

// @group PRODUCT TYPES
// Shows the product with it's description at the bottom
// @vuese
export default {
  name: 'Product-DescriptionBottom',
  extends: ProductType,
  components: {
    LazyImage,
  },
  methods: {
    getButtonType() {
      if (this.data.class === 'product' && this.articleList.length > 1) {
        return 'Select';
      }

      if (this.isOutOfStock) {
        return 'OutOfStock';
      }

      if (!this.openModules) return 'Check';

      return 'Normal';
    },
  },
};
</script>

<style lang="scss" scoped>
article {
  margin-bottom: 30px;
}

h1 {
  font-family: $titles-font;
  font-weight: $titles-font-weight;
  font-size: 26px;
  color: $titles-color;
  line-height: 1;
  @include md-up {
    font-size: 22px;
  }
}

.button_container {
  margin-top: 20px;
  width: 100%;
}

p {
  font-size: 22px;

  span {
    color: $abre-description-grey;
  }

  @include md-up {
    font-size: 16px;
  }
}

.price {
  float: right;
  font-size: 18px;
  margin-top: 3px;
  font-weight: $titles-font-weight;
  font-family: $titles-font;
  color: $titles-color;
  width: 100%;
  text-align: right;

  span {
    font-size: 12px;
    margin-right: 5px;
  }

  @include md-up {
    font-size: 16px;
  }

  &.old-price{
    margin-left: 5px !important;
    color: #c1c1c1 !important;
    text-decoration: line-through;

    span {
      font-size: 18px !important;
      margin-right: 0 !important;
      color: #c1c1c1 !important;
      text-decoration: line-through;

      @include lg-up {
        font-size: 14px !important;
      }
    }
  }
}

.badge-free-shipping {
  right: 0;
}
</style>
