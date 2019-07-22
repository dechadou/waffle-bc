<template>
  <section class="footer">
    <div class="content">
      <aside class="logoBox">
        <h2 class="logo">
          <router-link to="/">
            <Icon class="logoIcon" name="abre"/>
          </router-link>
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

        <aside
          v-if="CTAMail && CTAMail.show"
          class="CTAMail"
        >
          <p>{{ CTAMail.copy }}</p>
          <p>
            <a :href="CTAMail.cta">
              {{ CTAMail.email }}
            </a>
          </p>
        </aside>
      </div>
    </div>

    <aside class="social-footer">
      <ul class="social">
        <li  v-for="item in social" :key="item.name">
          <a :href="item.url" target="_blank">
            <Icon :name="item.name"/>
          </a>
        </li>
      </ul>
      <p class="copyright"> ABRE© {{ year }}</p>
    </aside>
  </section>
</template>


<script>
import { FooterType } from "@/extendables/FooterTypes";
export default {
  name: 'Footer-Abre',
  extends: FooterType,
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
          title: 'Nosotros',
          url: 'https://abrecultura.com/nosotros/',
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
      ],
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

  .social-footer {
    width: 100%;
    padding: 0 4%;
    display: flex;
    justify-content: space-between;

    @include lg-up {
      padding: 0 7vw;
    }
  }
  // social
  .social {
    width: 17.5%;
    margin: 2vw 0 2.5vw;
    display: flex;
    justify-content: space-between;

    @include lg-up {
      width: 5%;
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
  }

  .copyright {
    width: 46%;
    text-align: left;
    font-size: 4vw;
    color: $abre-description-grey;
    margin: 3%;

    @include landscape{
      font-size: 2vw;
    }

    @include lg-up {
      width: 25%;
      font-size: 1.1vw;
      line-height: 1;
      margin-top: 12px;
      margin-bottom: 10px;
    }
  }
</style>