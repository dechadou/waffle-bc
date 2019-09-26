<template>
  <section class="header" :class="[{ 'active': isActive }]">
    <router-link to="/">
      <h1 ref="logo" class="logo">
        <span class="sr-only">LOGO</span>
        <LogoIcon class="logoIcon"/>
      </h1>
    </router-link>
    <div class="icons" @click="toggleMenu" v-if="!isProductInternal && hasMenu">
      <MenuIcon
        class="icon"
        :class="[{ 'icon-active': !isActive }]"
      />
      <ArrowLeftIcon
        class="icon arrow-left"
        :class="[{ 'icon-active': isActive }]"
      />
    </div>
    <nav class="menu" v-if="hasMenu">
      <ul class="nav" v-if="!isProductInternal">
        <li>
          <a href="https://abrecultura.com/nosotres/">Nosotres</a>
        </li>
        <li>
          <a href="https://abrecultura.com/nosotros/mi-pedido/">Estado de mi pedido</a>
        </li>
      </ul>
      <Social :year="year" class="social"/>
    </nav>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { StoreDataNamespace } from "@/store/module/StoreData";
import { Social } from "@/extendables/BaseComponents";
import LogoIcon from "@/assets/icons/logo.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

// @group INTERNAL COMPONENTS
// The page's header
// @vuese
export default {
  name: "HeaderSection",
  props: {
    // Current year. Used for displaying inside the mobile menu
    year: String
  },
  components: {
    Social,
    LogoIcon,
    MenuIcon,
    ArrowLeftIcon,
  },
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    ...mapState(StoreDataNamespace, ["store_id"]),
    currentPage() {
      return this.$route.name;
    },
    isHome() {
      return this.currentPage === "DefaultHomePage";
    },
    isProductInternal() {
      return (
        this.currentPage === "DefaultProductPage" ||
        this.currentPage === "DefaultBundlePage"
      );
    },
    hasMenu() {
      return this.store_id === 8;
    }
  },
  watch: {
    $route() {
      this.isActive = false;
    }
  },
  methods: {
    /**
     * @vuese
     * Shows/hides the mobile menu
     */
    toggleMenu() {
      this.isActive = !this.isActive;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  background: transparent;
  width: 100%;
  height: 65px;

  &:after {
    position: absolute;
    z-index: 1;
    display: block;
    content: "";
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s $easeInCubic, visibility 0.5s $easeInCubic;

    @media (min-width: 992px) {
      display: none;
    }
  }

  button {
    &.open_cart {
      width: 30px;
      position: fixed;
      height: 30px;
      right: 8%;
      top: 10px;
      z-index: 30;
      border: none;
      background: transparent;
      cursor: pointer;
      outline: none;
      padding: 0;

      @media (min-width: 1200px) {
        top: 15px;
      }
    }
    .cartIcon {
      width: 30px;
      height: 30px;
    }
    .itemsCount {
      border-radius: 50%;
      position: absolute;
      top: 21px;
      right: -2px;
      font-size: 13px;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      overflow: hidden;
      background-color: #000;
      color: #fff;
      z-index: 200;
    }
  }

  .menu {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: #fff;
    height: 100vh;
    width: 100vw;
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
    transition: transform 0.5s $easeInCubic, opacity 0.75s $easeInCubic,
      visibility 0.75s $easeInCubic;
    padding: 20vh 0 0 10%;

    @include lg-up {
      padding: 0;
      transition: none;
      transform: none;
      opacity: 1;
      visibility: visible;
      height: 6vw;
      background: transparent;
    }

    @include xl-up {
      height: 70px;
    }
  }

  .nuevo {
    font-size: 12px;
    vertical-align: super;
    color: #00deb5;
  }

  .album {
    text-decoration: underline;
    font-size: 4.27vw;
    @media (min-width: 992px) {
      font-size: 1.27vw;
    }
    // line-height: 1;
  }

  .nav {
    font-size: 8vw;
    line-height: 1;

    @media screen and (orientation: landscape) {
      font-size: 4vw;
    }

    @media (min-width: 992px) {
      font-size: 3.64vw;
    }
    letter-spacing: 0.1em;
    line-height: 1.25;
    //padding: 20vh 0 0 10%;
    @media (min-width: 992px) {
      font-size: 16px;
      line-height: 1;
    }

    @media (min-width: 992px) {
      padding: 0;
      padding-top: 23px;
      display: flex;
      justify-content: left;
      left: 36.5%;
      position: absolute;
      letter-spacing: 0;
    }

    li.beta-link a {
      text-align: unset;
      display: block;
      margin-top: 30px;
      font-size: 4.5vw;
      letter-spacing: 0.3px;
      @media (min-width: 992px) {
        font-size: 1vw;
        margin-top: 0;
      }
    }

    li {
      @media (min-width: 992px) {
        margin: 0 4.5vw 0 0;
      }
    }
  }

  &.active {
    &:after {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.5s $easeOutExpo, visibility 0.5s $easeOutExpo;
    }

    .menu {
      transition: transform 1s $easeOutExpo, opacity 0.5s $easeOutExpo,
        visibility 0.5s $easeOutExpo;
      transform: translateX(0);
      opacity: 1;
      visibility: visible;
    }
  }

  // logo
  .logo {
    max-width: 150px;
    width: 25%;
    height: 30px;
    position: relative;
    top: 10px;
    margin: 0 auto;
    margin-top: 3px;
    z-index: 3;

    @media (min-width: 992px) {
      max-width: 100%;
      position: absolute;
      left: 7%;
      margin: 2vw 0 0;
      width: 8.5vw;
      top: 0;
      height: 2.084vw;
    }

    @media (min-width: 1200px) {
      margin: 20px 0 0 0;
      height: 20px;
    }

    .logo-icon {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
    }

    svg {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
    }
  }
  .social {
    bottom: 1.5vh;
    width: 100%;
    position: absolute;
    z-index: 3;

    @media (min-width: 992px) {
      display: none;
    }
  }

  // home
  &.is-home {
    .logo {
      @media (min-width: 992px) {
        position: absolute;
        top: 41vh;
        transition: transform 0.25s $easeOutExpo, top 0.25s $easeOutExpo;
      }
    }
  }

  // store
  &.is-store {
    background: #fff;
    height: 80px;
    @media (min-width: 992px) {
      height: 65px;
    }

    a.beta-link {
      text-align: center;
      display: block;
      margin-top: 20px;
      font-size: 14px;
      letter-spacing: 0.3px;
      @media (min-width: 992px) {
        display: none;
      }
    }
  }

  // icons
  .arrowRightShort {
    width: 30px;
    height: 30px;
  }
  .icons {
    width: 13.33333333%;
    max-width: 60px;
    height: 30px;
    left: 5%;
    top: 10px;
    position: absolute;

    @media (min-width: 992px) {
      display: none;
    }
  }

  .icon {
    z-index: 4;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%) scale(0.5);
    opacity: 0;
    visibility: hidden;

    fill: transparent;
    stroke: #4d4d4d;

    &.icon-active {
      transform: translateY(-50%) scale(1);
      opacity: 1;
      visibility: visible;
      transition: transform 0.5s $easeOutExpo, opacity 0.5s $easeOutExpo,
        visibility 0.5s $easeOutExpo;
    }
  }

  .arrow-left {
    margin-top: 5px;
    stroke: transparent;
  }
}
</style>
