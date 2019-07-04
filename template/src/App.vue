<template>
  <router-view/>
</template>

<style lang="scss">
@font-face {
  font-family: "Founders_Grotesk_Regular";
  src: url("~/assets/fonts/Founders_Grotesk_Regular/Founders_Grotesk_Regular.woff")
      format("woff"),
    url("~/assets/fonts/Founders_Grotesk_Regular/Founders_Grotesk_Regular.woff2")
      format("woff2");
}
@font-face {
  font-family: "Founders_Grotesk_Light";
  src: url("~/assets/fonts/Founders_Grotesk_Light/Founders_Grotesk_Light.woff")
      format("woff"),
    url("~/assets/fonts/Founders_Grotesk_Light/Founders_Grotesk_Light.woff2")
      format("woff2");
}

html {
  font-size: 10px;
  box-sizing: border-box;
}

body {
  font-family: "Founders_Grotesk_Regular", sans-serif !important;
  overflow-x: hidden;
}

p {
  font-family: "Founders_Grotesk_Light", sans-serif;
}

*,
*:before,
*:after {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-weight: normal;
  margin: 0;
}

ul,
ol {
  margin: 0;
  padding: 0;
}

img {
  display: block;
}

.container.extra-padding {
  padding-left: 30px;
  padding-right: 30px;
}

button {
  width: 100%;
  background: #000;
  border: 1px solid #000;
  color: #fff;
  padding: 12px 0;
  font-size: 21px;
  display: block;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;

  &:hover,
  &.disabled {
    background: #fff;
    color: #000;
    text-decoration: none;
  }
}

.price {
  font-size: 14px;
  margin-bottom: 5px;
  span {
    font-size: 11px;
    margin-right: 5px;
  }
}

input[type="text"] {
  font-size: 30px;
  color: #1d1d1b;
  border: none;
  border-bottom: 1px solid #c1c1c1;

  &:focus {
    box-shadow: none;
  }
}

.input-group {
  border-bottom: 1px solid #c1c1c1;

  input[type="text"] {
    border: none;
  }
  .input-group-text {
    border: none;
    background: none;
  }
}
</style>
