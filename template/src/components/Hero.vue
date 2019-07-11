<template>
  <div>
    <section id="hero">
      <div class="background" :style="`background-image: url('${bg}');`" v-if="bg">
        <div class="container">
          <!--<div class="col-12 col-md-6 offset-md-3">
            <img :src="`${$versionRoot}image/etiqueta.png`" class="logo img-fluid mx-auto d-block">
          </div>-->
          <div class="col-12 col-md-8 offset-md-2" v-if="introCopy">
            <p v-html="introCopy"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  props: {
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
	background-position: center center;
	background-size: 100% auto;
}

p{
	font-weight: 300;
	text-align: center;
	font-size: 19px;
  margin-top: 20px;
  font-weight: 300;

  //margin-top: -280px;
  background-color: #fff;
  padding: 20px 30px!important;
}

.logo{
	display: block;
	margin: 0 auto;
	padding: 50px 0;
}
</style>
