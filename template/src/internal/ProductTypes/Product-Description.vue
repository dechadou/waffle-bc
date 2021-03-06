<template>
  <article class="product" v-if="price !== null">
    <div class="row">
      <!-- IMAGE -->
      <div class="col-12 col-md-6">
        <div class="badge-free-shipping" v-if="data.envio_gratuito"/>
        <LazyImage
          v-if="singleImage.type === 'image'"
          :source="singleImage.url"
          cssClasses="img-fluid mx-auto d-block"
          :description="`${data.title} image`"
        />
        <iframe class="videoImage" v-else-if="singleImage.type === 'video'" width="100%" height="500" :src="getVideoLink(singleImage.url)" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
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
// Shows the product with it's description on the right
// @vuese
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

      if (!this.openModules) return 'Check';

      return 'Normal';
    },
    getVideoLink(url) {
      const splitUrl = url.split('/');
      return `https://www.youtube.com/embed/${splitUrl[splitUrl.findIndex(x => x === 'media') + 1]}`;
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
    font-size: 32px;
  }
}

.description {
  @include lg-up {
    margin-top: 10%;
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
  font-size: 19px;
  margin-top: 10px;

  span {
    color: $abre-description-grey;
  }

  @include md-up {
    margin-top: 19px;
  }
}

.price {
  font-size: 18px;
  margin-top: 3px;
  font-weight: $titles-font-weight;
  font-family: $titles-font;
  color: $titles-color;
  display: block;
  width: 100%;
  text-align: right;

  span {
    font-size: 14px;
    margin-right: 5px;
  }

  @include md-up {
    margin-top: 10px;
  }

  &.old-price{
    margin-top: 0;
    color: #c1c1c1 !important;
    text-decoration: line-through;

    span {
      font-size: 18px !important;
      margin-right: 0 !important;
      color: #c1c1c1 !important;
      text-decoration: line-through;
    }
  }
}

.badge-free-shipping {
  right: 20px;
  @include md-up {
    right: 20%;
    top: 10%;
  }
}

.videoImage{
  padding: 50px 0;
  @include md-up {
    padding: 50px;
  }
}
</style>
