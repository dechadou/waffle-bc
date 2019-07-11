import EditableTexts, { FETCH_EDITABLE_TEXT } from './EditableTexts';

export const EditableTextsNamespace = 'EditableTexts';

export const EditableTextsActionTypes = {
  FETCH_EDITABLE_TEXT: `${EditableTextsNamespace}/${FETCH_EDITABLE_TEXT}`,
};

export default EditableTexts;
