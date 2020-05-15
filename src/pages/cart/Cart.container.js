import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as selectors from "src/redux/selectors";
import CartComponent from "./Cart.component";
import { initItems, addItems } from "src/redux/modules/invoice/invoice.duck";
import { submitInvoice, submitInvoiceDone } from "./cart.duck";
import { bindActionCreatorsCurried } from "src/redux/utils";

/*****************
 *   COMPONENT   *
 *****************/

const Cart = (props) => {
  useEffect(() => {
    props.actions.initItems();
  }, [props.actions]);

  return <CartComponent {...props} />;
};

/*************
 *   REDUX   *
 *************/

const mapStateToProps = (state) => ({
  items: selectors.invoiceItemsSelector(state),
  isSubmitting: selectors.isSubmittingSelector(state),
  itemsLoadingState: selectors.invoiceLoadingStateSelector(state),
});

const mapDispatchToProps = bindActionCreatorsCurried({
  initItems,
  addItems,
  submitInvoice,
  submitInvoiceDone,
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
