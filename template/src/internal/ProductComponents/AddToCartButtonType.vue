<script>
import { EventManager } from '@/utils';
import { getEnum, EnumNames } from '@/config';

export default {
  name: 'AddToCartButton',
  props: {
    link: String,
    id: Number,
    productClass: String,
  },
  methods: {
    addToCart() {
      EventManager.Trigger(
        getEnum(EnumNames.EventNames).ADD_TO_CART,
        this.id,
        this.productClass,
      );

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
