/*
    Author: Javier Goldschmidt
    Company: Abre Cultura
    Date: 16/07/2019 (dd-mm-yyyy)
    Description: BaseComponents.js Keeps waffle's internal components overrides tidy
*/

/* These are the default Base Components. If you want to override one of them
 * just comment the line of the internal component and put the new line below
 * the commented line the new component override has to have the same name
 * as the commented component */

export { default as Icon } from '@/internal/Icon.vue';
export { default as AddToCartButtonType } from '@/internal/ProductComponents/AddToCartButtonType.vue';
export { default as FooterType } from '@/internal/FooterType.vue';
export { default as ProductDisplayerType } from '@/internal/ProductDisplayerType.vue';
export { default as ProductType } from '@/internal/ProductType.vue';
export { default as GlobalWarning } from '@/internal/GlobalWarning.vue';
export { default as Hero } from '@/internal/Hero.vue';
export { default as LazyImage } from '@/internal/LazyImage.vue';
export { default as ProductCarousel } from '@/internal/ProductComponents/ProductCarousel.vue';
export { default as Profile } from '@/internal/Profile.vue';
export { default as PageShare } from '@/internal/PageShare.vue';
export { default as Loading } from '@/internal/Loading.vue';
export { default as Cart } from '@/internal/Cart.vue';
