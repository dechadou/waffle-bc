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
          <div class="col-12" v-for="bundle in bundles" :key="bundle.id">
            <product :id="bundle.id"/>
          </div>
        </section>
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
import { mapActions, mapGetters } from 'vuex';
import { StoreDataActionTypes, StoreDataGetterTypes } from '../store/module/StoreData';
import Hero from '@/components/Hero.vue'
import GlobalWarning from '@/components/GlobalWarning.vue'

export default {
  name: 'HomePage',
  components: {
    Hero,
    GlobalWarning,
  },
  computed: {
    ...mapGetters({
      products: StoreDataGetterTypes.GET_PRODUCTS,
      bundles: StoreDataGetterTypes.GET_BUNDLES,
      product: StoreDataGetterTypes.GET_PRODUCT,
      bundle: StoreDataGetterTypes.GET_BUNDLE,
      template: StoreDataGetterTypes.GET_TEMPLATE_DATA,
    }),
  },
  created(){
    console.log(this.template);
  }
};
</script>

<style scoped lang="scss">
#shop{
	margin-top: 10px;
}
</style>