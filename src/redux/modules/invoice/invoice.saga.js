import { all, put, takeLatest } from "redux-saga/effects";

import * as actions from "./invoice.duck";
import * as apis from "./invoice.api";
import { LOAD_STATES } from "src/constants";

function* initItems() {
  
  yield put(actions.setLoadingState(LOAD_STATES.IS_LOADING));
  
  try {
    const items = yield apis.fetchItems();
    yield put(actions.initItemsSuccess(items));
  } catch (error) {
    yield put(actions.setLoadingState(LOAD_STATES.IS_FAILED));
  }
}

export default function* () {
  yield all([takeLatest(actions.initItems, initItems)]);
}
