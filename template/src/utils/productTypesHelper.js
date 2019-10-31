/*
    Author: Javier Goldschmidt
    Company: Abre Cultura
    Date: 10/08/2019 (dd-mm-yyyy)
    Description: Utility functions for products
*/

// Expects an array of media objects.
// Returns the first element marked as primary media or the first element of the array if no primary media is found
export const getImage = (media) => {
  if (!media) throw new Error('[Waffle Error]: getImage() expects a valid parameter');
  const med = Object.values(media).sort((a, b) => {
    if (a.primary_media) return -1;
    if (b.primary_media) return 1;
    return 0;
  });

  return med.length > 0 ? med[0] : { type: 'image', url: 'http://via.placeholder.com/1367x1367' };
};

// Expects an array of articles
// Returns an array of attributes found in the articles
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

// Expects a list of articles and the productClass that they came from
// Returns bool
export const isOutOfStock = (articleList, productClass) => (productClass === 'product' ? articleList[0].stock < 1 : articleList.some(x => x.stock < 1));

// Expects a product object
// Returns its price (Number)
export const getPrice = data => Math.floor(data.class === 'product' ? data.articles[0].price : data.price);
