<script>
import { getPrice, getImage, isOutOfStock } from '@/utils/productTypesHelper';
import * as AddToCartButtons from '@/extendables/AddToCartButtonTypes';

export default {
  name: 'ProductType',
  components: {
    ...AddToCartButtons,
  },
  props: {
    type: {
      type: String,
      default: 'Thumbnail',
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      articleList: null,
      singleImage: null,
      price: null,
      isOutOfStock: null,
    };
  },
  beforeMount() {
    this.articleList = this.data.class === 'bundle' ? this.data.products.map(x => x.articles).reduce((a, b) => a.concat(b)) : this.data.articles;
    this.singleImage = getImage(this.data.media);
    this.price = getPrice(this.data);
    this.isOutOfStock = isOutOfStock(this.articleList, this.data.class);
  },
  filters: {
    displayAuthors: authors => (!authors
      ? ''
      : authors
        .filter((v, i) => authors.indexOf(v) === i)
        .reduce((acc, current) => (acc === '' ? '' : ` + ${current.name}`))),
  },
};
</script>
