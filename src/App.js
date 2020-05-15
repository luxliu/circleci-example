import React from "react";
import { Provider as ReduxProvider } from "react-redux";

import Cart from "./pages/cart";
import rootReducer from "./redux";
import rootSaga from "./redux/saga";
import { configureStore } from "./redux/utils";

const store = configureStore({ rootReducer, rootSaga });

const App = () => (
  <ReduxProvider store={store}>
    <Cart />
  </ReduxProvider>
);

export default App;
