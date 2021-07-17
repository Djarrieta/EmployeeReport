import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from 'pages/FoodMenu/context/OrderContext';
import { ButtonAtBottom } from 'pages/FoodMenu/components/Buttons/ButtonAtBottom';
import { OrderDialog } from 'pages/FoodMenu/components/Dialogs/OrderDialog';
import { PreparingOrderDialog } from 'pages/FoodMenu/components/Dialogs/PreparingOrderDialog';
import { DeliverOrderConfirmationDialog } from 'pages/FoodMenu/components/Dialogs/DeliverOrderConfirmationDialog';

export const OrderContainer: React.FC = () => {
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [openPreparingDialog, setOpenPreparingDialog] = useState(false);
  const {
    computed: { totalAmount, totalItems },
    data: {
      order: { foods, promotions },
      isPreparing,
      showConfirmation,
    },
    mutations: {
      updateFoodOrder,
      removePromo,
      clearOrder,
      sendOrder,
      setShowConfirmation,
    },
  } = useContext(OrderContext);

  useEffect(() => {
    if (isPreparing) {
      setOpenOrderDialog(false);
      setOpenPreparingDialog(true);
    } else {
      setOpenPreparingDialog(false);
    }
  }, [isPreparing]);

  return (
    <>
      <ButtonAtBottom
        zIndex={100}
        badgeNumber={totalItems}
        amount={totalAmount}
        text={!isPreparing ? 'View Order' : 'Preparing...'}
        onClick={() => setOpenOrderDialog(true)}
      />
      <OrderDialog
        foods={foods}
        onClose={() => setOpenOrderDialog(false)}
        open={openOrderDialog}
        totalAmount={totalAmount}
        totalItems={totalItems}
        modifyFoodQuantity={updateFoodOrder}
        promotions={promotions}
        removePromotion={removePromo}
        clearOrder={clearOrder}
        onCreateOrder={sendOrder}
        isPreparing={isPreparing}
      />
      <PreparingOrderDialog
        onClose={() => setOpenPreparingDialog(false)}
        open={openPreparingDialog}
      />
      <DeliverOrderConfirmationDialog
        onClose={() => setShowConfirmation(false)}
        open={showConfirmation}
      />
    </>
  );
};
