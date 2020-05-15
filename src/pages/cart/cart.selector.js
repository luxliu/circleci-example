import * as R from "ramda";
import { createSelector } from "reselect";

import { getModuleSelector } from "src/redux/utils";

export const cartSelector = getModuleSelector("cart");

export const isSubmittingSelector = createSelector(
  cartSelector,
  R.prop("isSubmitting")
);
