import React, { useState } from 'react';
import { CardItemSmall } from 'pages/FoodMenu/components/Cards/CardItemSmall';
import currencyFormatter from 'currency-formatter';
import { Collapse, IconButton } from '@material-ui/core';
import { RemoveTwoTone, Visibility, VisibilityOff } from '@material-ui/icons';
import { PromotionAppliedModel } from 'pages/FoodMenu/models/PromotionAppliedModel';

interface PromotionOrderCard {
  promotionApplied: PromotionAppliedModel;
  onRemove: (promo: PromotionAppliedModel) => void;
  isPreparing: boolean;
}

export const PromotionOrderCard: React.FC<PromotionOrderCard> = ({
  promotionApplied,
  onRemove,
  isPreparing,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CardItemSmall
        coverImg={promotionApplied.cover}
        title={promotionApplied.name}
        descriptionDirection="column"
        onImageClick={() => setOpen(!open)}
        description={currencyFormatter.format(promotionApplied.totalMemorized, {
          code: 'USD',
        })}
        descriptionBold
      >
        {promotionApplied.foods && (
          <IconButton onClick={() => setOpen(!open)}>
            {open ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}
          </IconButton>
        )}
        {!isPreparing && (
          <IconButton
            onClick={() => onRemove(promotionApplied)}
            aria-label="add"
          >
            <RemoveTwoTone fontSize="small" />
          </IconButton>
        )}
      </CardItemSmall>
      {promotionApplied.foods && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {promotionApplied.foods.map((subOrder) => (
            <CardItemSmall
              key={subOrder.food.id}
              coverImg={subOrder.food.cover}
              title={`${subOrder.food.name} (${subOrder.quantity})`}
              descriptionDirection="column"
              description={currencyFormatter.format(subOrder.food.price, {
                code: 'USD',
              })}
              descriptionBold
            />
          ))}
        </Collapse>
      )}
    </>
  );
};
