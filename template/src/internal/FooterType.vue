<script>
import { mapState } from 'vuex';

// @group FOOTER TYPES
// The base component for footers. Footers should inherit from this component
// @vuese
export default {
  name: 'FooterType',
  props: {
    year: {
      type: String,
      default: `${new Date().getFullYear()}`,
    },
  },
};
</script>
