<template>
  <div
    id="ProductDisplayer-Recommended"
    v-if="home_product_type !== 'thumbnail' && products.length > 0"
  >
    <div class="row">
      <div class="col-12 col-md-3">
        <h3>
          Aprovechá
          <br class="d-none d-md-block">el envío
          <br class="d-block d-md-none">y agregá
          <br class="d-none d-md-block">a tu pedido:
        </h3>
      </div>
      <div class="col-md-9 d-none d-md-block">
        <div class="row">
          <div v-for="product in products" :key="`${product.id}-${product.class}`" class="col-4">
            <Product-DescriptionBottom :data="product"/>
          </div>
        </div>
      </div>
    </div>

    <swiper :options="swiperOption" class="d-block d-md-none">
      <swiper-slide v-for="product in products" :key="`${product.id}-${product.class}`">
        <Product-SliderMobile :data="product"/>
      </swiper-slide>
      <div class="slider-button-prev" slot="button-prev"></div>
      <div class="slider-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";

import { ProductDisplayerType } from "@/extendables/BaseComponents";
import "swiper/dist/css/swiper.css";

export default {
  name: "ProductDisplayer-Recommended",
  extends: ProductDisplayerType,
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.8,
        centeredSlides: true,
        initialSlide: 1,
        spaceBetween: -30,
        navigation: {
          nextEl: ".slider-button-next",
          prevEl: ".slider-button-prev"
        }
      }
    };
  }
};
</script>

<style lang="scss">
.swiper-container {
  padding: 0 10%;
  margin: 0 -15px;
  @media (min-width: 768px) {
    padding: 0;
  }
}
.swiper-slide .product {
  .description {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.1s ease;
    @media (min-width: 768px) {
      visibility: visible;
      opacity: 1;
    }
  }
  p.authors {
    text-align: center;
    font-size: 18px;
  }
}
.swiper-slide.swiper-slide-active .product {
  .description {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.5s ease;
  }
}
.swiper-slide .product .image_wrap img {
  transition: all 0.5s ease;
}
.swiper-slide .product .image__wrapper.loaded img {
  position: relative;
  top: 0;
  left: 0;
  filter: blur(2px);
  opacity: 0.8;
  @include md-up {
    filter: none;
    opacity: 1;
  }
}
.swiper-slide-active .product .image__wrapper.loaded img {
  max-width: 120%;
  width: 120% !important;
  z-index: 21;
  top: -5vw;
  left: -10%;
  transition: all 0.5s ease;
  filter: none;
  opacity: 1;
  @include md-up {
    max-width: 100%;
    width: 100% !important;
    z-index: 1;
    top: 0;
    left: 0;
  }
}
</style>

<style scoped lang="scss">
#ProductDisplayer-Recommended {
  margin: 50px -15px;
  overflow: hidden;
  @include md-up {
    overflow: visible;
    margin: 50px 0;
  }
}
h3 {
  font-size: 24px;
  font-family: $font-regular;
  color: $abre_dark_grey;
  text-align: center;
  margin-bottom: 30px;
  @include md-up {
    text-align: left;
  }
}

.slider-button-prev,
.slider-button-next {
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 10;
  cursor: pointer;
  background-size: 27px 44px;
  background-position: center;
  background-repeat: no-repeat;
  outline: none;
  @include md-up {
    display: none;
  }
}

.slider-button-prev {
  left: 10px;
  width: 20%;
  right: auto;
}

.slider-button-next {
  right: 10px;
  width: 15%;
  left: auto;
}
</style>
