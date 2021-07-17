import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { QuantityButton } from '.';

describe('QuantityButton tests', () => {
  let onQuantityChange: jest.Mock;
  let quantity: number;

  beforeEach(() => {
    onQuantityChange = jest.fn();
    quantity = 1;
  });

  it('should match snapshot', () => {
    const { container } = render(
      <QuantityButton
        onQuantityChange={onQuantityChange}
        quantity={quantity}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should add quantity', async () => {
    const expectedQuantity = 1;
    const { findByTestId } = render(
      <QuantityButton
        onQuantityChange={onQuantityChange}
        quantity={quantity}
      />,
    );

    const addButton = await findByTestId('add');

    fireEvent.click(addButton);

    expect(onQuantityChange).toHaveBeenCalledWith(expectedQuantity);
  });

  it('should rest quantity', async () => {
    const expectedQuantity = -1;
    const { findByTestId } = render(
      <QuantityButton
        onQuantityChange={onQuantityChange}
        quantity={quantity}
      />,
    );

    const addButton = await findByTestId('rest');

    fireEvent.click(addButton);

    expect(onQuantityChange).toHaveBeenCalledWith(expectedQuantity);
  });
});
