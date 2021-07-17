import React from 'react';
import currencyFormatter from 'currency-formatter';
import { FoodModel } from 'pages/FoodMenu/models/FoodModel';
import { CardItem } from '../CardItem';

export interface FoodCardProps {
  food: FoodModel;
  onFoodSelected: (food: FoodModel) => void;
  className?: string;
  isPreparing: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  food,
  onFoodSelected,
  isPreparing,
}) => {
  return (
    <>
      <CardItem
        title={food.name}
        description={food.description}
        highLight={currencyFormatter.format(food.price, { code: 'USD' })}
        cover={food.cover}
        buttonText="Add"
        disabled={isPreparing}
        onSelected={() => {
          onFoodSelected(food);
        }}
      />
    </>
  );
};
