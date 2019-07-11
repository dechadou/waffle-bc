/*
    Author: Javier Goldschmidt
    Company: Abre Cultura
    Date: 10/07/2019 (dd-mm-yyyy)
    Description: Utility functions for triggering and suscribing to events
*/

import Vue from 'vue';

const EventManager = new Vue();
const trigger = (event, ...params) => EventManager.$emit(event, params);
const subscribe = (event, callback) => EventManager.$on(event, params => callback(params));

export default {
  trigger,
  subscribe,
};
