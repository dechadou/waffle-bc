<template>
  <div class="button_container">
    <AddToCartButton-Select :callback="openLink" v-if="buttonType === 'Select'"/>
    <AddToCartButton-Out-Of-Stock v-if="buttonType === 'Out of stock'"/>
    <transition name="slide-fade" mode="out-in" v-else>
        <button 
          key="added"
          v-if="isAdding"
          class="green"
          type="button" 
        >
          Agregado ✓
        </button>
        <button 
          key="add"
          v-else
          :class="[{ animated: (!slider) }]"
          type="button" 
          @click="addToCart($event)"
        >
          Agregar al Carrito
        </button>
    </transition>
  </div>
</template>

<script>
import { EventManager } from '@/utils';
import { getEnum, EnumNames } from '@/config';
import AddToCartButtonSelect from '@/components/ProductTypes/ProductComponents/AddToCartButtonTypes/AddToCartButton-Select.vue';
import AddToCartButtonOutOfStock from '@/components/ProductTypes/ProductComponents/AddToCartButtonTypes/AddToCartButton-Out-Of-Stock.vue';

export default {
  name: 'AddToCartButton',
  components: {
    AddToCartButtonSelect,
    AddToCartButtonOutOfStock,
  },
  props: {
    slug: {
      type: String
    },
    id: {
      type: Number,
    },
    productType: {
      type: String,
    },
    buttonType: {
      type: String,
    },
    slider: {
      type: Boolean,
    }
  },
  data() {
    return {
      isAdding: false,
    };
  },
  mounted() {
  },
  methods: {
    addToCart(event) {
      EventManager.trigger(EventType.addToCart, this.id, this.type); // TODO: que el carrito pueda conseguir la imagen en base al tipo de producto

      if (!this.slider) EventManager.trigger(EventType.onRelatedProductsToggle, this.data);
      else this.isAdding = true;

      event.target.classList.add('pulse');
      setTimeout(() => {
        this.isAdding = false;
        event.target.classList.remove('pulse');
      }, 1000);
    },
    openLink() {
      this.$router.push(`/producto/${this.slug}`);
    },
  },
};
</script>


<style lang="scss" scoped>
  .button_container {
    float: left;
    width: 100%;
    @media (min-width: 768px) {
      .button_container {
        padding: 0;
      }
    }
  }
</style>
