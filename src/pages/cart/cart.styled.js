import styled from "styled-components";

export const Container = styled.div`
  width: 50%;
  margin: 50px auto;
`;

// Add item form

export const ItemFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  grid-gap: 10px;
  margin-bottom: 50px;
`;

export const FieldWrapper = styled.div`
  .ant-input {
    width: 100%;
    height: 32px;
    padding-left: 10px;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 10px;
`;

// Invoice table

export const InvoiceTableWrapper = styled.div`
  margin-bottom: 20px;

  tbody {
    tr:first-child {
      background: #f5f5f5;
    }
  }
`;

export const FooterWrapper = styled.div`
  text-align: right;
  margin-bottom: 30px;
`;
