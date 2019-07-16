<script>
import { EventManager } from '@/utils';
import { getEnum, EnumNames } from '@/config';

export default {
  name: 'AddToCartButton',
  props: {
    slug: {
      type: String,
    },
    id: {
      type: Number,
    },
    productType: {
      type: String,
    },
  },
  methods: {
    addToCart() {
      EventManager.trigger(getEnum(EnumNames.EventNames).ADD_TO_CART, this.id, this.type); // TODO: que el carrito pueda conseguir la imagen en base al tipo de producto
    },
    openLink() {
      this.$router.push(`/producto/${this.slug}`);
    },
  },
};
</script>
