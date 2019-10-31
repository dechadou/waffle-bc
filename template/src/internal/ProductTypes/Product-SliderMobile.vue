<template>
  <article class="product">
    <div class="row">
      <!-- IMAGE -->
      <div class="col-12">
        <div class="badge-free-shipping" v-if="data.envio_gratuito"/>
        <LazyImage
          v-if="singleImage.type === 'image'"
          :source="singleImage.url"
          cssClasses="img-fluid mx-auto d-block position-relative"
          :description="`${data.title} image`"
        />
      </div>

      <!-- DESCRIPTION -->
      <div class="col-12 description">
        <!-- TITLE, PRICE, DESCRIPTION -->
        <div class="title_price_block">
          <h1 class="title">
            {{ data.name }}
            &nbsp;•&nbsp;
            <span class="price">
              <span>$</span>
              {{ price }}
            </span>
          </h1>
          <p class="authors">{{ data.autor }}</p>
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
import { LazyImage, ProductType } from "@/extendables/BaseComponents";

// @group PRODUCT TYPES
// Shows the product the way it was designed for the ProductSlider
// @vuese
export default {
  name: "Product-SliderMobile",
  extends: ProductType,
  components: {
    LazyImage
  },
  methods: {
    getButtonType() {
      if (this.data.class === "product" && this.articleList.length > 1) {
        return "Select";
      }

      if (this.isOutOfStock) {
        return "OutOfStock";
      }

      return "Check";
    }
  }
};
</script>

<style lang="scss" scoped>
article {
  margin-bottom: 30px;
}

h1 {
  font-family: $titles-font;
  font-weight: $titles-font-weight;
  font-size: 18px;
  text-align: center;
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

  &.authors {
    color: #b0b0b0;
    font-size: 16px;
    margin-top: 0;
  }

  @include md-up {
    font-size: 16px;
  }
}

.price span {
  font-size: 12px;
}

.description {
  margin-top: -18%;
  position: relative;
}

.badge-free-shipping {
  right: 0;
  z-index: 22;
}
</style>
