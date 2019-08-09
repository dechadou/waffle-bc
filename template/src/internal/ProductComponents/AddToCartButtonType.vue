<script>
import { mapActions } from 'vuex';
import { CartActionTypes } from '@/store/module/Cart';
import { EventManager } from '@/utils';
import { getEnum, EnumNames } from '@/config';

class ProductID {
  constructor(id, productClass){
    this.id = id;
    this.productClass = productClass;
  }
}

export default {
  name: 'AddToCartButton',
  props: {
    link: String,
    id: Number,
    productClass: String,
  },
  methods: {
    ...mapActions({
      addToStoreCart: CartActionTypes.ADD_TO_CART,
    }),
    addToCart() {
      this.addToStoreCart(new ProductID(this.id, this.productClass));
      EventManager.Trigger(getEnum(EnumNames.EventNames).ON_CART_TOGGLE);

      if (this.$ga) {
        this.$ga.event({
          eventCategory: 'click',
          eventAction: 'addToCart',
          eventLabel: this.link,
        });
      }
    },
    openLink() {
      this.$router.push(this.link);
    },
  },
};
</script>
