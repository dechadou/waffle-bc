<script>
import { getPrice, getImage, isOutOfStock } from "@/utils/productTypesHelper";
import * as AddToCartButtons from "@/extendables/AddToCartButtonTypes";

export default {
  name: "ProductType",
  components: {
    ...AddToCartButtons
  },
  props: {
    type: {
      type: String,
      default: "Thumbnail"
    },
    data: {
      type: Object,
      required: true
    },
    openModules: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      articleList: null,
      singleImage: null,
      price: null,
      isOutOfStock: null,
      productId: null,
      productClass: null,
      internalLink: null
    };
  },
  beforeMount() {
    this.articleList =
      this.data.class === "bundle"
        ? this.data.products.map(x => x.articles).reduce((a, b) => a.concat(b))
        : this.data.articles;
    this.singleImage = getImage(this.data.media);
    this.price = getPrice(this.data);
    this.isOutOfStock = isOutOfStock(this.articleList, this.data.class);
    this.productId =
      this.data.class === "product" ? this.articleList[0].id : this.data.id;
    this.productClass =
      this.data.class === "product"
        ? this.articleList[0].class
        : this.data.class;

    const internalLinkClass =
      this.productClass === "article" ? "producto" : "combo";
    this.internalLink = this.$route.params.slug
      ? `/${this.$route.params.slug}/${internalLinkClass}/${this.data.slug ||
          ""}`
      : `/${internalLinkClass}/${this.data.slug || ""}`;
  }
};
</script>
