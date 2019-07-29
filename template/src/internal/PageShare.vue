<template>
  <section id="PageShare">
    <h1 v-html="title" v-if="title"/>
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <div class="row">
          <a
            v-for="(button, index) in buttons"
            :key="index"
            @click="openShare(button, $event)"
            target="_blank"
            :class="{ 'd-md-none': !button.desktop_visible }"
            class="btn d-block page-share col-12 col-md ml-3 mr-3"
          >
            <span>Compartir en</span>
            <Icon :name="button.icon" class="share-icon" width="25px" height="25px"/>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Icon } from "@/extendables/BaseComponents";

export default {
  name: "PageShare",
  components: {
    Icon
  },
  props: {
    title: String,
    shareText: String
  },
  data() {
    return {
      pageUrl: `https://${location.host}${location.pathname}`,
      buttons: [
        {
          name: "Facebook",
          url: "https://www.facebook.com/sharer/sharer.php?u=",
          icon: "fb",
          prepend: "",
          append: "",
          desktop_visible: true
        },
        {
          name: "Twitter",
          url: "https://twitter.com/intent/tweet?url=",
          icon: "tw",
          prepend: "",
          append: `&text=${this.shareText || ""}`,
          desktop_visible: true
        },
        {
          name: "Whatsapp",
          url: "whatsapp://send?text=",
          icon: "wpp",
          prepend: `${this.shareText || ""} `,
          append: "",
          desktop_visible: false
        }
      ]
    };
  },
  methods: {
    openShare(button, event) {
      event.preventDefault();
      window.open(
        `${button.url}${button.prepend || ""}${this.pageUrl}${button.append ||
          ""}`,
        "",
        "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
      );

      if (this.$ga) {
        this.$ga.event({
          eventCategory: "click",
          eventAction: "share",
          eventLabel: button.name
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  margin: 30px 0;
}
h1 {
  font-size: 4rem;
  margin: 0.5rem 0.5rem 2rem;
  padding: 5px 0 20px;
  font-family: "Founders_Grotesk_Regular", sans-serif;
  font-weight: 500;
  line-height: 1.2;
  color: $abre_dark_grey;
  text-align: center;
}
a {
  margin-bottom: 15px;
  span {
    position: relative;
    bottom: 3px;
  }
}
.share-icon {
  position: relative;
  left: 7px;
  top: 3px;
  fill: #fff;
}

a:hover .share-icon {
  fill: #000;
}
</style>
