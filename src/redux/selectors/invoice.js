import * as R from "ramda";
import { createSelector } from "reselect";

import { getModuleSelector } from "src/redux/utils";

export const invoiceSelector = getModuleSelector("invoice");

export const invoiceItemsSelector = createSelector(
  invoiceSelector,
  R.prop("items")
);

export const invoiceLoadingStateSelector = createSelector(
  invoiceSelector,
  R.prop("loadingState")
);
