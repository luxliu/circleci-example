import React from 'react';

import Cart from '.';
import { renderWithRedux, fireEvent, wait } from 'src/utils/tests';

describe('pages/cart', () => {
  const mockedState = {
    invoice: {
      items: [
        {
          id: 1,
          description: 'Apples',
          cost: 10,
          quantity: 2,
        },
        {
          id: 2,
          description: 'Bananas',
          cost: 10,
          quantity: 1,
        },
      ],
      loadingState: 'isLoaded',
    },
  };

  it('should render content correctly', async () => {
    const { queryByText, queryByPlaceholderText } = renderWithRedux(<Cart />, {
      initialState: mockedState,
    });

    expect(queryByText('Apples')).toBeInTheDocument();
    expect(queryByText('Bananas')).toBeInTheDocument();
    expect(queryByPlaceholderText('Description')).toBeInTheDocument();
    expect(queryByPlaceholderText('Cost')).toBeInTheDocument();
    expect(queryByPlaceholderText('Quantity')).toBeInTheDocument();
  });

  it("should can't add item if the inputs are empty", async () => {
    const { queryAllByText, getAllByRole } = renderWithRedux(<Cart />);
    const addItembutton = getAllByRole('button', { type: 'Submit' })[0];

    expect(addItembutton).toBeEnabled();

    fireEvent.click(addItembutton);
    await wait();

    expect(queryAllByText('Required')).toHaveLength(3);
    expect(addItembutton).toBeDisabled();
  });

  it('should can add item correctly', async () => {
    const { queryByText, getAllByRole, getByPlaceholderText } = renderWithRedux(
      <Cart />,
      {
        initialState: mockedState,
      }
    );

    const addItembutton = getAllByRole('button', { type: 'Submit' })[0];

    const descriptionInput = getByPlaceholderText('Description');
    const costInput = getByPlaceholderText('Cost');
    const quantityInput = getByPlaceholderText('Quantity');

    fireEvent.change(descriptionInput, { target: { value: 'Oranges' } });
    fireEvent.change(costInput, { target: { value: '5' } });
    fireEvent.change(quantityInput, { target: { value: '10' } });

    fireEvent.click(addItembutton);
    await wait();

    expect(queryByText('Oranges')).toBeInTheDocument();
    expect(queryByText('Total: $80')).toBeInTheDocument();
  });
});
