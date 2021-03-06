<template>
  <article class="product" v-if="price !== null">
    <div class="col-12">
      <div class="row">
        <!-- IMAGE -->
        <div class="col-12 p-0">
          <router-link :to="internalLink">
            <span class="sr-only">{{ data.name }}</span>
            <LazyImage
              v-if="singleImage.type === 'image'"
              :source="singleImage.url"
              cssClasses="img-fluid mx-auto d-block"
              :description="`${data.name} image`"
            />
          </router-link>
        </div>

        <!-- DESCRIPTION -->
        <div class="col-12 description">
          <router-link :to="internalLink">
            <!-- TITLE AND PRICE -->
            <div class="title_price_block">
              <div class="row">
                <div :class="{'col-9': !fakePrice, 'col-7 col-lg-8': fakePrice}">
                  <h3 class="title">{{ data.name }}</h3>
                </div>
                <div class="pl-0 price-container" :class="{'col-3': !fakePrice, 'col-5 col-lg-4': fakePrice}">
                  <span class="price">
                    <span>{{ currencySymbol }}</span>
                    {{ price }}
                  </span>
                  <span class="price old-price" v-if="fakePrice">
                    <span>{{ currencySymbol }}</span>
                    {{ fakePrice }}
                  </span>
                </div>
              </div>

              <!-- AUTHORS -->
              <div class="row">
                <div class="col-12">
                  <p class="authors">{{ data.autor }}</p>
                </div>
              </div>
              <!-- /AUTHORS -->
            </div>
            <!-- /TITLE AND PRICE -->
          </router-link>

          <div class="button_container">
            <component
              class="addToCartButton"
              :is="getButtonType()"
              :link="internalLink"
              :id="productId"
              :productClass="productClass"
              :image="singleImage.url"
            />
          </div>
        </div>
        <!-- /DESCRIPTION -->
      </div>
    </div>
  </article>
</template>

<script>
import { LazyImage, ProductType } from '@/extendables/BaseComponents';

// @group PRODUCT TYPES
// Shows the product thumbnail on the Marketplace theme
// @vuese
export default {
  name: 'Product-Thumbnail',
  extends: ProductType,
  components: {
    LazyImage,
  },
  methods: {
    getButtonType() {
      if (this.data.class === 'product' && this.articleList.length > 1) {
        return 'Select';
      }
      if (this.isOutOfStock) return 'OutOfStock';

      if (!this.openModules) return 'Check';

      return 'Normal';
    },
  },
};
</script>


<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.product {
  margin-bottom: 20vw;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
    &:focus {
      text-decoration: none;
    }
  }

  @include lg-up {
    margin-bottom: 30px;
    transition: background-color 0.25s ease-out;
  }

  .title {
    @include md-up {
      height: 62px;
      font-size: 32px;
    }
  }
  p {
    font-size: 22px;
    @include md-up {
      font-size: 20px;
    }
    &.authors {
      color: #b0b0b0;
      font-size: 5vw;
      margin-top: 0;
      @include md-up {
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .price-container {
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 0) 0%,
      rgba(255, 255, 255, 1) 17%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  span {
    margin: 0;
    display: inline-block;
    color: $abre-black;
    font-size: 19px;
    @include md-up {
      font-size: 18px;
    }
    &.price {
      float: right;
      font-size: 18px;
      margin-top: 3px;
      font-family: $font-light;
      font-weight: $titles-font-weight;
      color: $titles-color;
      margin-left: 5px;

      span {
        font-size: 14px;
        margin-right: 5px;
      }
      @include md-up {
        margin-top: 10px;
      }

      &.old-price{
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
  }
  .image_wrap {
    display: block;
    padding-top: 100%;
    position: relative;
    overflow: hidden;

    @include lg-up {
      background: transparent;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: auto !important;
      z-index: 20;

      &.product-badge {
        position: absolute;
        top: 0;
        right: 0;
        left: unset;
        width: 144px !important;
      }
    }
    .fa_icon {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -25px;
      margin-top: -25px;
      color: #000;
      z-index: -1;
    }
  }
  .title_price_block {
    margin-top: 5px;
    margin-bottom: 0;
  }

  .button_container {
    float: left;
    width: 100%;
    @include md-up {
      .button_container {
        padding: 0;
      }
    }
  }

  // new css - had no time to clean

  .new_row {
    @include lg-up {
      margin: 0 !important;
    }
  }

  .new_col_12 {
    @include lg-up {
      padding: 0 !important;
    }
  }

  .title {
    font-weight: $titles-font-weight;
    color: $titles-color;
    font-family: $font-light;
    font-size: 6.133333333vw;
    width: 75vw;
    margin: 0;
    @include md-up {
      font-size: 26px;
      width: auto;
      height: auto !important;
    }
    @include lg-up {
      font-size: 18px !important;
      white-space: nowrap;
    }
  }

  .authors {
    font-size: 4.533333333vw;
    @include lg-up {
      margin: 0 !important;
      color: $abre-black !important;
      font-size: 14px !important;
    }
  }

  .price {
    @include lg-up {
      line-height: 1.75;
      margin: 0 !important;
      margin-left: 5px !important;
      color: $titles-color !important;
      font-size: 14px !important;
    }

    span {
      @include lg-up {
        margin: 0 0.3vw 0 0 !important;
        color: $titles-color !important;
        font-size: 10px !important;
      }
    }
  }

  .title_price_block {
    @include lg-up {
      transition: opacity 0.25s ease-out, visibility 0.25s ease-out;
    }
  }

  .description {
    overflow: hidden;
    padding: 0 !important;
    @include lg-up {
      height: 45px;
    }
  }

  .addToCartButton {
    @include lg-up {
      position: absolute;
      left: 0;
      bottom: 0;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease-out, visibility 0.25s;
    }
  }

  // type product
  &.type_product {
    @include lg-up {
      max-width: 31.62393162% !important;
      flex: 0 0 31.62393162% !important;
    }

    .image_wrap {
      @include lg-up {
        padding-top: 100% !important;
      }

      img {
        @include lg-up {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain;
        }
      }
    }
  }

  // type bundle
  &.type_bundle {
    @include lg-up {
      // height: 30.74670571vw;
      max-width: 48.71794872% !important;
      flex: 0 0 48.71794872% !important;
    }

    .image_wrap {
      @include lg-up {
        padding-top: 64.9122807% !important;
      }

      img {
        @include lg-up {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain;
        }
      }
    }
  }

  &:hover {
    @include lg-up {
      background: $abre-light-grey;
    }

    .addToCartButton {
      @include lg-up {
        opacity: 1;
        visibility: visible;
      }
    }

    .title_price_block {
      @include lg-up {
        opacity: 0;
        visibility: hidden;
      }
    }
  }
}
</style>
