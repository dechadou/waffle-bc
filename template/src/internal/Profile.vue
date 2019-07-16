<template>
  <section id="profile">
    <div class="col-12">
      <hr class="d-none d-md-block">
      <div class="row">
        <div class="col-lg-3">
          <img v-if="image" :src="image" class="centered-and-cropped">
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
                <a v-if="socialNetwork.username" :href="`${ socialNetwork.url }${ socialNetwork.username }/`" target="_blank">{{ socialNetwork.name }}</a>
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
export default {
  name: 'Profile',
  props: {
    title: {
      type: String,
      default: 'Conocé al Creador',
    },
    text: String,
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
    this.finalText = this.text;
    console.log(this.finalText);
    if (this.finalText.indexOf('<p>[HIDDEN value=&quot;') !== -1) {
      [this.finalText, this.showMoreText] = this.finalText.split('<p>[HIDDEN value=&quot;');
      [this.showMoreText] = this.showMoreText.split('&quot;]</p>');
    }
  },
  methods: {
    getSocialNetworks() {
      return [
        { name: 'Facebook', url: 'https://www.facebook.com/', username: this.facebook },
        { name: 'Twitter', url: 'https://www.twitter.com/', username: this.twitter },
        { name: 'Instagram', url: 'https://www.instagram.com/', username: this.instagram },
        { name: 'Website', url: this.website ? this.website.replace(/\/$/, '') : '', username: '' },
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
section{
  margin-top: 100px;
}

.centered-and-cropped {
  object-fit: cover;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  display: block;

  @media (min-width: 992px) {
    width: 200px;
    height: 200px;
  }

}

h2{
  font-size: 36px;
  font-weight: 400;
  margin-top: 50px;
  margin-bottom: 15px;

  @media (min-width: 992px) {
    font-size: 30px;
    margin-top: 0px;
  }

  @media (min-width: 1200px) {
    margin-top: 20px;
  }
}

p{
  font-size: 20px;
  margin-bottom: 20px;

  @media (min-width: 992px) {
    font-size: 18px;
  }

  a{
    font-weight: bolder;
    color: #000;
    font-size: 20px;
    text-decoration: none;

    @media (min-width: 992px) {
      font-size: 18px;
    }
  }
}

a{
  color: #C4C4C4;
  font-size: 18px;
  display: inline-block;
  text-decoration: none;
  margin-bottom: 5px;
}

hr{
  box-sizing: content-box;
  height: 0;
  overflow: visible;
  border: 0;
  border-top: 1px solid rgba(0,0,0,.1);
  @media (min-width: 992px) {
    width: 150%;
    margin: 50px 0;
  }
}

.contact-info{
  @media (min-width: 1200px) {
    margin-top: 65px;
  }
}
</style>
