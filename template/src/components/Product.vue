<template>
  <div v-if="data != null">
    <ProductInternal
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
    />
    <ProductThumbnail
      v-else
      :type="type"
      :name="data.name"
      :slug="data.slug"
      :price="getPrice()"
      :description="data.description"
      :agentsActors="data.agentes_actores"
      :media="data.media"
      :selectedArt="selectedArticle"
      :articleList="articleList"
      :attributeList="attributeList"
      :isBundle="isBundle"
      :slider="slider"
    />
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: ['type', 'data', 'slider'],
  data() {
    return {
      selectedArticle: null,
      articleList: [],
      attributeList: [],
      selected: [],
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
    getOptions(attribute) {
      const options = [];
      this.articleList.forEach((article) => {
        options.push(article.atributtes[attribute]);
      });
      return options;
    },
    getArticles() {
      if (this.isBundle) {
        Object.values(this.data.productos).forEach((product) => {
          Object.values(product.articulos).forEach((article) => {
            this.articleList.push(article);
            this.selectedArticle = this.data;
          });
        });
        return;
      }

      this.articleList = Object.values(this.data.articulos);
      if (this.articleList[0].atributtes.length === 0) {
        [this.selectedArticle] = this.articleList;
        return;
      }

      let ind = 0;
      Object.keys(this.articleList[0].atributtes).forEach((attribute) => {
        this.attributeList.push([attribute, ind]);
        this.selected.push('');
        ind += 1;
      });
    },
    getPrice() {
      let price;
      if (this.selectedArticle) ({ price } = this.selectedArticle);
      else ({ price } = this.data);

      return Math.floor(price);
    },
  },
};
</script>