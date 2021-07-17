/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-var-requires, global-require */

import React from 'react';
import {
  CardItem,
  CardItemProps,
} from 'pages/FoodMenu/components/Cards/CardItem/index';
import { render, fireEvent } from '@testing-library/react';

jest.mock('react-intersection-observer', () => {
  const { factory } = require('tests/mocks/react-intersection-observer.mock');
  return factory();
});

describe('CardItem Test', () => {
  let props: CardItemProps;

  beforeEach(() => {
    props = {
      buttonText: 'click me',
      cover: 'food.jpg',
      description: 'some description',
      highLight: 'highlight',
      title: 'some title',
      onSelected: jest.fn(),
    };
  });

  it('should match snapshot', () => {
    const { container } = render(<CardItem {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should call onSelected fn when button is clicked', async () => {
    const { getByText } = render(<CardItem {...props} />);
    const button = getByText(props.buttonText);
    fireEvent.click(button);
    expect(props.onSelected).toHaveBeenCalled();
  });

  it('should call onSelected fn when img is clicked', async () => {
    const { getByTestId } = render(<CardItem {...props} />);
    const button = getByTestId('img-button');
    fireEvent.click(button);
    expect(props.onSelected).toHaveBeenCalled();
  });
});
