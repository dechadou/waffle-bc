<template>
  <transition name="slide-fade">
    <div>
      <GlobalWarning/>
      <Hero
        :desktopImage="template.desktop_image"
        :mobileImage="template.mobile_image"
        :introCopy="template.intro_copy"
      />
      <div class="container">
        <section id="shop">
          <div class="row">
            <div
              class="col-12 col-md-4"
              v-for="bundle in data.bundles.filter(x => bundles_id.find(y => x.id === y.id))"
              :key="bundle.id"
            >
              <Thumbnail :data="bundle"/>
            </div>
          </div>
        </section>
        <Profile
          :text="template.creador_bio"
          :image="template.creador_image"
          :facebook="template.creador_social_fb"
          :twitter="template.creador_social_tw"
          :instagram="template.creador_social_ig"
          :website="template.creador_social_web"
        />
      </div>
    </div>
    <!--<div v-if="isLoaded">
      <HeaderSection/>
      <cart/>
      <div class="container">
        <banner />
        <section id="shop">
          <div class="row">
            <div class="col-12 col-md-6" v-for="bund in bundle" :key="bund.id">
              <product :data="bund"/>
            </div>
            <div class="col-12 col-md-4" v-for="prod in product" :key="prod.id">
              <product :data="prod"/>
            </div>
          </div>
        </section>
      </div>
      <FeedbackSection/>
      <RelatedProducts :products="product"/>
      <FooterSection/>
    </div>-->
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import { StoreDataNamespace } from '@/store/module/StoreData';
import { Hero, GlobalWarning, Profile } from '@/extendables/BaseComponents';
import { Thumbnail } from '@/extendables/ProductTypes';

export default {
  name: 'HomePage',
  components: {
    Hero,
    GlobalWarning,
    Profile,
    Thumbnail,
  },
  data() {
    return {
      bundles: null,
      products: null,
    };
  },
  computed: {
    ...mapState(StoreDataNamespace, ['data', 'template', 'bundles_id']),
  },
  created() {
    console.log(this.template);
  },
};
</script>

<style scoped lang="scss">
#shop {
  margin-top: 10px;
}
</style>
