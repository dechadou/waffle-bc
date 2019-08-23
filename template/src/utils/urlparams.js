/*
    Author: Javier Goldschmidt
    Company: Abre Cultura
    Date: 10/07/2019 (dd-mm-yyyy)
    Description: Receives a param name and returns the get param value from the URL
*/

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
import 'url-search-params-polyfill';

const urlParams = new URLSearchParams(window.location.search);
const getParam = name => urlParams.get(name);
export default getParam;
