<template>
    <aside class="social-footer">
        <div class="col-12">
          <div class="row">
            <div class="col-6 col-md-10 pl-0">
              <ul>
                <li  v-for="item in social" :key="item.name">
                  <a :href="item.url" target="_blank">
                    <Icon :name="item.name"/>
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-6 col-md-2 p-0">
              <p class="copyright"> ABRE© {{ year }}</p>
            </div>
          </div>
        </div>
    </aside>
</template>

<script>
import { Icon } from '@/extendables/BaseComponents';

export default {
  name: 'Social',
  props: {
    year: String,
  },
  components: {
    Icon,
  },
  data() {
    return {
      social: [
        {
          name: 'ig',
          url: 'https://www.instagram.com/abre_cultura/',
        },
        {
          name: 'fb',
          url: 'https://www.facebook.com/abreculturapuntocom/',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.social-footer{
  margin-bottom: 30px;
  @include md-up{
    padding: 0 7vw 2vw;
  }
}
svg {
  width: 7vw;
  height: 5vw;
  max-width: 40px;
  max-height: 40px;

  @include lg-up {
    max-width: 16px;
    max-height: 16px;
  }
}
ul li{
  display: inline;
  margin-left: 10px;
  &:first-child{
    margin-left: 0;
  }
}
.copyright {
    margin: 0;
    text-align: left;
    font-size: 4vw;
    color: $abre-description-grey;

    @include landscape{
      font-size: 2vw;
    }

    @include lg-up {
      font-size: 1.1vw;
      line-height: 1;
    }
  }
</style>