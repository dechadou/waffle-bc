<script>
import { mapState } from 'vuex';
import { getEnum, EnumNames } from '@/config';
import { StoreDataNamespace } from '@/store/module/StoreData';
import {
  getPrice, getFakePrice, getImage, isOutOfStock,
} from '@/utils/productTypesHelper';
import * as AddToCartButtons from '@/extendables/AddToCartButtonTypes';

// @group PRODUCT TYPES
// The base component for Products. Products should inherit from this component
// @vuese
export default {
  name: 'ProductType',
  components: {
    ...AddToCartButtons,
  },
  props: {
    // The product data
    data: {
      type: Object,
      required: true,
    },
    // Whether it should open modules or not
    openModules: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      articleList: null,
      singleImage: null,
      price: null,
      fakePrice: null,
      isOutOfStock: null,
      productId: null,
      productClass: null,
      internalLink: null,
      currencySymbol: null,
    };
  },
  watch: {
    currency(value) {
      this.price = getPrice(this.data, value);
      this.currencySymbol = getEnum(EnumNames.CurrencySymbols)[value];
    },
  },
  computed: {
    ...mapState(StoreDataNamespace, ['currency']),
  },
  beforeMount() {
    this.articleList = this.data.class === 'bundle'
      ? this.data.products.map(x => x.articles).reduce((a, b) => a.concat(b))
      : this.data.articles;
    this.singleImage = getImage(this.data.media);
    this.price = getPrice(this.data, this.currency);
    this.fakePrice = getFakePrice(this.data, this.currency);
    this.currencySymbol = getEnum(EnumNames.CurrencySymbols)[this.currency];
    this.isOutOfStock = isOutOfStock(this.articleList, this.data.class);
    this.productId = this.data.class === 'product' ? this.articleList[0].id : this.data.id;
    this.productClass = this.data.class === 'product'
      ? this.articleList[0].class
      : this.data.class;

    const internalLinkClass = this.productClass === 'article' ? 'producto' : 'combo';
    this.internalLink = this.$route.params.slug
      ? `/${this.$route.params.slug}/${internalLinkClass}/${this.data.slug
          || ''}`
      : `/${internalLinkClass}/${this.data.slug || ''}`;
  },
};
</script>
