<template>
  <figure v-lazyload class="image__wrapper" height="100%">
    <svg
      data-v-4edb8b24
      viewBox="0 0 400 400"
      version="1.1"
      preserveAspectRatio="xMidYMid meet"
      class="loader"
    >
      <rect
        data-v-4edb8b24
        :clip-path="`url(#cilp-path-${uid})`"
        x="0"
        y="0"
        width="400"
        height="400"
        :style="`fill: url(&quot;#linear-gradient-${uid}&quot;);`"
      ></rect>
      <defs data-v-4edb8b24>
        <clipPath data-v-4edb8b24 :id="`cilp-path-${uid}`">
          <rect data-v-4edb8b24 x="0" y="0" rx="5" ry="5" width="400" height="400"></rect>
        </clipPath>
        <linearGradient data-v-4edb8b24 :id="`linear-gradient-${uid}`">
          <stop data-v-4edb8b24 offset="-1.98749" stop-color="#f9f9f9" stop-opacity="1">
            <animate
              data-v-4edb8b24
              attributeName="offset"
              values="-2; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop data-v-4edb8b24 offset="-1.48749" stop-color="#ecebeb" stop-opacity="1">
            <animate
              data-v-4edb8b24
              attributeName="offset"
              values="-1.5; 1.5"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop data-v-4edb8b24 offset="-0.987493" stop-color="#f9f9f9" stop-opacity="1">
            <animate
              data-v-4edb8b24
              attributeName="offset"
              values="-1; 2"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
    <img class="image__item" :data-url="source" :class="cssClasses" :alt="description">
  </figure>
</template>

<script>
let uid = 0;
export default {
  name: "LazyImage",
  props: {
    source: {
      type: String,
      required: true
    },
    cssClasses: String,
    description: String
  },
  data() {
    uid += 1;
    return {
      loaded: false,
      uid: `lazy-${uid}`
    };
  },
  directives: {
    lazyload: {
      inserted: el => {
        function loadImage() {
          const imageElement = Array.from(el.children).find(
            elem => elem.nodeName === "IMG"
          );
          if (imageElement) {
            imageElement.addEventListener("load", () => {
              setTimeout(() => el.classList.add("loaded"), 100);
            });
            imageElement.addEventListener("error", () =>
              console.error(
                `[Waffle Error]: Image URL ${
                  imageElement.dataset.url
                } is invalid`
              )
            );
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
        if (window.IntersectionObserver) {
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
.loaded {
  .loader {
    display: none;
  }
  img {
    display: block !important;
  }
}
.loader {
  padding: 30px;
  display: block;
  width: 100%;
}
</style>
