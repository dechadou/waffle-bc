<template>
  <div class="ProductDisplayer-Slider">
    <swiper :options="sliderOptions">
      <swiper-slide v-for="product in products" :key="`${product.id}-${product.class}`">
        <Product-SliderMobile :data="product"/>
      </swiper-slide>
      <div class="slider-button-prev" slot="button-prev"></div>
      <div class="slider-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'swiper/dist/css/swiper.css';
import { ProductDisplayerType } from '@/extendables/BaseComponents';

// @group PRODUCTDISPLAYER TYPES
// Displays a slider of products
// @vuese
export default {
  name: 'ProductDisplayer-Slider',
  extends: ProductDisplayerType,
  props: {
    // The slider options. There is a default object.
    sliderOptions: {
      type: Object,
      default: () => ({
        slidesPerView: 1.8,
        centeredSlides: true,
        initialSlide: 1,
        spaceBetween: -30,
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        },
      }),
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
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
    transition: opacity 0.3s ease;
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
    transition: opacity 0.3s ease;
    transition-delay: 0.3s
  }
}
.swiper-slide .product .image_wrap img {
  transition: all 0.5s ease;
}
.swiper-slide .product .image__wrapper.loaded img {
  position: relative;
  filter: blur(2px);
  opacity: 0.8;
  @include md-up {
    filter: none;
    opacity: 1;
  }
}
.product .image__wrapper.loaded img {
  transform: scale(1);
  transition: transform 0.5s ease;
  transform-origin: center;
}
.swiper-slide-active .product .image__wrapper.loaded img {
  transform: scale(1.1);
  transition: transform 0.5s ease;
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
