<script>
import { EventManager } from "@/utils";
import { getEnum, EnumNames } from "@/config";

export default {
  name: "AddToCartButton",
  props: {
    slug: {
      type: String
    },
    id: {
      type: Number
    },
    productClass: {
      type: String
    }
  },
  methods: {
    addToCart() {
      EventManager.Trigger(
        getEnum(EnumNames.EventNames).ADD_TO_CART,
        this.id,
        this.productClass
      );

      EventManager.Trigger(getEnum(EnumNames.EventNames).ON_CART_TOGGLE);
    },
    openLink() {
      this.$router.push(`/producto/${this.slug}`);
    }
  }
};
</script>
