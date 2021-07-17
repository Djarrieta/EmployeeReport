/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-var-requires, global-require */

import React from 'react';
import {
  FoodCard,
  FoodCardProps,
} from 'pages/FoodMenu/components/Cards/FoodCard/index';
import { render } from '@testing-library/react';

jest.mock('react-intersection-observer', () => {
  const { factory } = require('tests/mocks/react-intersection-observer.mock');
  return factory();
});

describe('FoodCard Test', () => {
  let props: FoodCardProps;

  beforeEach(() => {
    props = {
      isPreparing: false,
      food: {
        price: 4.3,
        name: 'some food',
        cover: 'food.jpg',
        description: 'some description',
        type: 'DRINK',
      },
      onFoodSelected: jest.fn(),
    };
  });

  it('should match snapshot', () => {
    const { container } = render(<FoodCard {...props} />);
    expect(container).toMatchSnapshot();
  });
});
