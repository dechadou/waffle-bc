<script>
import { mapActions, mapState } from 'vuex';
import { CartActionTypes } from '@/store/module/Cart';
import { ThemeNamespace } from '@/store/module/Theme';
import { EventManager } from '@/utils';
import { getEnum, EnumNames } from '@/config';

class ProductID {
  constructor(id, productClass) {
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
  computed: {
    ...mapState(ThemeNamespace, ['themeConfig']),
  },
  methods: {
    ...mapActions({
      addToStoreCart: CartActionTypes.ADD_TO_CART,
    }),
    addToCart(toggleOtherModules = true) {
      const eventNames = getEnum(EnumNames.EventNames);
      const productID = new ProductID(this.id, this.productClass);
      this.addToStoreCart(productID);

      if (toggleOtherModules) {
        if (this.themeConfig.showRelatedProducts) {
          EventManager.Trigger(
            eventNames.ON_RELATED_PRODUCTS_TOGGLE,
            productID,
          );
        } else EventManager.Trigger(eventNames.ON_CART_TOGGLE);
      }

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
