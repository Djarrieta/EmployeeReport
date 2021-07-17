import React, { useContext, useState } from 'react';
import { FoodMenuContext } from 'pages/FoodMenu/context/FoodMenuContext';
import { FoodCard } from 'pages/FoodMenu/components/Cards/FoodCard';
import { FoodConfirmAddDialog } from 'pages/FoodMenu/components/Dialogs/FoodConfirmAddDialog';
import { FoodModel } from 'pages/FoodMenu/models/FoodModel';
import { OrderContext } from 'pages/FoodMenu/context/OrderContext';
import { useStyles } from './styles';

export const FoodContainer: React.FC = () => {
  const {
    data: { foodMenu },
  } = useContext(FoodMenuContext);
  const {
    data: { isPreparing },
    mutations: { updateFoodOrder },
  } = useContext(OrderContext);
  const [confirmFood, setConfirmFood] = useState<FoodModel>();
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();

  const handleDialog = (food: FoodModel) => {
    setOpenDialog(true);
    setConfirmFood(food);
  };

  return (
    <>
      <div className={classes.foodItem}>
        {foodMenu &&
          foodMenu.map((food) => (
            <FoodCard
              isPreparing={isPreparing}
              onFoodSelected={handleDialog}
              key={food.id}
              food={food}
            />
          ))}
      </div>
      <FoodConfirmAddDialog
        food={confirmFood}
        open={openDialog}
        onAddFoodOrder={updateFoodOrder}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
};
