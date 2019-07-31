<template>
  <div>
    <section id="hero">
      <div v-if="label || introCopy">
        <div class="background" :style="`background-image: url('${bg}');`" v-if="bg">
          <div class="container">
            <div class="col-12 col-md-6 offset-md-3 label-container">
              <img :src="label" class="label img-fluid mx-auto d-block" v-if="label">
            </div>
            <div class="col-12 col-md-8 offset-md-2" v-if="introCopy">
              <p v-html="introCopy"/>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <img :src="bg" class="heroImg">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    label: String,
    desktopImage: String,
    mobileImage: String,
    introCopy: String,
  },
  data() {
    return {
      bg: null,
    };
  },
  created() {
    if (this.desktopImage && this.mobileImage) {
      this.assignBgImage();
      window.addEventListener('resize', this.assignBgImage, true);
    } else if (this.desktopImage) this.bg = this.desktopImage;
    else this.bg = this.mobileImage;
  },
  methods: {
    assignBgImage() {
      if (window.innerWidth >= 768) this.bg = this.desktopImage;
      else this.bg = this.mobileImage;
    },
  },
};
</script>

<style scoped lang="scss">
.background {
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
}

p{
  font-weight: 300;
  text-align: center;
  font-size: 19px;
  margin-top: 20px;
  font-weight: 300;
  background-color: #fff;
  padding: 20px 30px!important;
}

.label-container{
  min-height: 30px;
}

.label{
  display: block;
  margin: 0 auto;
  padding: 50px 0;
  width: 100%;
}

.heroImg{
  width: 100%;
}
</style>
