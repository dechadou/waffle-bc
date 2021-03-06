<template>
  <div>
    <CurrencySelector
      class="currency-selector"
      :class="{ 'with-logo': isMarketplace }"
      v-if="multiCurrency"
    />
    <button class="open-cart" @click="cartToggle()" aria-label="Open Cart">
      <CartIcon />
      <span class="items-count animated" v-bind:class="{'jello': changing}">{{cartQuantity}}</span>
    </button>
    <div class="sidemenu" :class="[showCart ? 'open' : '']">
      <div class="inner_menu">
        <div class="cart_title">
          <button class="close_cart" @click="cartToggle()" aria-label="Close Cart">
            <CloseIcon class="closeIcon" />
          </button>
          <div class="col-12 title_cont">
            <div class="row no-gutters">
              <div class="col-6">
                <h1>Carrito</h1>
              </div>
              <div class="col-6">
                <p>{{ emptyCartText }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="cart_body">
          <div v-if="cartQuantity">
            <div v-for="(item, index) in cartItems" :key="item.id" class="col-12 item">
              <div class="row" v-if="item.price.some(x => x.coin_unit === currency)">
                <div class="col-6">
                  <div class="col-12">
                    <!-- TITULO -->
                    <div class="row">
                      <h2>{{ item.name }}</h2>
                    </div>

                    <!-- SELECTOR CANTIDAD -->
                    <div class="row qt-plus-minus">
                      <p>Cantidad</p>
                      <div>
                        <button class="qt_minus" @click="itemQuantity(index, -1)">-</button>
                        <span class="qt">{{ item.quantity }}</span>
                        <button class="qt_plus" @click="itemQuantity(index, +1)">+</button>
                      </div>
                    </div>

                    <!-- PRODUCTO SUBTOTAL -->
                    <div class="row">
                      <div class="col-6 p-0 subtotal">
                        <p>Subtotal:</p>
                      </div>
                      <div class="col-6 p-0 subtotal_price">
                        <p>
                          <span>{{ currencySymbol }}</span>
                          {{ item.price.find(x => x.coin_unit === currency).price * item.quantity }}
                        </p>
                      </div>
                    </div>

                    <!-- ATRIBUTOS -->
                    <div v-if="item.attributes != null">
                      <div v-for="(atr, val) in item.attributes" :key="val" class="row">
                        <div class="col-6 p-0 subtotal">
                          <p>{{ val }}:</p>
                        </div>
                        <div class="col-6 p-0 subtotal_price">
                          <p>{{ atr }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 p-0">
                  <div class="row">
                    <!-- IMAGEN -->
                    <div class="col-12">
                      <img
                        :src="item.media.url"
                        class="img-fluid"
                        style="height: 150px; margin: 0px auto; display: block;"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CART FOOTER -->
        <div class="cart_footer">
          <hr />
          <div class="col-12">
            <CouponsComponent v-if="showCouponInput" />

            <!-- SUBTOTAL -->
            <div class="col-12" :class="{'applied-discount': coupon}">
              <div class="row">
                <div class="col-5 p-0">
                  <div class="subtotal real_s">
                    <p>Subtotal:</p>
                  </div>
                </div>
                <div class="col-2 subtotal_price p-0">
                  <p>
                    <span>{{ currencySymbol }}</span>
                    {{ cartSubtotal }}
                  </p>
                </div>
                <div class="col-5 subtotal_price p-0">
                  <p class="subtotal-with-discount" v-if="coupon">
                    <span>{{ currencySymbol }}</span>
                    {{ cartSubtotalWithDiscount }}
                  </p>
                </div>
                <div class="col-5 p-0" />
                <div class="col-2 p-0" />
                <div class="col-5 p-0">
                  <p class="discount-percentage" v-if="coupon">{{ coupon.discount }}% DE DESCUENTO</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-8 offset-md-2">
            <div class="row">
              <button
                class="btn alternative btn-coupons"
                @click="showCouponInput = true"
                v-if="!showCouponInput"
              >¿Tenés un código de descuento?</button>
              <button v-if="!loading" class="btn" @click="checkout()">Seleccioná envío</button>
              <button class="btn" aria-label="Loading" v-else>
                <Loading class="cart_loader" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart_wrapper" :class="[showCart ? 'open' : '']" @click="cartToggle()" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import URLParams from '@/utils/urlparams';
import {
  CartActionTypes,
  CartMutationTypes,
  CartNamespace,
} from '@/store/module/Cart';
import { ThemeNamespace } from '@/store/module/Theme';
import { EventManager } from '@/utils';
import { getEnum, EnumNames } from '@/config';
import { StoreDataNamespace } from '@/store/module/StoreData';
import { Loading, CouponsComponent, CurrencySelector } from '@/extendables/BaseComponents';
import CartIcon from '@/assets/icons/cart.svg';
import CloseIcon from '@/assets/icons/close.svg';

class ItemQuantityObject {
  constructor(index, quantity) {
    this.index = index;
    this.quantity = quantity;
  }
}

class CartConfig {
  constructor(cartHelper, storeIdentifier, storeId, authToken) {
    this.cartHelper = cartHelper;
    this.storeIdentifier = storeIdentifier;
    this.storeId = storeId;
    this.authToken = authToken;
  }
}

// @group INTERNAL COMPONENTS
// Displays all the products saved inside the cart vuex store
// @vuese
export default {
  name: 'Cart',
  components: {
    CartIcon,
    CloseIcon,
    Loading,
    CouponsComponent,
    CurrencySelector,
  },
  props: {
    // CartHelper object to access to all the products data
    cartHelper: Object,
  },
  data() {
    return {
      showCouponInput: false,
      silentCouponInput: false,
      showCart: false,
      changing: false,
      loading: false,
      cartText: {
        empty: 'Tu carrito está vacío...',
        filled: 'Te estás llevando...',
      },
      currencySymbol: null,
    };
  },
  computed: {
    ...mapState(StoreDataNamespace, [
      'authToken',
      'storeIdentifier',
      'store_id',
      'store_slug',
      'currency',
      'multiCurrency',
    ]),
    ...mapState(CartNamespace, [
      'cartItems',
      'cartQuantity',
      'cartSubtotal',
      'cartRedirect',
      'coupon',
    ]),
    ...mapState(ThemeNamespace, ['theme']),
    emptyCartText() {
      return this.cartItems.length > 0
        ? this.cartText.filled
        : this.cartText.empty;
    },
    cartSubtotalWithDiscount() {
      return (
        this.cartSubtotal - (this.cartSubtotal * this.coupon.discount) / 100
      );
    },
    isMarketplace() {
      return this.theme === 'marketplace';
    },
  },
  watch: {
    cartQuantity() {
      // Saves the cart to localStorage when it changes
      this.storeCart();

      // Adds an animation to the cart number when it changes
      const scop = this;
      this.changing = true;
      setTimeout(() => {
        scop.changing = false;
      }, 1000);
    },
    cartRedirect(value) {
      // Deletes the localStorage cart and redirects to the generated url (the checkout)
      if (!value) return;
      this.deleteCart();
      window.location.href = value;
    },
    showCouponInput() {
      if (this.silentCouponInput) return;
      setTimeout(() => document.getElementById('couponInput').focus(), 100);
    },
    currency(value) {
      this.currencySymbol = getEnum(EnumNames.CurrencySymbols)[value];
    },
  },
  methods: {
    ...mapActions({
      fetchStoredCart: CartActionTypes.FETCH_STORED_CART,
      deleteCart: CartActionTypes.DELETE_CART,
      getCheckoutUrl: CartActionTypes.GET_CHECKOUT_URL,
      storeCart: CartActionTypes.STORE_CART,
    }),
    ...mapMutations({
      setCartConfig: CartMutationTypes.SET_CART_CONFIG,
      changeItemQuantity: CartMutationTypes.CHANGE_ITEM_QUANTITY,
      setCouponCode: CartMutationTypes.SET_COUPON_CODE,
    }),
    /**
     * @vuese
     * Calls the vuex store to add or subtract quantity of an item
     * @arg index: the array item index
     * @arg quantity: the quantity to add or subtract from the item.
     */
    itemQuantity(index, quantity) {
      this.changeItemQuantity(new ItemQuantityObject(index, quantity));
    },
    /**
     * @vuese
     * Calls the vuex store to generate the checkout url and sets the loading variable to true
     */
    checkout() {
      if (this.cartItems.length < 1) return;
      this.loading = true;

      this.getCheckoutUrl({
        currency: this.currency,
        queryParams: {
          source: URLParams('source'),
          medium: URLParams('medium'),
          campaign: URLParams('campaign'),
          term: URLParams('term'),
          content: URLParams('content'),
          utm_source: URLParams('utm_source'),
          utm_medium: URLParams('utm_medium'),
          utm_campaign: URLParams('utm_campaign'),
          utm_term: URLParams('utm_term'),
          utm_content: URLParams('utm_content'),
        },
      });

      if (this.$ga) {
        this.$ga.event({
          eventCategory: `waffle-${this.store_slug}`,
          eventAction: 'checkout',
        });
      }
    },
    /**
     * @vuese
     * Shows/hides the cart component.
     */
    cartToggle() {
      this.showCart = !this.showCart;
      EventManager.Trigger(getEnum(EnumNames.EventNames).ON_CART_OPEN, this.showCart);
      this.toggleScrollBar();
    },
    /**
     * @vuese
     * Shows/hides the page scrollbar.
     */
    toggleScrollBar() {
      if (this.showCart) { document.getElementsByTagName('body')[0].style.overflowY = 'hidden'; } else document.getElementsByTagName('body')[0].style.overflowY = 'initial';
    },
    /**
     * @vuese
     * Subscribes to the cart_toggle, and popstate event
     */
    suscribeToEvents() {
      EventManager.Subscribe(getEnum(EnumNames.EventNames).ON_CART_TOGGLE, () => this.cartToggle());
    },
    setUrlCoupon(coupon) {
      this.setCouponCode(coupon);
      this.showCouponInput = true;
      this.silentCouponInput = true;
    },
  },
  mounted() {
    // Creates a CartConfig object and sends it to the vuex store
    this.setCartConfig(
      new CartConfig(
        this.cartHelper,
        this.storeIdentifier,
        this.store_id,
        this.authToken,
      ),
    );

    // Fetches localStorage info
    this.fetchStoredCart();

    // Subscribes to events
    this.suscribeToEvents();

    // Searches discount coupon in url
    const coupon = URLParams('coupon');
    if (coupon) this.setUrlCoupon(coupon);

    // Gets currency symbol
    this.currencySymbol = getEnum(EnumNames.CurrencySymbols)[this.currency];
  },
};
</script>

<style scoped lang="scss">
input {
  width: 100%;
}
.close_cart {
  border: none;
  background-color: transparent;
  cursor: pointer;
  float: right;
  position: absolute;
  right: 15px;
  top: 15px;
  .closeIcon {
    width: 25px;
    height: 25px;
  }
}
.sidemenu.open {
  transform: translate(0, 0);
  transition: $easeOutExpo all 0.8s;
}
.sidemenu {
  background-color: #fff;
  padding-top: 20px;
  padding-bottom: 5px;
  position: fixed;
  transform: translate(100%, 0);
  right: 0;
  bottom: 0;
  top: 0;
  height: 101%;
  width: 100%;
  transition: $easeInCubic all 0.5s;
  z-index: 1500;
  @media (min-width: 768px) {
    width: 50%;
    padding: 20px 50px;
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
    background-color: #fcfcfc;
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
      background-color: #000;
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
    background-color: rgba(77, 77, 77, 0.35);
    position: fixed;
    top: 0;
    z-index: 100;
    transition: ease all 0.2s;
  }
}
.cart_title {
  flex: 0 0 100px;
  .title_cont {
    margin-top: 30px;
    h1 {
      font-family: $titles-font;
      color: $titles-color;
      font-weight: $titles-font-weight;
      font-size: 38px;
      font-weight: bold;
    }
    p {
      font-size: 20px;
      color: #c4c4c4;
      margin-top: 10px;
    }
  }
}
.applied-discount {
  .subtotal_price p {
    text-decoration: line-through;
    color: $abre-grey;
    &.subtotal-with-discount {
      text-decoration: none;
      color: $titles-color;
    }
  }
  .discount-percentage {
    color: green;
    margin: 0;
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
        font-size: 12px;
        margin-right: 0;
      }
    }
    h2 {
      font-size: 25px;
      color: $titles-color;
      margin-top: 0;
    }
  }
}
.subtotal_price {
  p {
    color: $titles-color;
    font-size: 19px;
    font-weight: 400;
  }
  span {
    font-size: 12px;
    margin-right: 0;
  }
}
.cart_footer {
  flex: 0 0 100px;
  p {
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
  .btn {
    margin-top: 15px;
    padding: 12px 0;
    &.btn-coupons {
      margin-left: 15px;
      margin-right: 15px;
      @include md-up {
        margin-left: 0;
        margin-right: 0;
      }
    }
    .cart_loader {
      width: 19px;
      fill: #fff;
      height: 19px;
    }
    &:hover .cart_loader {
      fill: #000;
    }
  }
}
.currency-selector {
  position: fixed;
  z-index: 1000;
  right: 19%;
  top: 20px;

  @include md-up {
    right: 11%;
    top: 22px;
  }

  &.with-logo {
    right: 5%;
    top: 55px;
    @include md-up {
      right: 11%;
      top: 22px;
    }
  }
}
.open-cart {
  border: none;
  background: transparent;
  cursor: pointer;
  position: fixed;
  right: 8%;
  top: 10px;
  padding: 0;
  z-index: 1000;

  @include lg-up {
    top: 15px;
  }

  svg {
    width: 35px;
    height: 35px;
  }
  .items-count {
    border-radius: 50%;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 13px;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    overflow: hidden;
    font-family: $font-light;
    font-weight: 300;
    background-color: #000;
    color: #fff;
    z-index: 200;
  }
}
</style>
