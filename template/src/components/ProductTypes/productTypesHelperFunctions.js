export const getImage = (media) => {
  if (!media) throw new Error('[Waffle Error]: getImage() expects a valid parameter');
  const med = Object.values(media).sort(x => x.primary_media);
  return med.length > 0 ? med[0].url : 'http://via.placeholder.com/1367x1367';
};

export const getAttributeList = (articleList) => {
  if (!articleList) throw new Error('[Waffle Error]: getAttributeList() expects a valid parameter');
  const attributeList = [];
  if (articleList[0].atributtes.length > 0) {
    let ind = 0;
    Object.keys(articleList[0].atributtes).forEach((attribute) => {
      attributeList.push([attribute, ind]);
      ind += 1;
    });
  }

  return attributeList;
};

export const isOutOfStock = (articleList, productClass) => (productClass === 'producto' ? articleList[0].stock < 1 : articleList.some(x => x.stock < 1));
export const getPrice = data => Math.floor(data.class === 'producto' ? data.articles[0].price : data.price);
