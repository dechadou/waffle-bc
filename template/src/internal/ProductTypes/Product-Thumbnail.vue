<template>
  <article class="product">
    <div class="col-12">
      <div class="row">
        <!-- IMAGE -->
        <div class="col-12 p-0">
          <router-link :to="`/producto/${data.slug}`">
            <LazyImage
              :source="singleImage"
              cssClasses="img-fluid mx-auto d-block"
              :description="`${data.title} image`"
            />
          </router-link>
        </div>

        <!-- DESCRIPTION -->
        <div class="col-12 description">
          <!-- TITLE AND PRICE -->
          <div class="title_price_block">
            <div class="row">
              <div class="col-9">
                <h3 class="title">{{ data.name }}</h3>
              </div>
              <div class="col-3 pl-0 price-container">
                <span class="price">
                  <span>$</span>
                  {{ price }}
                </span>
              </div>
            </div>

            <!-- AUTHORS -->
            <div class="row">
              <div class="col-12">
                <p class="authors">{{ data.agentes_actores | displayAuthors }}</p>
              </div>
            </div>
            <!-- /AUTHORS -->
          </div>
          <!-- /TITLE AND PRICE -->

          <div class="button_container">
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
        <!-- /DESCRIPTION -->
      </div>
    </div>
  </article>
</template>

<script>
import { LazyImage, ProductType } from "@/extendables/BaseComponents";

export default {
  name: "Product-Thumbnail",
  extends: ProductType,
  components: {
    LazyImage
  },
  methods: {
    getButtonType() {
      if (this.data.class === "product" && this.articleList.length > 1) {
        return "Select";
      }
      if (this.isOutOfStock) return "OutOfStock";

      return "Normal";
    }
  },
  filters: {
    displayAuthors(authors) {
      let str = "";
      authors
        .filter((v, i) => authors.indexOf(v) === i)
        .forEach(x => {
          str += str === "" ? x.name : ` + ${x.name}`;
        });

      return str;
    }
  }
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

  @media (min-width: 1024px) {
    margin-bottom: 30px;
    transition: background-color 0.25s ease-out;
  }

  .title {
    @media (min-width: 768px) {
      height: 62px;
      font-size: 32px;
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
      margin-top: 0;
    }
  }
  .price-container {
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 0) 0%,
      rgba(255, 255, 255, 1) 22%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  span {
    margin: 0;
    display: inline-block;
    color: $abre-black;
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
    margin-top: 5px;
    margin-bottom: 0;
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
      color: $abre-black !important;
      font-size: 1.02489019vw !important;
    }
  }

  .price {
    @media (min-width: 1024px) {
      line-height: 1.75;
      margin: 0 !important;
      color: $abre-black !important;
      font-size: 1.02489019vw !important;
    }

    span {
      @media (min-width: 1024px) {
        margin: 0 0.3vw 0 0 !important;
        color: $abre-black !important;
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
    overflow: hidden;
    padding: 0 !important;
    @media (min-width: 1024px) {
      height: 45px;
    }
  }

  .addToCartButton {
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

    .addToCartButton {
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
