<template>
  <div>
    <section id="hero">
      <div v-if="label || introCopy">
        <div class="background" :style="`background-image: url('${bg}');`" v-if="bg">
          <div class="container">
            <div class="label-container">
              <img :src="label" class="label" alt="label" v-if="label">
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
import { mapState } from 'vuex';
import { BreakpointsNamespace } from '@/store/module/Breakpoints';
import { getEnum, EnumNames } from '@/config';

// @group INTERNAL COMPONENTS
// Displays an introduction to the shop and a fullwidth background behind it.
// @vuese
export default {
  name: 'Hero',
  props: {
    // Image that shows before the shop description
    label: {
      // `Image URL`
      type: String,
    },
    // The desktop fullwidth background image
    desktopImage: String,
    // The mobile fullwidth background image
    mobileImage: String,
    // The shop's introduction/description
    introCopy: String,
  },
  data() {
    return {
      bg: null,
      onBreakpointChange: () => {},
      breakpoints: getEnum(EnumNames.Breakpoints),
    };
  },
  computed: {
    ...mapState(BreakpointsNamespace, ['breakpoint']),
  },
  watch: {
    breakpoint() {
      this.onBreakpointChange();
    },
  },
  created() {
    if (this.desktopImage && this.mobileImage) {
      // If there is a desktop image and a mobile image it subscribes to changes on the breakpoint size to display the correct image
      this.onBreakpointChange = this.assignBgImage;
      this.assignBgImage();

      // Else it displays the available image
    } else if (this.desktopImage) this.bg = this.desktopImage;
    else this.bg = this.mobileImage;
  },
  methods: {
    /**
     * @vuese
     * Assigns the correct image url for the background depending on the breakpoint size
     */
    assignBgImage() {
      if (this.breakpoint >= this.breakpoints.MD) this.bg = this.desktopImage;
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
  z-index: 1001;
  position: relative;
  @include md-up{
    position: initial;
    z-index: 1;
  }
}

p {
  font-weight: 300;
  font-size: 19px;
  margin-top: 20px;
  font-weight: 300;
  background-color: #fff;

  @include xs-up{
    padding: 1px 15px;
  }

  @include md-up{
    padding: 20px 30px !important;
    text-align: center;
  }
}

.label-container {
  min-height: 30px;
}

.label {
  display: block;
  margin: 0 auto;
  padding: 20px 0;
  max-width: 100%;
  max-height: 476px;
}

.heroImg {
  width: 100%;
}
</style>
