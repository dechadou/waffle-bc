<template>
  <section class="footer">
    <div class="content">
      <aside class="logoBox">
        <h2 class="logo">
          <a href="https://abrecultura.com/" target="_blank" rel="noopener">
            <span class="sr-only">ABRE</span>
            <LogoIcon class="logoIcon"/>
          </a>
        </h2>
      </aside>
      <ul class="menu">
        <li v-for="item in menu" :key="item.title" class="item">
          <router-link v-if="item.isRoute" :to="item.url">{{ item.title }}</router-link>
          <a v-else :href="item.url">{{ item.title }}</a>
        </li>
      </ul>

      <div class="company">
        <aside class="address" v-if="address.show">
          <p>{{ address.street }}</p>
          <p>{{ address.city }}</p>
          <p>{{ address.country }}</p>
        </aside>

        <aside v-if="CTAMail && CTAMail.show" class="CTAMail">
          <p>{{ CTAMail.copy }}</p>
          <p>
            <a :href="CTAMail.cta">{{ CTAMail.email }}</a>
          </p>
        </aside>
      </div>
      <Social :year="year" class="social"/>
    </div>
  </section>
</template>


<script>
import { FooterType, Social } from '@/extendables/BaseComponents';
import LogoIcon from '@/assets/icons/logo.svg';

// @group FOOTER TYPES
// Displays the complete ABRE Landing footer
// @vuese
export default {
  name: 'Footer-Abre',
  extends: FooterType,
  components: {
    Social,
    LogoIcon,
  },
  data() {
    return {
      address: {
        street: 'Teodoro García 2474',
        city: 'Ciudad de Buenos Aires',
        country: 'Argentina',
        show: false,
      },
      CTAMail: {
        copy: 'Escribinos a:',
        email: 'hola@abrecultura.com',
        cta: 'mailto:hola@abrecultura.com',
        show: false,
      },
      menu: [
        {
          title: 'Nosotres',
          url: 'https://abrecultura.com/nosotres/',
          isRoute: false,
          showForLandscape: true,
        },
        {
          title: 'F.A.Q.',
          url: 'https://abrecultura.com/faq/',
          isRoute: false,
          showForLandscape: true,
        },
        {
          title: 'Estado de mi pedido',
          url: 'https://abrecultura.com/mi-pedido/',
          isRoute: false,
          showForLandscape: true,
        },
        {
          title: 'Pasar a buscar',
          url: 'https://abrecultura.com/pasar-a-buscar/',
          isRoute: false,
          showForLandscape: true,
        },
        {
          title: 'Mapa de librerías',
          url: 'https://abrecultura.com/mapadelibrerias/',
          isRoute: false,
          showForLandscape: true,
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.footer {
  position: relative;
  padding: 0 0 5vw;

  @include landscape {
    padding: 0;
  }
}

.content {
  padding: 10vw 5vw 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  @include landscape {
    padding: 5vw;

    @include lg-up {
      padding: 7vw 7vw 2vw;
    }
  }
}

.menu {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 5vw;
  width: 50%;
  margin-bottom: 0;

  @include lg-up {
    width: 26%;
  }
}

.item {
  font-size: 4.5vw;
  line-height: 1.5;

  @include landscape {
    font-size: 4vw;
  }

  @include lg-up {
    font-size: 1.6vw;
  }
  width: 100%;

  @include lg-up {
    width: 100%;
  }
}

.company {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 5vw;

  @include lg-up {
    width: 49%;
    margin-bottom: 0;
  }
}

.address {
  font-size: 3.7333vw;
  line-height: 1.25;

  @include landscape {
    font-size: 2.5vw;
  }

  @include lg-up {
    font-size: 1.5vw;
  }
  width: 50%;

  @include lg-up {
    line-height: 1.5;
  }
}

.CTAMail {
  font-size: 3.7333vw;
  line-height: 1.25;

  @include landscape {
    font-size: 2.5vw;
  }

  @include lg-up {
    font-size: 1.5vw;
  }
  width: 50%;

  @include lg-up {
    line-height: 1.5;
  }

  a {
    text-decoration: underline;
  }
}

// logo
.logoBox {
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  @include lg-up {
    width: 25%;
  }
}
.logo {
  max-width: 150px;
  width: 50%;
  height: 30px;
  position: relative;
  z-index: 2;

  @include lg-up {
    max-width: 100%;
    margin: 0.4vw 0 0;
    width: 8.5vw;
    height: 2.084vw;
  }

  .logo-icon {
    height: 100%;
    width: 100%;
  }

  svg {
    height: 100%;
    width: 100%;
  }
}

.selector{
  width: 100%;
  .currency-selector{
    margin-bottom: 20px;
    margin-left: 3px;
    margin-top: -52px;
    @include lg-up {
      margin-top: 0;
      margin-bottom: -45px;
      margin-left: 10px;
    }
  }
}

.nopadding{
  padding: 0;
}
</style>
