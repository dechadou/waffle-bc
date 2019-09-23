<script>
// @group FOOTER TYPES
// The base component for footers. Footers should inherit from this component
// @vuese
export default {
  name: "FooterTpe",
  props: {
    year: {
      type: String,
      default: `${new Date().getFullYear()}`
    }
  }
};
</script>
