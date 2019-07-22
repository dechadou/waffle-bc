<script>
import { Icon } from "@/extendables/BaseComponents";
export default {
  name: 'FooterTpe',
  props: {
    year: {
      type: String,
      default: `${new Date().getFullYear()}`,
    },
  },
  components: {
    Icon,
  }
};
</script>
