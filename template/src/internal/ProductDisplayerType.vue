<script>
import { mapState } from "vuex";
import { ThemeNamespace } from "@/store/module/Theme";
import * as Products from "@/extendables/ProductTypes";

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
