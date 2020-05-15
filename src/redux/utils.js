import * as R from "ramda";
import { createSelector } from "reselect";
import {
  applyMiddleware,
  bindActionCreators,
  compose,
  createStore,
} from "redux";
import createSagaMiddleware from "redux-saga";

import { APP_NAME } from "src/constants";

// Follow the standard of ducks-redux-reducer:
// https://github.com/erikras/ducks-modular-redux
const getActionWrapper = (moduleName, widgetName) => (actionName) =>
  `${[moduleName, widgetName, actionName].join("/")}`;

export const wrapWithModule = R.curry(getActionWrapper)(APP_NAME);

export const getModuleSelector = (key) =>
  createSelector(
    (state) => state[key],
    (module) => module
  );

export const configureStore = (options) => {
  const {
    customMiddlewares,
    initialState,
    isSupportDevtool,
    rootReducer,
    rootSaga,
  } = R.mergeDeepLeft(
    {
      initialState: window.INITIAL_STATE || {},
      customMiddlewares: [],
      isSupportDevtool: true,
    },
    options
  );

  // ref: https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
  const composeEnhancers = isSupportDevtool
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

  const middlewares = [];
  let sagaMiddleware;
 
  //add static middlewares like redux-saga
  if (rootSaga) {
    sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware);
  }

  const middleware = composeEnhancers(
    applyMiddleware(...middlewares.concat(customMiddlewares))
  );
  
  const store = createStore(rootReducer, initialState, middleware);

  if (rootSaga) {
    sagaMiddleware.run(rootSaga);
  }

  return store;
};

export const bindActionCreatorsCurried = (
  actions = {},
  propertyName = "actions"
) =>
  R.applySpec({
    [propertyName]: R.curry(bindActionCreators)(actions),
  });
