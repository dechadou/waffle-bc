<template>
    <div class="globalWarning" role="alert"
      v-if="description"
      v-html="description"
    />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { EditableTextsNamespace, EditableTextsActionTypes } from '@/store/module/EditableTexts';

export default {
  name: 'GlobalWarning',
  data() {
    return {
      description: null,
    };
  },
  watch: {
    response(value) {
      if (!value) return;
      this.description = value.value;
    },
  },
  computed: {
    ...mapState(EditableTextsNamespace, ['response']),
  },
  methods: {
    ...mapActions({
      fetchEditableText: EditableTextsActionTypes.FETCH_EDITABLE_TEXT,
    }),
  },
  mounted() {
    this.fetchEditableText('aviso-global-tiendas');
  },
};
</script>

<style scoped lang="scss">
.globalWarning {
  font-size: 20px;
  background-color: white;
  border: none;
  margin: 0;
  color:black;
}

.globalWarning h3 {
  text-align: center;
  display:  block;
  margin: 20px 20px 20px 20px;
  padding-left: 20px;
  text-align: left;
}
</style>
