<template>
  <figure v-lazyload class="image__wrapper" height="100%">
    <content-loader class="loader"/>
    <img class="image__item" :data-url="source" :class="cssClasses" :alt="description">
  </figure>
</template>

<script>
import { ContentLoader } from "vue-content-loader";
export default {
  name: "LazyImage",
  components: {
    ContentLoader
  },
  props: {
    source: {
      type: String,
      required: true
    },
    cssClasses: {
      type: String
    },
    description: {
      type: String
    }
  },
  data() {
    return {
      loaded: false
    };
  },
  directives: {
    lazyload: {
      inserted: el => {
        function loadImage() {
          const imageElement = Array.from(el.children).find(
            el => el.nodeName === "IMG"
          );
          if (imageElement) {
            imageElement.addEventListener("load", () => {
              setTimeout(() => el.classList.add("loaded"), 100);
            });
            imageElement.addEventListener("error", () => console.log("error"));
            imageElement.src = imageElement.dataset.url;
          }
        }

        function handleIntersect(entries, observer) {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadImage();
              observer.unobserve(el);
            }
          });
        }

        function createObserver() {
          const options = {
            root: null,
            threshold: "0"
          };
          const observer = new IntersectionObserver(handleIntersect, options);
          observer.observe(el);
        }
        if (window["IntersectionObserver"]) {
          createObserver();
        } else {
          loadImage();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  display: none !important;
  width: 100%;
}
.loaded img {
  display: block !important;
}
.loader {
  position: relative;
  top: 0;
}
.loaded .loader {
  display: none;
}
</style>

