<template>
    <div>
        <swiper
            :options="swiperOption"
            v-if="carouselImages.length > 1"
            :class="$style.swiper"
            class="product-carousel"
        >
            <swiper-slide v-for="(img, index) in carouselImages" :key="index">
                <img class="d-block" :src="img" :class="$style.swiper">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"/>
        </swiper>
        <img v-else-if="carouselImages.length > 0" class="d-block w-100" :src="carouselImages[0]">
    </div>
</template>

<script>
export default {
  name: 'ProductCarousel',
  props: {
    options: {
      type: Object,
      required: true,
    },
    singleImage: {
      type: String,
      required: true,
    },
    carouselImages: {
      type: Array,
      default: [],
    },
  },
}
</script>

