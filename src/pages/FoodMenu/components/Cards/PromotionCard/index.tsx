import React from 'react';
import { PromotionModel } from 'pages/FoodMenu/models/PromotionModel';
import { getPromotionHighLight } from 'pages/FoodMenu/services/promotionService';
import { CardItem } from '../CardItem';

export interface PromotionCardProps {
  promotion: PromotionModel;
  onPromotionSelected: (promotion: PromotionModel) => void;
  isPreparing: boolean;
}

export const PromotionCard: React.FC<PromotionCardProps> = ({
  promotion,
  onPromotionSelected,
  isPreparing,
}) => {
  return (
    <CardItem
      disabled={isPreparing}
      title={promotion.name}
      description={promotion.description}
      highLight={getPromotionHighLight(promotion)}
      cover={promotion.cover}
      buttonText="Add"
      onSelected={() => {
        onPromotionSelected(promotion);
      }}
    />
  );
};
