<template>
  <div>
    <article id="producto" class="product">
      <router-link class="go-back" :to="$route.params.slug ? `/${$route.params.slug}/` : '/'"><Icon class="arrow-left-button" name="arrow-left"/> <span>Volver a Tienda</span></router-link>
      <div class="row">
        <div class="col-12 col-md-6">
          <swiper
            :options="swiperOption"
            v-if="carouselImages.length > 1"
            class="swiper product-carousel"
          >
            <swiper-slide v-for="(img, index) in carouselImages" :key="index">
              <img class="d-block swiper" :src="img">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <img v-else class="d-block w-100" :src="singleImage">
        </div>

        <div class="col-md-6 description-box">
          <div class="container-xs">
            <div class="row">
              <div class="col-8 pr-0">
                <h1>{{ data.name }}</h1>
                <p class="authors">{{ data.agentes_actores | displayAuthors }}</p>
              </div>
              <div class="col-4 pl-0">
                <span class="price float-right">
                  <span>$</span>
                  {{ price }}
                </span>
              </div>
            </div>
            <!-- Product Description -->
            <p v-html="data.description"></p>

            <ul class="additional-info" v-if="data.informacion_adicional.length > 0">
              <div class="row">
                <li v-for="info in data.informacion_adicional" :key="info.meta" class="col-6 col-md-4">
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
              <div v-for="attribute in attributeList" :key="attribute">
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
              <div class="col-12 col-md-10 col-lg-7">
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
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { ProductType, Icon } from '@/extendables/BaseComponents';
import 'swiper/dist/css/swiper.css' ;
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'Product-Internal',
  extends: ProductType,
  components: {
    swiper,
    swiperSlide,
    Icon,
  },
  data() {
    return {
      selectedArticle: null,
      selected: [''],
      attributeList: [],
      carouselImages: [],
      swiperOption: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        initialSlide: 1,
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },
  created() {
    this.getSelectedArticleOrSelector();
    this.carouselImages = this.getCarouselImages();
  },
  watch: {
    selected() {
      this.selectedArticle = this.getArticleBySelectedOptions();
    },
    $route() {
      this.selectedArticle = this.getArticleBySelectedOptions();
    },
  },
  methods: {
    getButtonType() {
      if (this.isOutOfStock)  return 'OutOfStock';
      return 'Normal';
    },
    getSelectedArticleOrSelector() {
      if (this.data.articles[0].atributtes.length === 0) {
        [this.selectedArticle] = this.data.articles;
        return;
      }

      let ind = 0;
      Object.keys(this.data.articles[0].atributtes).forEach((attribute) => {
        this.attributeList.push([attribute, ind]);
        this.selected.push('');
        ind += 1;
      });
    },
    getArticleBySelectedOptions() {
      const sel = this.selected.find(el => el === '');
      if (sel === '' || this.selected.length === 0) return null;

      let filteredArticles = this.articleList;

      this.attributeList.forEach((attribute) => {
        filteredArticles = filteredArticles.find(
          el => el.atributtes[attribute[0]] === this.selected[attribute[1]],
        );
      });

      return filteredArticles;
    },
    getOptions(attribute) {
      const options = [];
      this.articleList.forEach((article) => {
        if (article.atributtes[attribute]) options.push(article.atributtes[attribute]);
      });
      return options;
    },
    getCarouselImages() {
      const carouselImages = [];
      Object.values(this.data.media).forEach((media) => {
        if (media.primary_media) carouselImages.unshift(media.url);
        else carouselImages.push(media.url);
      });
      return carouselImages;
    },
  },
  filters: {
    displayAuthors(authors) {
      let finalString = '';
      if (authors === null || authors === undefined) return finalString;

      authors.forEach((author) => {
        if (finalString.search(author.name) === -1) {
          if (finalString !== '') finalString += ' + ';
          finalString += author.name;
        }
      });
      return finalString;
    },
  },
};
</script>


<style lang="css">
.swiper-container-vertical > .swiper-pagination-bullets {
  right: unset;
  left: 5vw;
}

.swiper-container-vertical
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  border: 1px solid #1a1a1a;
  background: transparent;
  opacity: unset;
}

.swiper-container-vertical
  > .swiper-pagination-bullets
  .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: #1a1a1a;
}

.swiper-container {
  padding: 0 !important;
}
</style>

<style lang="scss" scoped>
.addToCartButton{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 5;
  @include md-up {
    position: initial;
  }
}
.swiper {
  display: block;
  max-height: 100vw;
  margin: 0 auto;

  @include md-up {
    max-height: 100vh;
    max-width: 50vw;
  }
}

.go-back{
  font-size: 16px;
  position: fixed;
  z-index: 3;
  left: 3%;

  @include md-up {
    left: unset;
    right: 55%;
    top: 22px;
  }
  span {
    display: none;
    position: relative;
    bottom: 29px;
    left: 40px;
    @include md-up {
      display: block;
    }
  }

  .arrow-left-button{
    width: 50px;
    height: 50px;
    @include md-up {
      width: 30px;
      height: 30px;
    }
  }
}

.authors {
  font-size: 4.533333333vw;
  @include lg-up {
    margin: 0 !important;
    color: $abre-grey !important;
    font-size: 1.02489019vw !important;
  }
}

#producto {
  background: #f3f3f3;
  overflow: hidden;
  padding-bottom: 65px;

  h1 {
    color: #14273c;
    font-size: 30px;
  }
  .breadcrumb {
    padding: 0;
    margin-bottom: 30px;
    background-color: transparent;
    border-radius: 0;
    font-size: 16px;

    a {
      color: #14273c;
    }
  }
  .breadcrumb > .active {
    color: #14273c;
  }
  .breadcrumb > li + li:before {
    padding: 0 5px;
    color: #14273c;
    content: "\003e";
  }

  p {
    margin-top: 20px;
    font-size: 18px;
    color: #14273c;
  }

  .price {
    font-size: 20px;
    float: right;
    margin-top: 5px;

    span {
      font-size: 16px;
    }
  }

  .description-box {
    margin: 20px 0;

    @include md-up {
      margin: 0;
      padding-right: 10vw;
      padding-left: 5vw;
      margin-top: 10vw;
    }
  }

  .container-xs {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    @include md-up {
      padding: 0;
    }
  }

  .additionalInfo {
    margin-bottom: 50px;

    li {
      margin-top: 20px;
    }

    h3 {
      font-size: 14px;
      color: #000;
      margin: 0;
    }

    p {
      font-size: 14px;
      color: #4d4d4d;
      margin: 0;
    }
  }
}
</style>
