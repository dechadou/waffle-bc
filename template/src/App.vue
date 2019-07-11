<style src='./assets/styles/bootstrap-grid.min.css'></style>
<style src='./assets/styles/animate.min.css'></style>

<template>
  <router-view v-if="isLoaded"/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { StoreDataActionTypes, StoreDataGetterTypes } from './store/module/StoreData';
import { getVariable, VariableNames } from './config';

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      isLoaded: StoreDataGetterTypes.IS_LOADED,
    }),
  },
  created() {
    this.fetchStoreData(this.$route.params.slug || getVariable(VariableNames.DefaultSlug));
  },
  methods: {
    ...mapActions({
      fetchStoreData: StoreDataActionTypes.FETCH_STORE_DATA,
    }),
  },
};
</script>

<style lang="scss">
@import "assets/styles/_variables.scss";

@font-face {
  font-family: "Founders_Grotesk_Regular";
  src: url("./assets/fonts/Founders_Grotesk_Regular/Founders_Grotesk_Regular.woff")
      format("woff"),
    url("./assets/fonts/Founders_Grotesk_Regular/Founders_Grotesk_Regular.woff2")
      format("woff2");
}
@font-face {
  font-family: "Founders_Grotesk_Light";
  src: url("./assets/fonts/Founders_Grotesk_Light/Founders_Grotesk_Light.woff")
      format("woff"),
    url("./assets/fonts/Founders_Grotesk_Light/Founders_Grotesk_Light.woff2")
      format("woff2");
}

html {
  font-size: 10px;
  box-sizing: border-box;
}

body {
  font-family: "Founders_Grotesk_Regular", sans-serif !important;
  margin: 0;
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

button {
  width: 100%;
  background: $abre-black;
  border: 1px solid $abre-black;
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
    color: $abre-black;
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
  border-bottom: 1px solid $abre-light-grey;

  &:focus {
    box-shadow: none;
  }
}

.input-group {
  border-bottom: 1px solid $abre-light-grey;

  input[type="text"] {
    border: none;
  }
  .input-group-text {
    border: none;
    background: none;
  }
}
</style>