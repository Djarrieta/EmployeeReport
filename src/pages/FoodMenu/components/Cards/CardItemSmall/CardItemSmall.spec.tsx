/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-var-requires, global-require */
import React from 'react';
import {
  CardItemSmall,
  CardItemSmallProps,
} from 'pages/FoodMenu/components/Cards/CardItemSmall/index';
import { render } from '@testing-library/react';

jest.mock('react-intersection-observer', () => {
  const { factory } = require('tests/mocks/react-intersection-observer.mock');
  return factory();
});

describe('CardItemSmall Test', () => {
  let props: CardItemSmallProps;

  beforeEach(() => {
    props = {
      coverImg: 'food.jpg',
      description: 'some description',
      descriptionDirection: 'row',
      onImageClick: jest.fn(),
      title: 'some title',
    };
  });

  it('should match snapshot', () => {
    const { container } = render(<CardItemSmall {...props} />);
    expect(container).toMatchSnapshot();
  });
});
