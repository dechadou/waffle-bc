<script>
import { EventManager } from '@/utils';
import { getEnum, EnumNames } from '@/config';

export default {
  name: 'AddToCartButton',
  props: {
    slug: String,
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

      this.$ga.event({
        eventCategory: 'click',
        eventAction: 'addToCart',
        eventLabel: this.slug,
      });
    },
    openLink() {
      this.$router.push(`/producto/${this.slug}`);
    },
  },
};
</script>
