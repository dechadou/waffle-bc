<template>
  <section id="PageShare">
    <h1 v-html="title" v-if="title"/>
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <div class="row">
          <div
            class="col-12 col-md ml-md-3 mr-md-3"
            :class="{ 'd-md-none': !button.desktopVisible }"
            v-for="(button, index) in buttons"
            :key="index"
          >
            <a @click="openShare(button, $event)" class="btn d-block page-share">
              <span>Compartir en</span>
              <Icon :name="button.icon" class="share-icon" width="25px" height="25px"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Icon } from '@/extendables/BaseComponents';

class PageShareButton {
  constructor(name, url, icon, prepend, append, desktopVisible) {
    this.name = name;
    this.url = url;
    this.icon = icon;
    this.prepend = prepend;
    this.append = append;
    this.desktopVisible = desktopVisible;
  }

  makeUrl(pageUrl) {
    return `${this.url}${this.prepend || ''}${pageUrl}${this.append || ''}`;
  }
}

// @group INTERNAL COMPONENTS
// Displays the page share buttons
// @vuese
export default {
  name: 'PageShare',
  components: {
    Icon,
  },
  props: {
    // Call to action title
    title: String,
    // Share text for twitter
    shareText: String,
  },
  data() {
    return {
      pageUrl: `https://${window.location.host}${window.location.pathname}`,
      buttons: [
        new PageShareButton(
          'Facebook',
          'https://www.facebook.com/sharer/sharer.php?u=',
          'fb',
          '',
          '',
          true,
        ),
        new PageShareButton(
          'Twitter',
          'https://twitter.com/intent/tweet?url=',
          'tw',
          '',
          `&text=${this.shareText || ''}`,
          true,
        ),
        new PageShareButton(
          'Whatsapp',
          'whatsapp://send?text=',
          'wpp',
          `${this.shareText || ''} `,
          '',
          false,
        ),
      ],
    };
  },
  methods: {
    /**
     * @vuese
     * Opens a share popup to the selected social network
     * @arg button: expects a PageShareButton object
     * @arg event: excepts the OnClick event of the anchor tag that has been pressed
     */
    openShare(button, event) {
      event.preventDefault();
      const config = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600';
      window.open(button.makeUrl(this.pageUrl), '', config);

      // Trigger Analytics Event
      if (this.$ga) {
        this.$ga.event({
          eventCategory: 'click',
          eventAction: 'share',
          eventLabel: button.name,
        });
      }
    },
  },
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
  font-family: $font-regular;
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
