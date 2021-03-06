<template>
  <section id="profile" v-if="text">
    <div class="col-12">
      <hr class="d-none d-md-block">
      <div class="row">
        <div class="col-lg-3">
          <img v-if="image" :src="image" class="centered-and-cropped" alt="Author">
        </div>
        <div class="col-lg-6">
          <h2>{{ title }}</h2>
          <div>
            <p v-if="finalText" v-html="finalText"></p>
            <p v-if="isShowingMore" v-html="showMoreText"></p>
            <p v-if="showMoreText && !isShowingMore">
              <a href="#" @click="readMore($event)">[LEER MÁS]</a>
            </p>
          </div>
        </div>
        <div class="col-lg-3 contact-info">
          <div class="row">
            <div class="col-12">
              <div v-for="(socialNetwork, index) in getSocialNetworks()" :key="index">
                <a
                  v-if="socialNetwork.username"
                  :href="`${ socialNetwork.url }${ socialNetwork.username }/`"
                  target="_blank"
                  rel="noopener"
                >{{ socialNetwork.name }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="d-none d-md-block">
    </div>
  </section>
</template>

<script>
class SocialNetworksObject {
  constructor(name, url, username) {
    this.name = name;
    this.url = url;
    this.username = username;
  }
}

// @group INTERNAL COMPONENTS
// Displays the author profile
// @vuese
export default {
  name: 'Profile',
  props: {
    title: {
      type: String,
      default: 'Conocé al Creador',
    },
    // The author's profile description
    text: String,
    // The author's profile image
    image: String,
    facebook: String,
    twitter: String,
    instagram: String,
    website: String,
  },
  data() {
    return {
      finalText: null,
      showMoreText: null,
      isShowingMore: false,
    };
  },
  created() {
    if (!this.text) return;
    this.finalText = this.text;
    if (this.finalText.indexOf('<p>[HIDDEN value=&quot;') !== -1) {
      [this.finalText, this.showMoreText] = this.finalText.split(
        '<p>[HIDDEN value=&quot;',
      );
      [this.showMoreText] = this.showMoreText.split('&quot;]</p>');
    }
  },
  methods: {
    /**
     * @vuese
     * Returns an array of SocialNetworksObject objects
     */
    getSocialNetworks() {
      return [
        new SocialNetworksObject(
          'Facebook',
          'https://www.facebook.com/',
          this.facebook,
        ),
        new SocialNetworksObject(
          'Twitter',
          'https://www.twitter.com/',
          this.twitter,
        ),
        new SocialNetworksObject(
          'Instagram',
          'https://www.instagram.com/',
          this.instagram,
        ),
        new SocialNetworksObject(
          'Website',
          this.website ? this.website.replace(/\/$/, '') : '',
          '',
        ),
      ];
    },
    readMore(event) {
      event.preventDefault();
      this.isShowingMore = true;
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  margin-top: 50px 0;
}

.centered-and-cropped {
  object-fit: cover;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  display: block;

  @include lg-up {
    width: 200px;
    height: 200px;
  }
}

h2 {
  font-size: 36px;
  font-weight: 400;
  margin-top: 50px;
  margin-bottom: 15px;

  @include lg-up {
    font-size: 30px;
    margin-top: 0px;
  }

  @include xl-up {
    margin-top: 20px;
  }
}

p {
  font-size: 20px;
  margin-bottom: 20px;

  @include lg-up {
    font-size: 18px;
  }

  a {
    font-weight: bolder;
    color: #000;
    font-size: 20px;
    text-decoration: none;

    @include lg-up {
      font-size: 18px;
    }
  }
}

a {
  color: #777777;
  font-size: 20px;
  display: inline-block;
  text-decoration: none;
  margin-bottom: 7px;
}

hr {
  overflow: visible;
  @include lg-up {
    width: 150%;
    margin: 50px 0;
  }
}

.contact-info {
  @include xl-up {
    margin-top: 65px;
  }
}
</style>
