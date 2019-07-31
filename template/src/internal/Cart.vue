<template>
  <div>
    <button class="open-cart" @click="cartToggle()" aria-label="Open Cart">
      <Icon name="cart"/>
      <span class="items-count animated" v-bind:class="{'jello': changing}">{{totalItems}}</span>
    </button>
    <div class="sidemenu" :class="[showCart ? 'open' : '']">
      <div class="inner_menu">
        <div class="cart_title">
          <button class="close_cart" @click="cartToggle()" aria-label="Close Cart">
            <Icon class="closeIcon" name="close"/>
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
        <div v-if="totalItems" class="cart_body">
          <div v-for="item in items" :key="item.id" class="col-12 item">
            <div class="row">
              <div class="col-6">
                <div class="col-12">
                  <div class="row">
                    <h2>{{ item.name }}</h2>
                  </div>
                  <div class="row qt-plus-minus">
                    <p>Cantidad</p>
                    <div>
                      <button class="qt_minus" @click="qtMinus(item)">-</button>
                      <span class="qt">{{ item.quantity }}</span>
                      <button class="qt_plus" @click="qtPlus(item)">+</button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 p-0 subtotal">
                      <p>Subtotal:</p>
                    </div>
                    <div class="col-6 p-0 subtotal_price">
                      <p>
                        <span>$</span>
                        {{ item.price * item.quantity }}
                      </p>
                    </div>
                  </div>
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
                  <div class="col-12">
                    <img
                      :src="item.media"
                      class="img-fluid"
                      style="height: 150px; margin: 0px auto; display: block;"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="cart_body"/>
        <div class="cart_footer">
          <hr>
          <div class="col-12">
            <div class="col-6">
              <div class="row">
                <div class="col-6 p-0">
                  <div class="subtotal real_s">
                    <p>Subtotal:</p>
                  </div>
                </div>
                <div class="col-6 subtotal_price">
                  <p>
                    <span>$</span>
                    {{ totalPrice }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-6"/>
          </div>
          <div class="btn-box">
            <div class="col-8 offset-2">
              <button v-if="!loading" class="btn" @click="checkout()">Seleccioná envío</button>
              <button class="btn" aria-label="Loading" v-else>
                <Loading class="cart_loader"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart_wrapper" :class="[showCart ? 'open' : '']" @click="cartToggle()"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { EventManager } from '@/utils';
import {
  getEnum, EnumNames, getUrl, URLNames,
} from '@/config';
import { StoreDataNamespace } from '@/store/module/StoreData';
import { CartHelper } from '@/objects/CartObjects';
import { Icon, Loading } from '@/extendables/BaseComponents';

const QUERY_STORE_ID = 'store_id';
const QUERY_COMBOS_ARRAY = 'combos[]';
const QUERY_PRODUCTS_ARRAY = 'products[]';

export default {
  name: 'Cart',
  components: {
    Icon,
    Loading,
  },
  data() {
    return {
      items: [],
      showCart: false,
      changing: false,
      loading: false,
      cartHelper: null,
      cartText: {
        empty: 'Tu carrito está vacío...',
        filled: 'Te estás llevando...',
      },
    };
  },
  computed: {
    ...mapState(StoreDataNamespace, ['data', 'storeIdentifier', 'store_id']),
    emptyCartText() {
      return this.items.length > 0 ? this.cartText.filled : this.cartText.empty;
    },
    totalItems() {
      let quantity = 0;
      for (let i = 0; i < this.items.length; i += 1) {
        quantity += this.items[i].quantity;
      }

      return quantity;
    },
    totalPrice() {
      let price = 0;
      for (let i = 0; i < this.items.length; i += 1) {
        price += this.items[i].quantity * this.items[i].price;
      }

      EventManager.Trigger(
        getEnum(EnumNames.EventNames).ON_CART_ITEM_QUANTITY_CHANGE,
        this.totalItems,
      );

      return price;
    },
  },
  methods: {
    saveOnLocalStorage() {
      localStorage.setItem(
        `${this.storeIdentifier}_store_cart`,
        JSON.stringify([this.items, JSON.stringify(new Date())]),
      );
    },
    deleteLocalStorage() {
      localStorage.removeItem(`${this.storeIdentifier}_store_cart`);
    },
    getLocalStorage() {
      const localSt = JSON.parse(
        localStorage.getItem(`${this.storeIdentifier}_store_cart`),
      );
      if (localSt != null) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const localStDate = new Date(JSON.parse(localSt[1]));

        if (localStDate > yesterday) {
          [this.items] = localSt;
        }
      }
    },
    addToCart(id, productClass) {
      const scop = this;
      this.changing = true;
      setTimeout(() => {
        scop.changing = false;
      }, 1000);

      // Recorro todos los items en el carrito y si ya existe le sumo +1
      for (let i = 0; i < this.items.length; i += 1) {
        if (this.items[i].id === id && this.items[i].class === productClass) {
          this.qtPlus(this.items[i]);
          return;
        }
      }

      this.items.push(
        this.cartHelper.getCartObjectByProductId(id, productClass),
      );
    },
    qtMinus(item) {
      const newQty = item.quantity - 1;
      if (newQty > 0) {
        item.quantity = newQty;
      } else {
        this.deleteItem(item);
      }
    },
    qtPlus(item) {
      item.quantity += 1;
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
        this.saveOnLocalStorage();
      }
    },
    checkout() {
      if (this.items.length < 1) return;
      this.loading = true;

      const url = this.items.reduce((accumulator, currentValue) => {
        accumulator += `&${
          currentValue.class === 'bundle'
            ? [QUERY_COMBOS_ARRAY]
            : [QUERY_PRODUCTS_ARRAY]
        }`;
        accumulator += `=${currentValue.id},${currentValue.quantity}`;
        return accumulator;
      }, `${getUrl(URLNames.CHECKOUT)}?${[QUERY_STORE_ID]}=${this.store_id}`);

      this.deleteLocalStorage();
      window.location.href = url;
    },
    cartToggle() {
      this.showCart = !this.showCart;
      this.hideScrollBar();
    },
    hideScrollBar() {
      if (this.showCart) {
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
      } else document.getElementsByTagName('body')[0].style.overflowY = 'initial';
    },
    suscribeToEvents() {
      EventManager.Subscribe(
        getEnum(EnumNames.EventNames).ADD_TO_CART,
        (data) => {
          const [id, productClass] = data;
          this.addToCart(id, productClass);
        },
      );

      EventManager.Subscribe(getEnum(EnumNames.EventNames).ON_CART_TOGGLE, () => this.cartToggle());

      EventManager.Subscribe(
        getEnum(EnumNames.EventNames).ON_CART_ITEM_QUANTITY_CHANGE,
        () => this.saveOnLocalStorage(),
      );
    },
  },
  mounted() {
    this.getLocalStorage();
    this.suscribeToEvents();
    this.cartHelper = new CartHelper(this.data);
  },
};
</script>

<style scoped lang="scss">
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
  right: 0 !important;
  transition: ease all 0.5s;
}
.sidemenu {
  background-color: #fff;
  padding: 20px 0;
  position: fixed;
  right: -100%;
  bottom: 0;
  top: 0;
  height: 101%;
  width: 100%;
  transition: ease all 0.5s;
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
      color: #4d4d4d;
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
  .btn {
    margin-top: 15px;
    padding: 12px 0;
  }
  .cart_loader {
    width: 30px;
    fill: #fff;
    height: 30px;
  }
}
.open-cart {
  border: none;
  background: transparent;
  cursor: pointer;
  position: fixed;
  right: 30px;
  top: 15px;
  svg {
    width: 35px;
    height: 35px;
  }
  .items-count {
    border-radius: 50%;
    position: absolute;
    top: 20px;
    right: 3px;
    font-size: 13px;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    overflow: hidden;
    font-family: "Founders_Grotesk_Light", sans-serif;
    font-weight: 300;
    background-color: #000;
    color: #fff;
    z-index: 200;
  }
}
</style>
