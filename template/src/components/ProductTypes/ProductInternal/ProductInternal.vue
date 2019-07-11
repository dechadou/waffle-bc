<style src="./ProductInternal.scss" module lang="scss"></style>
<script src="./ProductInternal.js"></script>

<template>
  <div>
    <article :id="$style.producto" class="product">
        <div class="row">
          <div class="col-12 col-md-6">
            <swiper
              :options="swiperOption"
              v-if="carouselImages.length > 1"
              :class="$style.swiper"
              class="product-carousel"
            >
              <swiper-slide v-for="(img, index) in carouselImages" :key="index">
                <img class="d-block" :src="img" :class="$style.swiper">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <img v-else class="d-block w-100" :src="image">
          </div>

          <div class="col-md-6" :class="$style.descriptionBox">
            <div :class="$style.containerXs">
            <div class="row">
              <div class="col-8 pr-0">
                <h1>{{ name }}</h1>
                <p :class="$style.authors">{{ agentsActors | displayAuthors }}</p>
              </div>
              <div class="col-4 pl-0">
                <span class="price float-right">
                  <span>$</span>
                  {{ price }}
                </span>
              </div>
            </div>
            <!-- Product Description -->
            <p v-html="description"></p>

            <ul :class="$style.additionalInfo" v-if="additionalInformation.length > 0">
              <div class="row">
                <li v-for="info in additionalInformation" :key="info.meta" class="col-6 col-md-4">
                  <div class="row">
                    <div class="col-12">
                      <h3 v-html="info.meta"/>
                    </div>
                    <div class="col-12">
                      <p v-html="info.value"/>
                    </div>
                  </div>
                </li>
              </div>
            </ul>

            <div v-if="attributeList.length > 0">
              <div v-for="attribute in attributeList" :key="attribute[1]">
                <select v-model="selected[attribute[1]]" class="form-control">
                  <option disabled value selected>{{attribute[0]}}</option>
                  <option
                    v-for="option in getOptions(attribute[0])"
                    v-bind:value="option"
                    :key="option"
                  >{{ option }}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <AddToCartButton
                v-if="selectedArticle"
                :data="selectedArticle"
                :isBundle="isBundle"
                :image="image"
                class="col-12"
              />
            </div>
          </div>
          </div>
        </div>
    </article>
  </div>
</template>

<style lang="css">
.swiper-container-vertical > .swiper-pagination-bullets {
  right: unset;
  left: 5vw;
}

.swiper-container-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {
  border: 1px solid #1a1a1a;
  background: transparent;
  opacity: unset;
}

.swiper-container-vertical
  > .swiper-pagination-bullets
  .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: #1a1a1a;
}

.swiper-container{
  padding: 0 !important;
}
</style>
