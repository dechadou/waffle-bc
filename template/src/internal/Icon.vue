<template>
  <svg
    :style="`
      ${width ? `width:${width};` : ''}
      ${height ? `height:${height};` : ''}
      ${iconFill ? `fill:${iconFill};` : ''}
      ${iconStroke ? `fill:${iconStroke};` : ''}
    `"
    :class="className"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
  </svg>
</template>

<script>
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    title: String,
    width: String,
    height: String,
    iconFill: String,
    iconStroke: String,
  },
  computed: {
    iconPath() {
      let icon = require(`@/assets/icons/${this.name}.svg`);
      if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        icon = icon.default;
      }

      return icon.url;
    },

    className() {
      return `svg-icon svg-icon--${this.name}`;
    },
  },
};
</script>
