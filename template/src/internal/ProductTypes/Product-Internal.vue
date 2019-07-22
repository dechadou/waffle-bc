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
              <AddToCartButton
                v-if="selectedArticle"
                :data="selectedArticle"
                :isBundle="isBundle"
                :image="image"
                class="col-12 col-md-8"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Product-Internal",
  props: [
    "type",
    "name",
    "slug",
    "price",
    "description",
    "agentsActors",
    "additionalInformation",
    "media",
    "selectedArt",
    "articleList",
    "attributeList",
    "isBundle"
  ],
  data() {
    return {
      image: null,
      selectedArticle: null,
      selected: [""],
      carouselImages: [],
      swiperOption: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        initialSlide: 1,
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  created() {
    this.selectedArticle = this.selectedArt;
    this.getImage();
    this.getCarouselImages();
  },
  watch: {
    selected() {
      this.selectedArticle = this.getArticleBySelectedOptions();
    },
    $route() {
      this.selectedArticle = this.selectedArt;
      this.carouselImages = [];
      this.getImage();
      this.getCarouselImages();
    }
  },
  methods: {
    getArticleBySelectedOptions() {
      const sel = this.selected.find(el => el === "");
      if (sel === "" || this.selected.length === 0) return null;

      let filteredArticles = this.articleList;

      this.attributeList.forEach(attribute => {
        filteredArticles = filteredArticles.find(
          el => el.atributtes[attribute[0]] === this.selected[attribute[1]]
        );
      });

      return filteredArticles;
    },
    getOptions(attribute) {
      const options = [];
      this.articleList.forEach(article => {
        if (article.atributtes[attribute])
          options.push(article.atributtes[attribute]);
      });
      return options;
    },
    getCarouselImages() {
      const med = Object.values(this.media);

      med.forEach(media => {
        if (media.primary_media) this.carouselImages.unshift(media.url);
        else this.carouselImages.push(media.url);
      });
    },
    getImage() {
      const med = Object.values(this.media);
      // Si hay imagen marcada como primary media
      med.forEach(media => {
        if (media.primary_media) {
          this.image = media.url;
        }
      });

      if (this.image) return;

      // Si no hay imagenes marcada como primary media
      med.forEach(media => {
        this.image = media.url;
      });

      if (this.image) return;

      // Si no hay imagenes retorno un placeholder
      this.image = "http://via.placeholder.com/1367x1367";
    }
  },
  filters: {
    displayAuthors(authors) {
      let finalString = "";
      if (authors === null || authors === undefined) return finalString;

      authors.forEach(author => {
        if (finalString.search(author.name) === -1) {
          if (finalString !== "") finalString += " + ";
          finalString += author.name;
        }
      });
      return finalString;
    }
  }
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
    float: left;

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
