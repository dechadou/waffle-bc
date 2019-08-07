<template>
  <div>
    <article id="producto" class="product">
      <div class="row">
        <div class="col-12 col-md-6">
          <swiper
            :options="swiperOption"
            v-if="carouselImages.length > 1"
            class="swiper product-carousel"
          >
            <swiper-slide v-for="(img, index) in carouselImages" :key="index">
              <img class="d-block swiper swiper-lazy" :data-src="img">
              <Loading class="swiper-loader"/>
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

            <div v-if="attributeSelectors.length > 0">
              <div v-for="(attributeSelector, index) in attributeSelectors" :key="attributeSelector.name">
                <select v-model="selectedProperties[index]" class="form-control">
                  <option
                    v-for="property in attributeSelector.properties"
                    :value="property.value"
                    :key="property.name"
                    :disabled="property.main ? 'disabled' : null"
                  >{{ property.name }}</option>
                </select>
              </div>
            </div>

            <div class="row" v-if="selectedArticle">
              <div class="col-12 col-md-10 col-lg-7">
              <component
                class="addToCartButton"
                :is="getButtonType()"
                :slug="data.slug"
                :id="selectedArticle.id"
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
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

import { ProductType, Icon } from '@/extendables/BaseComponents';

export default {
  name: 'Product-Internal',
  extends: ProductType,
  components: {
    swiper,
    swiperSlide,
    Loading,
  },
  data() {
    return {
      selectedArticle: null,
      selectedProperties: null,
      attributeSelectors: [],
      carouselImages: [],
      swiperOption: {
        // Enable lazy loading
        lazy: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        initialSlide: 1,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },
  created() {
    this.onCreated();
  },
  watch: {
    selectedProperties() {
      const abc = this.getArticleBySelectedOptions();
      console.log(abc);
      this.selectedArticle = abc;
    },
    $route() {
      this.onCreated();
    },
  },
  methods: {
    onCreated() {
      this.getSelectedArticleOrSelector();
      this.carouselImages = this.getCarouselImages();
    },
    getButtonType() {
      if (this.selectedArticle.stock < 1) return 'OutOfStock';
      return 'Normal';
    },
    getSelectedArticleOrSelector() {
      // Si no hay atributos significa que no hay forma de seleccionar un elemento distinto,
      // por lo tanto no importa si el producto tiene mas de un articulo, seleccionamos el primer articulo.
      if (this.data.articles[0].atributtes.length === 0) {
        [this.selectedArticle] = this.data.articles;
        return;
      }

      // Si hay atributos, los mapeamos a attributeSelectors para que se generen sus respectivos selectores de cada atributo
      this.attributeSelectors = Object.keys(this.data.articles[0].atributtes).map(attributeName => ({
        name: attributeName,
        properties: this.data.articles
          .map(article => ({
            name: article.atributtes[attributeName],
            value: article.atributtes[attributeName],
            main: false,
          })).filter(property => property.name !== ''),
      }));

      this.attributeSelectors.forEach(x => x.properties.push({ name: x.name, value: 'default', main: true }));

      // Por cada selector se puede seleccionar una propiedad. Por default la propiedad de cada selector debe ser '' para que
      // el selector indique al usuario que debe seleccionar una propiedad.
      this.selectedProperties = this.attributeSelectors.map(x => 'default');
    },
    getArticleBySelectedOptions() {
      // Si faltan seleccionar propiedades devuelve null
      if (this.selectedProperties.some(x => x === 'default')) return null;
      return this.articleList.find(article => this.isSelectedArticle(article.atributtes));
    },
    isSelectedArticle(attributes) {
      const isSelectedArticle = true;
      const attributesValues = Object.values(attributes);

      console.log(this.selectedProperties);


      for (let i = 0; i < this.attributeSelectors.length; i++) {
        console.log(this.selectedProperties[i] === attributesValues[i]);
        if (this.selectedProperties[i] !== attributesValues[i]) return false;
      }
      return true;
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
.swiper-container > .swiper-pagination-bullets {
  transform: rotate(90deg);
  top: 50%;
  left: -45%;
  bottom: unset;
}

.swiper-container
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  border: 1px solid #1a1a1a;
  background: transparent;
  opacity: unset;
}

.swiper-container
  > .swiper-pagination-bullets
  .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: #1a1a1a;
}

.swiper-container {
  padding: 0 !important;
}
</style>

<style lang="scss" scoped>
select{
    border: none;
    border-bottom: 1px solid #4D4D4D;
    width: 100%;
    background: transparent;
    font-family: "Founders_Grotesk_Light";
    font-size: 21px;
    padding: 10px 0;
    margin: 10px 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent url(https://abrecultura.s3.amazonaws.com/data/media/0a72da8851361a00b97ba933803c8d8d068ddfa9_1565032767/fit_crop-50-50-id_479-width_12-height_12.jpg) no-repeat 98% center;
    background-size: 12px;
    outline: none;
}

.addToCartButton{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 5;
  @include md-up {
    position: initial;
  }
}
.swiper-loader{
  width: 50px;
  height: 50px;
  display: block;
  margin: 0 auto;
  margin-top: 50%;
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
