<template>
  <div>
    <div id="relatedProducts" class="sidemenu" :class="[showRelatedProducts ? 'open' : '']">
      <div class="inner_menu">
        <div>
          <div style="border-bottom: 2px solid rgb(239, 239, 239);height: 67px;">
            <div class="container">
              <div class="col-12">
                <Icon class="checkIcon" name="check"/>
                <h2 class="added">¡Agregado!</h2>
                <button class="go_to_cart" @click="openCart()">
                  IR A TU CARRITO
                  <Icon class="arrowRightCart" name="arrow-right-cart"/>
                </button>
              </div>
            </div>
          </div>
          <div class="col-12 title_cont">
            <h1>Conocé otros creadores</h1>
          </div>
        </div>
        <div class="relatedProductsContainer">
          <ProductDisplayerMain
            :products="relatedList"
            containerClasses="col-4"
            v-if="breakpoint >= breakpoints.MD"
            class="desktopContainer"
            :openModules="false"
          />
          <ProductDisplayerSlider :products="relatedList" v-else/>
        </div>
      </div>
    </div>
    <div
      class="cart_wrapper"
      :class="[showRelatedProducts ? 'open' : '']"
      @click="toggleRelatedProducts()"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { StoreDataNamespace } from '@/store/module/StoreData';
import { Icon } from '@/extendables/BaseComponents';
import { EventManager } from '@/utils';
import { getEnum, EnumNames } from '@/config';
import { BreakpointsNamespace } from '@/store/module/Breakpoints';
import {
  ProductDisplayerSlider,
  ProductDisplayerMain,
} from '@/extendables/ProductDisplayerTypes';

