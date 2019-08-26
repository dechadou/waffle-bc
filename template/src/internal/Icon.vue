<template>
  <svg
    :style="`
      ${width ? `width:${width};` : ''}
      ${height ? `height:${height};` : ''}
      ${iconFill ? `fill:${iconFill};` : ''}
      ${iconStroke ? `stroke:${iconStroke};` : ''}
    `"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
  </svg>
</template>

<script>
// @group UTILITIES
// Displays an svg icon saved on assets/icons
// @vuese
export default {
  name: 'Icon',
  props: {
    // The filename
    name: {
      type: String,
      required: true,
    },
    // The svg title for crawlers and screen-readers
    title: String,
    width: String,
    height: String,
    // css hex fill color override
    iconFill: String,
    // css hex stroke color override
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
