<template>
  <article class="product slider_product">
    <div class="row new_row">
      <div class="new_col_12 col-12 p0">
        <div class="image_wrap">
          <i class="fas fa-circle-notch fa-spin fa-3x fa_icon"></i>
          <router-link :to="`/producto/${data.slug}`">
            <img :src="image" class="img-fluid mx-auto d-block">
          </router-link>
        </div>
      </div>
      <div class="col-12 description">
        <router-link :to="`/producto/${data.slug}`" class="title_price_block">
          <div class="row new_row">
            <h3 class="title slider_title">
              {{ data.name }}&nbsp;&nbsp;·&nbsp;&nbsp;
              <span class="price">
                <span>$</span>
                {{ data.price }}
              </span>
            </h3>
          </div>
          <div class="row new_row">
            <div class="col-12">
              <div v-if="attributeList.length > 0">
                <div v-for="attribute in attributeList" :key="attribute[1]">
                  <select v-model="selected[attribute[1]]" class="form-control">
                    <option disabled value selected>{{ attribute[0] }}</option>
                    <option
                      v-for="option in getOptions(attribute[0])"
                      :value="option"
                      :key="option"
                    >{{ option }}</option>
                  </select>
                </div>
              </div>
              <p class="authors">{{ data.agentes_actores | displayAuthors }}</p>
            </div>
          </div>
        </router-link>

        <div class="button_container">
          <AddToCartButton
            :slug="data.slug"
            :id="selectedArticle ? selectedArticle.id : 0"
            :productType="data.productos ? 'combo' : 'producto'"
            :buttonType="getButtonType()"
          />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import {
  getImage,
  getAttributeList,
  isArticleOutOfStock,
  isBundleOutOfStock
} from "@/utils/productTypesHelper";
import AddToCartButton from "@/internal/ProductTypes/ProductComponents/AddToCartButton.vue";

export default {
  name: "Product-Slider",
  components: {
    AddToCartButton
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    articleList: {
      type: Array
    }
  },
  data() {
    return {
      image: null,
      selectedArticle: null,
      attributeList: null,
      selected: [""],
      isBundle: !!this.data.productos
    };
  },
  created() {
    this.selectedArticle = this.selectedArt;
    this.attributeList = getAttributeList(this.articleList);
    this.attributeList.forEach(() => this.selected.push(""));
    this.image = getImage(this.data.media);
  },
  watch: {
    selected() {
      this.selectedArticle = this.getArticleBySelectedOptions();
    }
  },
  methods: {
    getArticleBySelectedOptions() {
      if (
        this.selected.find(el => el === "") === "" ||
        this.selected.length === 0
      )
        return null;

      let filteredArticles = this.articleList;

      this.attributeList.forEach(attribute => {
        filteredArticles = filteredArticles.find(
          el => el.atributtes[attribute[0]] === this.selected[attribute[1]]
        );
      });

      return filteredArticles;
    },
    getOptions(attribute) {
      return this.articleList.filter(article => article.atributtes[attribute]);
    },
    getPrice: () =>
      Math.floor(
        this.selectedArticle ? this.selectedArticle.price : this.data.price
      ),
    getButtonType() {
      if (this.isBundle) {
        if (isBundleOutOfStock(this.articleList)) return "OutOfStock";
      } else {
        if (isArticleOutOfStock(this.selectedArticle)) return "OutOfStock";
        if (this.articleList.length > 1) return "Select";
      }

      return "Check";
    }
  },
  filters: {
    displayAuthors: authors =>
      !authors
        ? ""
        : authors
            .filter((v, i) => authors.indexOf(v) === i)
            .reduce((acc, current) => (acc === "" ? "" : ` + ${current.name}`))
  }
};
</script>


