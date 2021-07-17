import React, { useEffect, useRef, useState } from 'react';
import { CustomSubOrderPromotionModel } from 'pages/FoodMenu/models/CustomSubOrderPromotionModel';
import { PromotionModel } from 'pages/FoodMenu/models/PromotionModel';
import { IconButton, Typography } from '@material-ui/core';
import currencyFormatter from 'currency-formatter';
import { AddTwoTone } from '@material-ui/icons';
import * as orderService from 'pages/FoodMenu/services/foodOrderService';
import * as promotionService from 'pages/FoodMenu/services/promotionService';
import { FoodModel } from 'pages/FoodMenu/models/FoodModel';
import { CardItemSmall } from 'pages/FoodMenu/components/Cards/CardItemSmall';
import { QuantityButton } from 'pages/FoodMenu/components/Buttons/QuantityButton';
import { FoodTypeEnum } from 'pages/FoodMenu/models/FoodTypeEnum';
import { FoodOrderModel } from 'pages/FoodMenu/models/FoodOrderModel';
import { capitalize } from 'utils/text';
import { filterFoodByType } from 'pages/FoodMenu/services/foodService';
import { PromotionAppliedModel } from 'pages/FoodMenu/models/PromotionAppliedModel';
import { ConfirmationButton } from 'pages/FoodMenu/components/Buttons/ConfirmationButton';

const PromotionTypeSelectionItem: React.FC<{
  food: FoodModel;
  maxQuantity: number;
  currentQuantity: number;
  onQuantityChange: (food: FoodModel, currentValue: 1 | -1) => void;
}> = ({ food, maxQuantity, currentQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);
  const handleQuantity = (value: 1 | -1) => {
    setQuantity(quantity + value);
    onQuantityChange(food, value);
  };

  return (
    <>
      <CardItemSmall
        coverImg={food.cover}
        title={food.name}
        descriptionDirection="row"
      >
        {quantity > 0 ? (
          <QuantityButton
            disabledAdd={maxQuantity === currentQuantity}
            onQuantityChange={handleQuantity}
            quantity={quantity}
          />
        ) : (
          <IconButton
            onClick={() => handleQuantity(1)}
            disabled={maxQuantity === currentQuantity}
            aria-label="add"
          >
            <AddTwoTone fontSize="small" />
          </IconButton>
        )}
      </CardItemSmall>
    </>
  );
};

const PromotionTypeSelection: React.FC<{
  foodList: FoodModel[];
  type: FoodTypeEnum;
  maxQuantity: number;
  onSelectionChange: (selection: FoodOrderModel[], type: FoodTypeEnum) => void;
}> = ({ foodList, type, maxQuantity, onSelectionChange }) => {
  const [orderSelection, setOrderSelection] = useState<FoodOrderModel[]>([]);
  const ref = useRef(false);
  const handleQuantityChange = (foodEvt: FoodModel, newQuantity: 1 | -1) => {
    setOrderSelection(
      orderService.saveToOrderList(foodEvt, newQuantity, orderSelection),
    );
  };
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      return;
    }
    onSelectionChange(orderSelection, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderSelection]);
  return (
    <>
      <Typography
        style={{ marginTop: '10px', marginBottom: '10px', fontWeight: 700 }}
      >{`Select ${capitalize(
        type,
      )}. Limit: ${maxQuantity} item(s)`}</Typography>
      {filterFoodByType(foodList, type).map((food) => (
        <PromotionTypeSelectionItem
          key={food.id}
          food={food}
          maxQuantity={maxQuantity}
          currentQuantity={orderService.getRealOrderCount(orderSelection)}
          onQuantityChange={handleQuantityChange}
        />
      ))}
    </>
  );
};

const ShowDiscount: React.FC<{
  labels: { total: number; withDiscount: number } | null;
}> = ({ labels }) => {
  if (!labels) {
    return null;
  }
  return (
    <div>
      <Typography style={{ textDecoration: 'line-through', fontSize: '.8rem' }}>
        {currencyFormatter.format(labels.total, { code: 'USD' })}
      </Typography>
      <Typography style={{ fontWeight: 700, fontSize: '1.3rem' }}>
        {currencyFormatter.format(labels.withDiscount, { code: 'USD' })}
      </Typography>
    </div>
  );
};

const PriceLabel: React.FC<{
  promotion: PromotionModel;
  subOrder: CustomSubOrderPromotionModel;
}> = ({ promotion, subOrder }) => {
  if (promotion.closedPrice) {
    return (
      <Typography style={{ fontWeight: 700, fontSize: '1.3rem' }}>
        {currencyFormatter.format(promotion.closedPrice, { code: 'USD' })}
      </Typography>
    );
  }
  if (!promotionService.isCustomOrderReady(promotion.customizable, subOrder)) {
    return <span />;
  }
  return (
    <ShowDiscount
      labels={promotionService.getCustomizedOrderPrices(
        subOrder,
        promotion.discountPercentage,
      )}
    />
  );
};

export const CustomizablePromotionOrder: React.FC<{
  promotion: PromotionModel;
  availableFoods: FoodModel[];
  onPromotionApplied: (promotionApplied: PromotionAppliedModel) => void;
}> = ({ promotion, availableFoods, onPromotionApplied }) => {
  const [customOrder, setCustomOrder] = useState<CustomSubOrderPromotionModel>(
    {},
  );
  if (!promotion) {
    return null;
  }
  const handleOnClick = () => {
    onPromotionApplied(promotionService.applyPromotion(promotion, customOrder));
  };
  return (
    <>
      <div style={{ marginBottom: '100px' }}>
        {promotion.customizable.map((customFoods) => (
          <PromotionTypeSelection
            key={customFoods.foodType}
            foodList={availableFoods}
            type={customFoods.foodType}
            maxQuantity={customFoods.quantity}
            onSelectionChange={(subOrder, type) => {
              setCustomOrder({
                ...customOrder,
                [type]: subOrder,
              });
            }}
          />
        ))}
      </div>
      <ConfirmationButton
        LeftElement={
          <PriceLabel promotion={promotion} subOrder={customOrder} />
        }
        onClick={handleOnClick}
        buttonLabel="Add promo"
        disabled={
          !promotionService.isCustomOrderReady(
            promotion.customizable,
            customOrder,
          )
        }
      />
    </>
  );
};
