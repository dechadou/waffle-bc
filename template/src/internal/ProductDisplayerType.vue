<script>
import { mapState } from "vuex";
import { ThemeNamespace } from "@/store/module/Theme";
import * as Products from "@/extendables/ProductTypes";

// @group PRODUCTDISPLAYER TYPES
// The base component for Product Displayers. Product Displayers should inherit from this component
// @vuese
export default {
  name: "ProductDisplayerType",
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  components: {
    ...Products
  },
  computed: {
    ...mapState(ThemeNamespace, ["themeConfig"])
  }
};
</script>
