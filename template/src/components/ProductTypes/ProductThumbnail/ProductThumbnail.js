export default {
  name: 'ProductThumbnail',
  props: [
    'type',
    'name',
    'slug',
    'price',
    'description',
    'media',
    'selectedArt',
    'articleList',
    'attributeList',
    'isBundle',
  ],
  data() {
    return {
      image: null,
      selectedArticle: null,
      selected: [''],
    };
  },
  created() {
    this.selectedArticle = this.selectedArt;
    this.getImage();
  },
  watch: {
    selected() {
      this.selectedArticle = this.getArticleBySelectedOptions();
    },
  },
  methods: {
    getArticleBySelectedOptions() {
      const sel = this.selected.find(el => el === '');
      if (sel === '' || this.selected.length === 0) return null;

      let filteredArticles = this.articleList;

      this.attributeList.forEach((attribute) => {
        filteredArticles = filteredArticles.find(
          el => el.atributtes[attribute[0]] === this.selected[attribute[1]],
        );
      });

      return filteredArticles;
    },
    getOptions(attribute) {
      const options = [];
      this.articleList.forEach((article) => {
        if (article.atributtes[attribute]) options.push(article.atributtes[attribute]);
      });
      return options;
    },
    getCarouselImages() {
      const med = Object.values(this.media);

      med.forEach((media) => {
        if (media.primary_media) this.carouselImages.unshift(media.url);
        else this.carouselImages.push(media.url);
      });
    },
    getImage() {
      const med = Object.values(this.media);
      // Si hay imagen marcada como primary media
      med.forEach((media) => {
        if (media.primary_media) {
          this.image = media.url;
        }
      });

      if (this.image) return;

      // Si no hay imagenes marcada como primary media
      med.forEach((media) => {
        this.image = media.url;
      });

      if (this.image) return;

      // Si no hay imagenes retorno un placeholder
      this.image = 'http://via.placeholder.com/1367x1367';
    },
  },
};
