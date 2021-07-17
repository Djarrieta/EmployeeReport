import React, { useRef } from 'react';
import { PromotionModel } from 'pages/FoodMenu/models/PromotionModel';
import { FoodModel } from 'pages/FoodMenu/models/FoodModel';
import { getPromotionHighLight } from 'pages/FoodMenu/services/promotionService';
import { PromotionAppliedModel } from 'pages/FoodMenu/models/PromotionAppliedModel';
import { ConfirmAddBaseDialog } from '../ComfirmAddBaseDialog';
import { CustomizablePromotionOrder } from './components/CustomizablePromotionOrder';
import { ClosedPromotionOrder } from './components/ClosedPromotionOrder';

export interface PromotionConfirmAddDialogProps {
  promotion?: PromotionModel;
  open: boolean;
  onClose: () => void;
  availableFoods: FoodModel[];
  onPromotionApplied: (promo: PromotionAppliedModel) => void;
}

export const PromotionConfirmAddDialog: React.FC<PromotionConfirmAddDialogProps> =
  ({ onClose, open, promotion, availableFoods, onPromotionApplied }) => {
    const ref = useRef(0);
    if (!promotion) {
      return null;
    }

    const handleClose = () => {
      onClose();
      ref.current += 1;
    };

    return (
      <ConfirmAddBaseDialog
        open={open}
        onClose={handleClose}
        title={promotion.name}
        description={promotion.description}
        coverImage={promotion.cover}
        price={getPromotionHighLight(promotion)}
        imgHeight="20%"
        imgPosition="69%"
      >
        {promotion.customizable.length > 0 ? (
          <CustomizablePromotionOrder
            key={ref.current}
            promotion={promotion}
            availableFoods={availableFoods}
            onPromotionApplied={(promo) => {
              onPromotionApplied(promo);
              handleClose();
            }}
          />
        ) : (
          <ClosedPromotionOrder
            key={ref.current}
            promotion={promotion}
            onPromotionApplied={(promo) => {
              onPromotionApplied(promo);
              handleClose();
            }}
          />
        )}
      </ConfirmAddBaseDialog>
    );
  };