<style lang="scss" scoped>
$abre-grey: #c1c1c1;
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

  @media (min-width: 1024px) {
    margin-bottom: 30px;
    transition: background-color 0.25s ease-out;
  }

  &.slider_product {
    .description {
      margin-top: -8%;
    }
    p.authors {
      height: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .title {
    @media (min-width: 768px) {
      height: 62px;
      font-size: 32px;
    }
    &.slider_title {
      font-size: 20px !important;
      width: 100%;
      text-align: center;
      height: 40px;
      line-height: 0.8;
      z-index: 21;
      span.price {
        float: none;
        color: $abre-grey;
        span {
          color: $abre-grey;
        }
      }
    }
  }
  p {
    font-size: 22px;
    @media (min-width: 768px) {
      font-size: 20px;
    }
    &.authors {
      color: #b0b0b0;
      font-size: 22px;
    }
  }
  span {
    margin: 0;
    display: inline-block;
    color: $abre-grey;
    font-size: 19px;
    @media (min-width: 768px) {
      font-size: 18px;
    }
    &.price {
      float: right;
      font-size: 18px;
      margin-top: 3px;
      font-weight: 400;
      span {
        font-size: 14px;
        margin-right: 5px;
      }
      @media (min-width: 768px) {
        margin-top: 10px;
      }
    }
  }
  .image_wrap {
    display: block;
    padding-top: 100%;
    position: relative;
    overflow: hidden;

    @media (min-width: 1024px) {
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
    margin-top: 10px;
    margin-bottom: 10px;
  }

  button {
    &.btn {
      &.btn_primary {
        background-color: #000;
        color: #fff;
        width: 100%;
        margin: 0;
        padding: 12px 0;
        border-radius: 0;
        font-size: 21px;
        font-weight: 300;
        transition: 0.3s ease all;
        border: 1px solid transparent;
        &.out_of_stock {
          transition: 0.3s ease all;
          background: #fff;
          color: #000;
          border: 1px solid #000;
        }
        &.green {
          background-color: #237116;
          border: none;
        }
        &:hover {
          transition: 0.3s ease all;
          background: #fff;
          color: #000;
          border: 1px solid #000;
        }
        &:focus {
          box-shadow: none;
        }
      }
    }
  }
  .button_container {
    float: left;
    width: 100%;
    @media (min-width: 768px) {
      .button_container {
        padding: 0;
      }
    }
  }

  // new css - had no time to clean

  .new_row {
    @media (min-width: 1024px) {
      margin: 0 !important;
    }
  }

  .new_col_12 {
    @media (min-width: 1024px) {
      padding: 0 !important;
    }
  }

  .title {
    color: #000;
    font-size: 6.133333333vw;
    width: 75vw;
    margin: 0;
    @media (min-width: 768px) {
      font-size: 26px;
      width: auto;
      height: auto !important;
    }
    @media (min-width: 1024px) {
      color: $abre-black !important;
      font-size: 1.317715959vw !important;
      white-space: nowrap;
    }
  }

  .authors {
    font-size: 4.533333333vw;
    @media (min-width: 1024px) {
      margin: 0 !important;
      color: $abre-grey !important;
      font-size: 1.02489019vw !important;
    }
  }

  .price {
    @media (min-width: 1024px) {
      line-height: 1.75;
      margin: 0 !important;
      color: $abre-grey !important;
      font-size: 1.02489019vw !important;
    }

    span {
      @media (min-width: 1024px) {
        margin: 0 0.3vw 0 0 !important;
        color: $abre-grey !important;
        font-size: 0.7320644217vw !important;
      }
    }
  }

  .title_price_block {
    @media (min-width: 1024px) {
      transition: opacity 0.25s ease-out, visibility 0.25s ease-out;
    }
  }

  .description {
    @media (min-width: 1024px) {
      padding: 0 !important;
    }
  }

  .btn_primary {
    @media (min-width: 1024px) {
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
    @media (min-width: 1024px) {
      max-width: 31.62393162% !important;
      flex: 0 0 31.62393162% !important;
    }

    .image_wrap {
      @media (min-width: 1024px) {
        padding-top: 100% !important;
      }

      img {
        @media (min-width: 1024px) {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain;
        }
      }
    }
  }

  // type bundle
  &.type_bundle {
    @media (min-width: 1024px) {
      // height: 30.74670571vw;
      max-width: 48.71794872% !important;
      flex: 0 0 48.71794872% !important;
    }

    .image_wrap {
      @media (min-width: 1024px) {
        padding-top: 64.9122807% !important;
      }

      img {
        @media (min-width: 1024px) {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain;
        }
      }
    }
  }

  @media (min-width: 1024px) {
    padding: 0 !important;
  }

  &:hover {
    @media (min-width: 1024px) {
      background: $abre-light-grey;
    }

    .btn_primary {
      @media (min-width: 1024px) {
        opacity: 1;
        visibility: visible;
      }
    }

    .title_price_block {
      @media (min-width: 1024px) {
        opacity: 0;
        visibility: hidden;
      }
    }
  }
}
</style>
