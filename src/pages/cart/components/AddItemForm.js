import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "antd";
import * as Yup from "yup";

import * as Styled from "src/pages/cart/cart.styled";


export const AddItemForm = ({ addItems }) => (
  <Formik
    initialValues={{
      description: "",
      cost: "",
      quantity: "",
    }}
    validationSchema={itemSchema}
    onSubmit={(values, { resetForm }) => {
      addItems(values);
      resetForm({});
    }}
  >
    {({ errors, touched, isValid }) => (
      <Form>
        <Styled.ItemFormWrapper>
          <Styled.FieldWrapper>
            <Field
              name="description"
              placeholder="Description"
              className="ant-input"
            />
            {errors.description && touched.description ? (
              <Styled.ErrorMessage>{errors.description}</Styled.ErrorMessage>
            ) : null}
          </Styled.FieldWrapper>

          <Styled.FieldWrapper>
            <Field name="cost" placeholder="Cost" className="ant-input" />
            {errors.cost && touched.cost ? (
              <Styled.ErrorMessage>{errors.cost}</Styled.ErrorMessage>
            ) : null}
          </Styled.FieldWrapper>

          <Styled.FieldWrapper>
            <Field
              name="quantity"
              placeholder="Quantity"
              className="ant-input"
            />
            {errors.cost && touched.cost ? (
              <Styled.ErrorMessage>{errors.cost}</Styled.ErrorMessage>
            ) : null}
          </Styled.FieldWrapper>

          <Button type="primary" htmlType="submit" disabled={!isValid} block>
            Add Item
          </Button>
        </Styled.ItemFormWrapper>
      </Form>
    )}
  </Formik>
);

const itemSchema = Yup.object().shape({
  description: Yup.string().required("Required"),
  cost: Yup.number().typeError("input a number").required("Required"),
  quantity: Yup.number()
    .typeError("input a integer")
    .integer("input a integer")
    .required("Required"),
});
