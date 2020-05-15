import { createAction } from "redux-actions";

import { wrapWithModule } from "src/redux/utils";

/*********************
 *   INITIAL STATE   *
 *********************/

const initialState = {
  isSubmitting: false
};

/***************
 *   ACTIONS   *
 ***************/

const wrapWithNamespace = wrapWithModule("modules/cart");
const SUBMIT_INVOICE = wrapWithNamespace("SUBMIT_INVOICE");
const SUBMIT_INVOICE_DONE = wrapWithNamespace("SUBMIT_INVOICE_DONE");

export const submitInvoice = createAction(SUBMIT_INVOICE);
export const submitInvoiceDone = createAction(SUBMIT_INVOICE_DONE);

/***************
 *   REDUCER   *
 ***************/
export default (state = initialState, action) => {
  const { type, payload } = action;

  const reducer = {
    [SUBMIT_INVOICE]: (state, payload) => {
      console.log("submit invoice: ", payload);
      return { ...state, isSubmitting: true };
    },
    [SUBMIT_INVOICE_DONE]: state => {
      return { ...state, isSubmitting: false };
    }
  }[type];

  return reducer ? reducer(state, payload) : state;
};
