<script>
import { mapActions, mapState } from 'vuex';
import { CartActionTypes } from '@/store/module/Cart';
import { ThemeNamespace } from '@/store/module/Theme';
import { StoreDataNamespace } from '@/store/module/StoreData';
import { EventManager } from '@/utils';
import { getEnum, EnumNames } from '@/config';

class ProductID {
  constructor(id, productClass) {
    this.id = id;
    this.productClass = productClass;
  }
}

// @group ADDTOCARTBUTTON TYPES
// The base component for AddToCart Buttons. AddToCart Buttons should inherit from this component
// @vuese
export default {
  name: 'AddToCartButton',
  props: {
    // The product internal link
    link: String,
    // The product id
    id: Number,
    // The product class (example: product/bundle)
    productClass: String,
  },
  computed: {
    ...mapState(ThemeNamespace, ['themeConfig']),
    ...mapState(StoreDataNamespace, ['store_slug']),
  },
  methods: {
    ...mapActions({
      addToStoreCart: CartActionTypes.ADD_TO_CART,
    }),
    /**
     * @vuese
     * Generates a ProductID object based on the 'id' and 'productClass' props and passes it to the Cart vuex store
     * @arg toggleOtherModules: default to true. If true, it triggers the ON_RELATED_PRODUCTS_TOGGLE or ON_CART_TOGGLE event (depending on the theme).
     */
    addToCart(toggleOtherModules = true) {
      const eventNames = getEnum(EnumNames.EventNames);
      const productID = new ProductID(this.id, this.productClass);
      this.addToStoreCart(productID);

      if (toggleOtherModules) {
        if (this.productClass === 'article' && this.themeConfig.showRelatedProducts) {
          EventManager.Trigger(
            eventNames.ON_RELATED_PRODUCTS_TOGGLE,
            productID,
          );
        } else EventManager.Trigger(eventNames.ON_CART_TOGGLE);
      }

      if (this.$ga) {
        this.$ga.event({
          eventCategory: `waffle-${this.store_slug}`,
          eventAction: 'add-to-cart',
          eventLabel: `${this.id}_${this.productClass}`,
        });
      }
    },
    /**
     * @vuese
     * Pushes the prop 'link' to the router
     */
    openLink() {
      this.$router.push(this.link);
    },
  },
};
</script>
