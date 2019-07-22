/*
    Author: Javier Goldschmidt
    Company: Abre Cultura
    Date: 16/07/2019 (dd-mm-yyyy)
    Description: BaseComponents.js Keeps waffle's internal components overrides tidy
*/

// These are the default Base Components.
// If you want to override one of this components
// just comment the line of the component and
// put the new line in the User Overrides zone.

export { default as GlobalWarning } from '@/internal/GlobalWarning.vue';
export { default as Hero } from '@/internal/Hero.vue';
export { default as Icon } from '@/internal/Icon.vue';
export { default as LazyImage } from '@/internal/LazyImage.vue';
export { default as ProductCarousel } from '@/internal/ProductComponents/ProductCarousel.vue';
export { default as Profile } from '@/internal/Profile.vue';
export { default as PageShare } from '@/internal/PageShare.vue';
export { default as Cart } from '@/internal/Cart.vue';

// USER OVERRIDES
// example: export { default as Icon } from '@/components/Icon.vue';
