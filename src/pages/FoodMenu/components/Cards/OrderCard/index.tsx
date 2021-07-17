import React from 'react';
import currencyFormatter from 'currency-formatter';
import { FoodOrderModel } from 'pages/FoodMenu/models/FoodOrderModel';
import { QuantityButton } from 'pages/FoodMenu/components/Buttons/QuantityButton';
import { CardItemSmall } from '../CardItemSmall';

export interface OrderCardProps {
  cartItem: FoodOrderModel;
  onQuantityChange: (quantity: 1 | -1) => void;
  isPreparing: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  cartItem: { quantity, food },
  onQuantityChange,
  isPreparing,
}) => {
  // const classes = useStyles();
  return (
    <CardItemSmall
      coverImg={food.cover}
      title={food.name}
      description={currencyFormatter.format(food.price, { code: 'USD' })}
      descriptionBold
      descriptionDirection="column"
    >
      {!isPreparing && (
        <QuantityButton
          onQuantityChange={onQuantityChange}
          quantity={quantity}
        />
      )}
    </CardItemSmall>
  );
};
