<template>
  <div v-if="data != null">
    <!--<ProductInternal
      v-if="type == 'internal'"
      :type="type"
      :name="data.name"
      :slug="data.slug"
      :price="getPrice()"
      :description="data.description"
      :media="data.media"
      :agentsActors="data.agentes_actores"
      :additionalInformation="data.informacion_adicional"
      :selectedArt="selectedArticle"
      :articleList="articleList"
      :attributeList="attributeList"
      :isBundle="isBundle"
    />-->
    <ProductThumbnail
      :data="data"
      :articleList="articleList"
      :isBundle="true"
      :slider="slider"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { StoreDataGetterTypes } from '../store/module/StoreData';
import ProductThumbnail from '@/components/ProductTypes/ProductThumbnail.vue';

export default {
  name: 'Bundle',
  components: {
    ProductThumbnail,
  },
  props: {
    type: {
      type: String,
      default: 'thumbnail',
    },
    id: {
      type: Number,
      required: true,
    },
    slider: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      articleList: null,
      data: null,
    };
  },
  methods: {
    ...mapGetters({
      getProductListByBundleId: StoreDataGetterTypes.GET_PRODUCT_LIST_BY_BUNDLE_ID,
      getArticleListByProductId: StoreDataGetterTypes.GET_ARTICLE_LIST_BY_PRODUCT_ID,
      getBundle: StoreDataGetterTypes.GET_BUNDLE,
    }),
    getArticles(id) {
      return this.getProductListByBundleId()(id).map(x => this.getArticleListByProductId()(x.id));
    } ,
  },
  created(){
    this.articleList = this.getArticles(this.id);
    this.data = this.getBundle()(this.id);
  },
};
</script>
