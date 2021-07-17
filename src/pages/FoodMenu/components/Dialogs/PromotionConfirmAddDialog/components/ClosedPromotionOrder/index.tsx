import React from 'react';
import { PromotionModel } from 'pages/FoodMenu/models/PromotionModel';
import { CardItemSmall } from 'pages/FoodMenu/components/Cards/CardItemSmall';
import { Typography } from '@material-ui/core';
import currencyFormatter from 'currency-formatter';
import { ConfirmationButton } from 'pages/FoodMenu/components/Buttons/ConfirmationButton';
import { PromotionAppliedModel } from 'pages/FoodMenu/models/PromotionAppliedModel';
import * as promotionService from 'pages/FoodMenu/services/promotionService';

export const ClosedPromotionOrder: React.FC<{
  promotion: PromotionModel;
  onPromotionApplied: (promotionApplied: PromotionAppliedModel) => void;
}> = ({ promotion, onPromotionApplied }) => {
  const handleOnClick = () => {
    onPromotionApplied(promotionService.applyPromotion(promotion));
  };
  return (
    <>
      <div style={{ marginBottom: '95px' }}>
        {promotion.closedValues.map((closedItem) => (
          <CardItemSmall
            key={closedItem.id}
            coverImg={closedItem.cover}
            title={closedItem.name}
            descriptionDirection="row"
          />
        ))}
      </div>
      <ConfirmationButton
        LeftElement={
          <Typography style={{ fontWeight: 700, fontSize: '1.3rem' }}>
            {promotion.closedPrice &&
              currencyFormatter.format(promotion.closedPrice, { code: 'USD' })}
          </Typography>
        }
        onClick={handleOnClick}
        buttonLabel="Add promo"
      />
    </>
  );
};
