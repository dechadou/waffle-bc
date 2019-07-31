<template>
  <article class="product">
    <div class="row">
      <!-- IMAGE -->
      <div class="col-12 col-md-7">
        <LazyImage
          :source="singleImage"
          cssClasses="img-fluid mx-auto d-block"
          :description="`${data.title} image`"
        />
      </div>

      <!-- DESCRIPTION -->
      <div class="col-12 col-md-5 description">
        <!-- TITLE, PRICE, DESCRIPTION -->
        <div class="title_price_block row">
          <div class="col-9">
            <h1 class="title">{{ data.name }}</h1>
          </div>
          <div class="col-3 pl-0 price-container">
            <span class="price">
              <span>$</span>
              {{ price }}
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
            :image="singleImage"
          />
        </div>
      </div>
      <!-- /DESCRIPTION -->
    </div>
  </article>
</template>

<script>
import { LazyImage, ProductType } from '@/extendables/BaseComponents';

export default {
  name: 'Product-Description',
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
  font-family: "Founders_Grotesk_Regular", sans-serif;
  font-weight: 400;
  font-size: 26px;
  color: $abre-dark-grey;
  line-height: 1;
  @include md-up {
    font-size: 32px;
  }
}

.description {
  @include md-up {
    margin-top: 70px;
  }
  @include lg-up {
    margin-top: 140px;
  }
}

.button_container {
  margin-top: 20px;
  width: 100%;
  @include md-up {
    width: 250px;
  }
}

p {
  font-size: 22px;

  span {
    color: $abre-description-grey;
  }

  @include md-up {
    font-size: 20px;
  }
}

.price {
  float: right;
  font-size: 18px;
  margin-top: 3px;
  font-weight: 400;
  font-family: "Founders_Grotesk_Regular", sans-serif;

  span {
    font-size: 14px;
    margin-right: 5px;
  }

  @include md-up {
    margin-top: 10px;
  }
}
</style>
