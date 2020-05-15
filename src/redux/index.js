import { combineReducers } from "redux";

import { default as cart } from "src/pages/cart/cart.duck";
import { default as invoice } from "./modules/invoice/invoice.duck";

export default combineReducers({ invoice, cart });
