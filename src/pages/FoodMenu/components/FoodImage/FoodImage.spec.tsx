import React from 'react';
import { render } from '@testing-library/react';
import { FoodImage } from '.';

describe('FoodImage Test', () => {
  it('should match snapshot', () => {
    const { container } = render(<FoodImage cover="food.jpg" />);
    expect(container).toMatchSnapshot();
  });
});
