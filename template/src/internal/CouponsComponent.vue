<template>
  <!-- COUPON BUTTON -->
  <div class="row no-gutters coupon" :class="[{ 'on-focus': couponInputFocus }]">
    <div class="col-12 col-md-8 offset-md-2">
      <div class="coupon-input">
        <div class="row no-gutters">
          <div class="col-5">
            <p>Ingresá tu código:</p>
          </div>
          <div class="col-7">
            <input
              id="couponInput"
              type="text"
              name="fname"
              :disabled="searching || inputLocked"
              @focus="couponInputFocus = true"
              @blur="couponInputFocus = false"
              @input='evt=>couponInputText=evt.target.value'
              v-model="couponInputText"
            >
            <div class="status-icons" v-show="couponInputText">
              <Loading v-show="!state"/>
              <TimesIcon v-show="state === 'invalid'"/>
              <CheckIcon v-show="state === 'valid'"/>
            </div>
            <p class="error">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { EventManager } from "@/utils";
import { getEnum, EnumNames } from "@/config";
import { Request } from "@/utils";
import { Loading } from "@/extendables/BaseComponents";
import { StoreDataNamespace } from "@/store/module/StoreData";
import { CartNamespace } from "@/store/module/Cart";
import { CartMutationTypes } from "@/store/module/Cart";
import CheckIcon from "@/assets/icons/greencheck.svg";
import TimesIcon from "@/assets/icons/times.svg";

// @group INTERNAL COMPONENTS
// Takes the coupon input from the user and fetches the coupon data from the API
// @vuese
export default {
  name: "CouponsComponent",
  components: {
    Loading,
    CheckIcon,
    TimesIcon
  },
  data() {
    return {
      couponInputFocus: false,
      timer: null,
      couponInputText: "",
      state: null,
      searching: false,
      error: null,
      inputLocked: false,
    };
  },
  computed: {
    ...mapState(StoreDataNamespace, ["authToken", "coupon"]),
    ...mapState(CartNamespace, ["couponCode"]),
  },
  watch: {
    couponInputText() {
      if (this.searching || !this.couponInputText) return;
      this.error = null;
      this.state = null;

      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(this.searchCode, 1500);
    },
    coupon(value) {
      if (!this.couponInputText && value && value.discount) {
        this.couponInputText = value.discount;
      }
    },
  },
  mounted(){
    if (this.couponCode) {
      this.couponInputText = this.couponCode;
      this.inputLocked = true;
    }
  },
  methods: {
    ...mapMutations({
      setCoupon: CartMutationTypes.SET_COUPON
    }),
    searchCode() {
      if (this.searching || !this.couponInputText) return;
      this.searching = true;
      const coupon = this.couponInputText;
      Request.api
        .post("coupon/availability", {
          body: JSON.stringify({ coupon }),
          headers: {
            "Content-Type": "application/json",
            Token: this.authToken
          }
        })
        .then(response => this.addCoupon(coupon, response.data))
        .catch(error => error.then(x => this.addError(x.error.message)));
    },
    addCoupon(coupon, { discount }) {
      if (!this.couponInputText) return;
      this.searching = false;
      this.state = "valid";
      this.setCoupon({ coupon, discount });
    },
    addError(error) {
      if (!this.couponInputText) return;
      this.searching = false;
      this.error = error;
      this.state = "invalid";
    }
  }
};
</script>

<style scoped lang="scss">
p {
  color: #c4c4c4;
  font-size: 5vw;
  margin-top: 10px;
  border: none;
  &.error {
    font-size: 14px;
    text-transform: uppercase;
    color: red;
    text-align: center;
  }
  @include md-up {
    font-size: 20px;
  }
}
button {
  margin-top: 10xp;
}
.coupon {
  margin-top: 10px;
  p {
    margin-top: 8px;
  }
  .status-icons {
    background: white;
    width: 42px;
    height: 42px;
    position: absolute;
    top: -1px;
    right: 0;
    padding: 6px;
  }
}
input[type="text"] {
  font-size: 21px;
  padding: 5px 0;
  width: 100%;
  outline: none;
}
.on-focus{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10000;
  background: #fff;
  padding: 15px;

  @include md-up{
    padding: 0;
    bottom: none;
    left: none;
    position: static;
    display: block;
  }
}
</style>
