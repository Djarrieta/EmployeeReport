import React, { useState } from 'react';
import currencyFormatter from 'currency-formatter';
import { FoodModel } from 'pages/FoodMenu/models/FoodModel';
import { QuantityButton } from 'pages/FoodMenu/components/Buttons/QuantityButton';
import { ConfirmAddBaseDialog } from '../ComfirmAddBaseDialog';
import { ConfirmationButton } from '../../Buttons/ConfirmationButton';

export interface FoodConfirmAddDialogProps {
  food?: FoodModel;
  open: boolean;
  onClose: () => void;
  onAddFoodOrder: (food: FoodModel, quantity: number) => void;
}

export const FoodConfirmAddDialog: React.FC<FoodConfirmAddDialogProps> = ({
  food,
  onClose,
  onAddFoodOrder,
  open,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!food) {
    return null;
  }
  const getButtonLabel = (): string => {
    const formatted = currencyFormatter.format(quantity * food.price, {
      code: 'USD',
    });
    return `Add ${formatted}`;
  };

  const handleClose = (): void => {
    setQuantity(1);
    onClose();
  };

  return (
    <ConfirmAddBaseDialog
      open={open}
      onClose={handleClose}
      title={food.name}
      description={food.description}
      coverImage={food.cover}
      price={currencyFormatter.format(food ? food.price : 0, { code: 'USD' })}
      imgHeight="40%"
      imgPosition="50%"
    >
      <ConfirmationButton
        LeftElement={
          <QuantityButton
            disabledRest={quantity <= 1}
            onQuantityChange={(value) => setQuantity(quantity + value)}
            quantity={quantity}
          />
        }
        onClick={() => {
          onAddFoodOrder(food, quantity);
          handleClose();
        }}
        buttonLabel={getButtonLabel()}
      />
    </ConfirmAddBaseDialog>
  );
};