// @group INTERNAL COMPONENTS
// Displays a list of related products of the product that has been added to the cart.
// @vuese
export default {
  name: 'RelatedProducts',
  props: {
    // CartHelper Object used for accessing to all the products data
    cartHelper: Object,
  },
  components: {
    Icon,
    ProductDisplayerSlider,
    ProductDisplayerMain,
  },
  data() {
    return {
      showRelatedProducts: false,
      changing: false,
      relatedList: [],
      random: 0,
      actualId: 0,
      addedProduct: null,
      porcentajeAlreadySet: false,
      eventNames: null,
      breakpoints: getEnum(EnumNames.Breakpoints),
    };
  },
  computed: {
    ...mapState(StoreDataNamespace, ['data']),
    ...mapState(BreakpointsNamespace, ['breakpoint']),
  },
  methods: {
     /**
     * @vuese
     * Called by popstate event. Closes the module on navigator back button pressed
     */
    onBackButtonPressed(event) {
      if (this.showRelatedProducts && event.state && event.state.state === 'RelatedProducts') this.toggleRelatedProducts(true);
    },
     /**
     * @vuese
     * Populates the module and calls the toggleRelatedProducts() function after 0.5s
     */
    toggleRelatedProductsDelay(parentProduct) {
      const scop = this;
      this.changing = true;
      this.populateRelatedProducts(parentProduct);
      setTimeout(() => {
        scop.toggleRelatedProducts();
        scop.changing = false;
      }, 500);
    },
     /**
     * @vuese
     * Shows/hides the module and sets a height based on the screen size and the height of the products
     * @arg pressedBack: is set to false by default. If true it doesn't handle the removal of the history entry because the browser does it automatically
     */
    toggleRelatedProducts(pressedBack = false) {
      this.showRelatedProducts = !this.showRelatedProducts;

      if (this.showRelatedProducts) {
        // Hides Scrollbar
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';

        // Adds an entry to the browser history indicating the opening of the RelatedProducts module
        window.history.replaceState({ state: 'RelatedProducts' }, 'RelatedProducts');
        window.history.pushState({ state: 'RelatedProducts' }, 'RelatedProducts');
      } else {

        // Unpopulates the relatedList
        this.relatedList = [];

        // Shows the ScrollBar
        document.getElementsByTagName('body')[0].style.overflowY = 'initial';

        // If pressedBack is true, it means that the RelatedProducts module is closing by the user clicking the browser's back button. No further action is needed
        // Else it means that is closing by the user clicking another button, so we have to manually remove the browser's history entry
        if (!pressedBack) window.history.back();
        return;
      }

      // Checks if height percentage has already been set.
      if (this.porcentajeAlreadySet) return;

      // Sets the height
      // It would be cool to refactor this code but the reality is that it works just fine
      let plus = 0;
      if (window.innerWidth > 768) plus = 10;
      const altMenu = document
        .getElementById('relatedProducts')
        .getElementsByClassName('relatedProductsContainer')[0].clientHeight
        + 100;
      let porcentaje = (altMenu * 100) / window.innerHeight + plus;
      if (porcentaje > 100) porcentaje = 100;
      document.getElementById(
        'relatedProducts',
      ).style.height = `${porcentaje}%`;
      this.porcentajeAlreadySet = true;
    },
     /**
     * @vuese
     * Closes the RelatedProducts module and triggers the cart_toggle event
     */
    openCart() {
      this.toggleRelatedProducts();
      EventManager.Trigger(this.eventNames.ON_CART_TOGGLE);
    },
    /**
     * @vuese
     * Takes the id's of the related products of the added to cart product, gets the product data of each ID and adds them to the relatedList array
     * If there aren't related products it gets three random products.
     */
    populateRelatedProducts(parentProduct) {
      this.addedProduct = parentProduct;

      // Si el producto padre es válido, y ese producto padre tiene cargados productos relacionados
      if (
        this.addedProduct
        && this.addedProduct.productos_relacionados.length > 0
      ) {
        this.relatedList = [];

        // Agrego los productos relacionados a la relatedList
        this.addedProduct.productos_relacionados.forEach((id) => {
          const product = this.data.products.find(x => x.id === id);
          if (product) this.relatedList.push(product);
        });

        if (this.relatedList.length >= 3) return;
      }

      // Si el producto padre no es válido (o no tiene cargado productos relacionados) y hay mas de 3 productos en toda la tienda, elijo 3 productos al azar.
      if (this.data.products.length < 4) return;

      // Filtro por todos los productos si el producto agregado no es válido, pero si lo es, descarto el producto agregado para que no se repita
      const productsToAdd = this.data.products.filter(
        product => !this.addedProduct || product.id !== this.addedProduct.id,
      );

      // Agrego el numero de productos al azar que haga falta a relatedList
      const relatedListLength = this.relatedList.length;
      for (let i = 0; i < 3 - relatedListLength; i += 1) {
        const randomIndex = Math.floor(Math.random() * productsToAdd.length);
        this.relatedList.push(productsToAdd[randomIndex]);
        productsToAdd.splice(randomIndex, 1);
      }
    },
  },
  mounted() {
    this.eventNames = getEnum(EnumNames.EventNames);

    // Subscribes to the ON_RELATED_PRODUCTS_TOGGLE 
    // When triggered: gets the product-article pair object by the id of the added article. Then calls to toggleRelatedProductsDelay()
    EventManager.Subscribe(
      this.eventNames.ON_RELATED_PRODUCTS_TOGGLE,
      (response) => {
        const parentProduct = this.cartHelper.getProductArticlePairByArticleId(
          response[0].id,
        ).product;
        this.toggleRelatedProductsDelay(parentProduct);
      },
    );

    // Subscribes to popstate event
    window.addEventListener('popstate', this.onBackButtonPressed);
  },
};
</script>

