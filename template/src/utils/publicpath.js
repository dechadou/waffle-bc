/* eslint-disable camelcase */
/* eslint-disable no-undef */

/*
    Author: Javier Goldschmidt
    Company: Abre Cultura
    Date: 10/07/2019 (dd-mm-yyyy)
    Description: Changes the default hardcoded publicPath for a dynamic one if it exists
*/
if (typeof webpackPublicPath !== 'undefined') __webpack_public_path__ = webpackPublicPath;
