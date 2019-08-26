/*
    Author: Javier Goldschmidt
    Company: Abre Cultura
    Date: 10/07/2019 (dd-mm-yyyy)
    Description: Utility functions for making requests to the API
*/

import 'whatwg-fetch';
import { URLNames, getUrl } from '../config';

export const get = async (url) => {
  const response = await window.fetch(url);
  if (response.ok) return response.json();
  throw new Error('Network response was not ok.');
};

export const post = async (url, config) => {
  const response = await window.fetch(url, { ...{ method: 'POST', headers: { 'Content-Type': 'application/json' } }, ...config });
  if (response.ok) return response.json();
  throw new Error('Network response was not ok.');
};

export const api = {
  get: url => get(`${getUrl(URLNames.API)}${url}`),
  post: (url, config) => post(`${getUrl(URLNames.API)}${url}`, config),
};

export const s3 = url => get(`${getUrl(URLNames.S3)}${url}`);
