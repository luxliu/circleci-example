import { all, fork } from "redux-saga/effects";

import invoiceSaga from "./modules/invoice/invoice.saga";

export default function* () {
  yield all([fork(invoiceSaga)]);
}