<style lang="scss">
.swiper-container {
  padding: 0 10%;
  @media (min-width: 768px) {
    padding: 0 20%;
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
  transition: all 0.3s ease;
}
.swiper-slide.swiper-slide-active .product .image_wrap img {
  max-width: 120%;
  width: 120% !important;
  z-index: 21;
  top: -10%;
  left: -10%;
  transition: all 0.3s ease;
  @media (min-width: 768px) {
    max-width: 100%;
    width: 100% !important;
    z-index: 1;
    top: 0;
    left: 0;
  }
}
</style>

<style lang="scss" scoped>
.checkIcon {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 17px;
  left: 17px;
}
.arrowRightCart {
  width: 25px;
  height: 25px;
  position: relative;
  margin-left: 10px;
  top: 7px;
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
      &.btn_buy {
        margin-top: 10px;
      }
    }
  }
  &.go_to_cart {
    position: absolute;
    right: 0;
    background: none;
    border: none;
    font-family: "Founders_Grotesk_Regular", sans-serif;
    font-size: 4vw !important;
    top: 5px;
    padding: 11px 20px;
    @include md-up {
      font-size: 16px !important;
    }
  }
}
.sidemenu.open {
  transform: translate(0, 0);
  transition: $easeInCubic all 0.5s;
}
.sidemenu {
  background: #fff;
  position: fixed;
  top: unset;
  bottom: 0;
  transform: translate(0, 100%);
  left: 0;
  width: 100%;
  transition: $easeOutExpo all 0.5s;
  padding-top: 0;
  padding-bottom: 0;
  z-index: 1500;
  @include md-up {
    height: 75%;
  }
  .inner_menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  hr {
    width: 110%;
    margin: 0;
  }
  .qt,
  .qt_plus,
  .qt_minus {
    display: block;
    float: left;
    width: 40px;
    height: 40px;
    color: #4d4d4d;
    border: 1px solid #c4c4c4;
    font-size: 30px;
    background: #fcfcfc;
    text-align: center;
  }
  .sidemenu .qt {
    line-height: 35px;
    border-left: none;
    border-right: none;
    text-align: center;
  }

  .qt_plus,
  .qt_minus {
    font-weight: 300;
    -webkit-transition: background 0.2s linear;
    -moz-transition: background 0.2s linear;
    -ms-transition: background 0.2s linear;
    -o-transition: background 0.2s linear;
    transition: background 0.2s linear;
    :hover {
      background: #000;
      color: #fff;
      cursor: pointer;
    }
  }

  .qt_minus {
    line-height: 32px;
    padding: 0 14px;
  }
  .qt_plus {
    line-height: 0;
    padding: 0 10px;
  }
}
.cart_wrapper {
  transition: ease all 0.2s;
  &.open {
    width: 100%;
    height: 100%;
    background: #4d4d4d;
    opacity: 0.3;
    position: fixed;
    top: 0;
    z-index: 100;
    transition: ease all 0.2s;
  }
}
.title_cont {
  h1 {
    color: #4d4d4d;
    font-size: 22px !important;
    margin-top: 10px !important;
    text-align: center;
    z-index: 2;
    position: relative;
  }
  p {
    font-size: 20px;
    color: #c4c4c4;
    margin-top: 10px;
  }
}
.cart_body {
  flex: 2;
  overflow-x: hidden;
  overflow-y: auto;
  .subtotal p {
    margin: 7px 0 0 0;
  }
  .item {
    margin-bottom: 15px;
    width: 100%;
    p {
      color: #c4c4c4;
      font-size: 14px;
      text-transform: uppercase;
      margin: 5px 0;
      border: none;
      width: 100%;
      span {
        font-size: 13px;
        margin-right: 3px;
      }
    }
    h2 {
      font-size: 25px;
      color: #4d4d4d;
      margin-top: 0;
    }
  }
}
.subtotal_price {
  p {
    color: #4d4d4d;
    font-size: 19px;
    float: right;
    font-weight: 400;
  }
  span {
    font-size: 16px;
    margin-right: 4px;
  }
}
.cart_footer {
  flex: 0 0 100px;
  p {
    color: #c4c4c4;
    font-size: 14px;
    text-transform: uppercase;
    margin: 5px 0;
    border: none;
  }
  .subtotal {
    p {
      margin: 7px 0 0 0;
    }
    &.real_s p {
      font-weight: 400;
      color: #000;
    }
  }
}
.added {
  color: rgb(77, 77, 77);
  font-size: 18px;
  font-family: "Founders_Grotesk_Light", sans-serif;
  position: absolute;
  top: 24px;
  left: 60px;
}
.desktopContainer {
  padding: 0 10%;
}
</style>
