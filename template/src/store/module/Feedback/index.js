import Feedback, { RESET_STATE, SEND_DATA, GET_ERROR } from './Feedback';

export const FeedbackNamespace = 'feedback';

export const FeedbackGetterTypes = {
  GET_ERROR: `${FeedbackNamespace}/${GET_ERROR}`,
};

export const FeedbackMutationTypes = {
  RESET_STATE: `${FeedbackNamespace}/${RESET_STATE}`,
};

export const FeedbackActionTypes = {
  SEND_DATA: `${FeedbackNamespace}/${SEND_DATA}`,
};

export default Feedback;
