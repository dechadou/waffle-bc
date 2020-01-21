<script>
import { mapState } from 'vuex';
import { ThemeNamespace } from '@/store/module/Theme';
import { StoreDataNamespace } from '@/store/module/StoreData';
import * as Products from '@/extendables/ProductTypes';

// @group PRODUCTDISPLAYER TYPES
// The base component for Product Displayers. Product Displayers should inherit from this component
// @vuese
export default {
  name: 'ProductDisplayerType',
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  components: {
    ...Products,
  },
  computed: {
    ...mapState(ThemeNamespace, ['themeConfig']),
    ...mapState(StoreDataNamespace, ['currency']),
    displayProducts() {
      return this.products.filter(x => this.canBeDisplayed(x));
    },
  },
  methods: {
    canBeDisplayed(data) {
      const v2Object = data.class === 'product' ? data.articles[0].v2 : data.v2;

      if (!v2Object) {
        if (this.currency === 'ars') return true;
        return false;
      }

      if (v2Object.price.some(x => x.coin_unit === this.currency)) return true;

      return false;
    },
  },
};
</script>
