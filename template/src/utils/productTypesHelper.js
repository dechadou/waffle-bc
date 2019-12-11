/*
    Author: Javier Goldschmidt
    Company: Abre Cultura
    Date: 10/08/2019 (dd-mm-yyyy)
    Description: Utility functions for products
*/
import { getVariable, VariableNames } from '@/config';

// Expects an array of media objects.
// Returns the first element marked as primary media or the first element of the array if no primary media is found
export const getImage = (media) => {
  if (!media) throw new Error('[Waffle Error]: getImage() expects a valid parameter');
  const med = Object.values(media).sort((a, b) => {
    if (a.primary_media) return -1;
    if (b.primary_media) return 1;
    return 0;
  });

  const singleImage = med.length > 0 ? med[0] : { type: 'image', url: 'http://via.placeholder.com/1367x1367' };
  if (!singleImage.type) singleImage.type = 'image';
  return singleImage;
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
export const getPrice = (data) => {
  let finalPrice = null;
  const v2Prices = data.class === 'product' ? data.articles[0].v2.price : data.v2.price;

  // if there are v2 prices
  if (v2Prices) {
    const defaultCurrency = getVariable(VariableNames.DefaultCurrency);
    const currencyObject = v2Prices.find(x => x.coin_unit === defaultCurrency);
    if (currencyObject) finalPrice = currencyObject.price;
  }

  // if there aren't v2 prices or there are none with the default currency: fallback to v1 currency
  if (!finalPrice) {
    finalPrice = data.class === 'product' ? data.articles[0].price : data.price;
  }

  // If finalPrice is null, return null, else make sure finalPrice is a number and return it
  // Not checking with !finalPrice because it is ok for a price to be 0.00
  // Not doing "return +finalPrice || null" because the + sign automatically converts null to 0, which is a valid price
  return finalPrice === null ? null : +finalPrice;
};
