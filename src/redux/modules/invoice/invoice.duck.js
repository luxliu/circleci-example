import * as R from "ramda";
import { createAction } from "redux-actions";

import { wrapWithModule } from "src/redux/utils";
import { LOAD_STATES } from "src/constants";

/*********************
 *   INITIAL STATE   *
 *********************/

const initialState = {
  items: [],
};

/***************
 *   ACTIONS   *
 ***************/

const wrapWithNamespace = wrapWithModule("modules/invoice");
const INIT_ITEMS = wrapWithNamespace("INIT_ITEMS");
const INIT_ITEMS_SUCCESSFUL = wrapWithNamespace("INIT_ITEMS_SUCCESSFUL");
const ADD_ITEMS = wrapWithNamespace("ADD_ITEMS");
const SET_LOADING_STATE = wrapWithNamespace("SET_LOADING_STATE");

export const initItems = createAction(INIT_ITEMS);
export const initItemsSuccess = createAction(INIT_ITEMS_SUCCESSFUL);
export const addItems = createAction(ADD_ITEMS);
export const setLoadingState = createAction(SET_LOADING_STATE);

/***************
 *   REDUCER   *
 ***************/
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  const reducer = {
    [SET_LOADING_STATE]: (state, loadingState) => ({
      ...state,
      loadingState,
    }),

    [INIT_ITEMS_SUCCESSFUL]: (state, items) => ({
      ...state,

      // items: [
      //   {
      //     id: 1,
      //     description: "Apples",
      //     cost: 10,
      //     quantity: 2,
      //   },
      //   {
      //     id: 2,
      //     description: "Bananas",
      //     cost: 10,
      //     quantity: 1,
      //   },
      // ],
      items,
      loadingState: LOAD_STATES.IS_LOADED,
    }),
    [ADD_ITEMS]: (state, payload) => {
      let nextId = Math.max(...state.items.map(R.prop("id")));
      const newItem = { ...payload, id: nextId + 1 };

      return {
        ...state,

        items: [newItem, ...state.items],
      };
    },
  }[type];

  return reducer ? reducer(state, payload) : state;
};
