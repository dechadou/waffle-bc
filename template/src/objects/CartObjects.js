import { getImage } from '@/utils/productTypesHelper';

export class CartObject {
  constructor(id, name, price, quantity, media, productClass, attributes) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.media = media;
    this.class = productClass;
    this.attributes = attributes;
  }
}

export class CartHelper {
  constructor(data) {
    this.data = data;
  }

  getCartObjectByProductId(id, productClass) {
    switch (productClass) {
      case 'article': {
        const productArticlePair = this.getProductArticlePairByArticleId(id);
        return new CartObject(
          id,
          productArticlePair.product.name,
          productArticlePair.article.price,
          1,
          getImage(productArticlePair.product.media),
          productClass,
          productArticlePair.article.atributtes,
        );
      }

      case 'bundle': {
        const bundle = this.getBundleById(id);
        return new CartObject(
          id,
          bundle.name,
          bundle.price,
          1,
          getImage(bundle.media),
          productClass,
          null,
        );
      }

      default:
        throw new Error('Unexpected product class');
    }

  }

  getProductArticlePairByArticleId(id) {
    for (let i = 0; i < this.data.products.length; i += 1) {
      for (let j = 0; j < this.data.products[i].articles.length; j += 1) {
        if (this.data.products[i].articles[j].id === id) {
          return {
            product: this.data.products[i],
            article: this.data.products[i].articles[j],
          };
        }
      }
    }
    return null;
  }

  getBundleById(id) {
    return this.data.bundles.find(x => x.id === id);
  }
}
