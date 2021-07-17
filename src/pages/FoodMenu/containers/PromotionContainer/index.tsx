import React, { useContext, useState } from 'react';
import { FoodMenuContext } from 'pages/FoodMenu/context/FoodMenuContext';
import { PromotionCard } from 'pages/FoodMenu/components/Cards/PromotionCard';
import { PromotionConfirmAddDialog } from 'pages/FoodMenu/components/Dialogs/PromotionConfirmAddDialog';
import { PromotionModel } from 'pages/FoodMenu/models/PromotionModel';
import { OrderContext } from 'pages/FoodMenu/context/OrderContext';
import { useStyles } from './styles';

export const PromotionContainer: React.FC = () => {
  const {
    data: {
      promotions,
      allMenu: { foods },
    },
  } = useContext(FoodMenuContext);
  const {
    data: { isPreparing },
    mutations: { savePromo },
  } = useContext(OrderContext);
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [promotionSelected, setPromotionSelected] = useState<PromotionModel>();

  if (!promotions || promotions.length <= 0) {
    return null;
  }
  return (
    <>
      <div className={classes.container}>
        <div className={classes.chipContainer}>
          <span className={classes.chip}>HOT!</span>
        </div>
        <div className={classes.listContainer}>
          {promotions.map((promotion) => (
            <PromotionCard
              promotion={promotion}
              key={promotion.id}
              isPreparing={isPreparing}
              onPromotionSelected={(promotionEvt) => {
                setPromotionSelected(promotionEvt);
                setOpenDialog(true);
              }}
            />
          ))}
        </div>
      </div>
      <PromotionConfirmAddDialog
        open={openDialog}
        promotion={promotionSelected}
        onClose={() => setOpenDialog(false)}
        availableFoods={foods}
        onPromotionApplied={savePromo}
      />
    </>
  );
};
