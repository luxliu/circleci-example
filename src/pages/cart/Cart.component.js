import * as R from "ramda";
import React from "react";
import { Table, Button } from "antd";
import { AddItemForm } from "./components/AddItemForm";

import * as Styled from "./cart.styled";
import { LOAD_STATES } from "src/constants";

export default ({ items, isSubmitting, itemsLoadingState, actions }) => {
  const { addItems, submitInvoice, submitInvoiceDone } = actions;

  const itemsWithPrice = items.map((item) => ({
    ...item,
    key: item.id,
    price: item.quantity * item.cost,
  }));

  const handleSubmitInvoice = () => {
    submitInvoice({ items });
    setTimeout(() => {
      submitInvoiceDone();
    }, 1000);
  };

  return (
    <Styled.Container>
      <AddItemForm addItems={addItems} />
      <Styled.InvoiceTableWrapper>
        <Table
          loading={itemsLoadingState === LOAD_STATES.IS_LOADING}
          columns={[
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
            },
            {
              title: "Cost",
              dataIndex: "cost",
              key: "cost",
              render: (text) => <span>${text}</span>,
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              key: "quantity",
            },
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
              render: (text) => <span>${text}</span>,
            },
          ]}
          dataSource={itemsWithPrice}
          bordered
          pagination={false}
        />
      </Styled.InvoiceTableWrapper>

      <Styled.FooterWrapper>
        <div>Total: ${R.sum(itemsWithPrice.map(R.prop("price")))}</div>
      </Styled.FooterWrapper>

      <Styled.FooterWrapper>
        <Button
          type="primary"
          loading={isSubmitting}
          onClick={handleSubmitInvoice}
        >
          Submit Invoice
        </Button>
      </Styled.FooterWrapper>
    </Styled.Container>
  );
};
