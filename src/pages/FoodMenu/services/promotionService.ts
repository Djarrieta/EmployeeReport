import currencyFormatter from 'currency-formatter';
import { PromotionAppliedModel } from 'pages/FoodMenu/models/PromotionAppliedModel';
import { PromotionCustomizableModel } from 'pages/FoodMenu/models/PromotionCustomizableModel';
import { CustomSubOrderPromotionModel } from 'pages/FoodMenu/models/CustomSubOrderPromotionModel';
import { FoodOrderModel } from 'pages/FoodMenu/models/FoodOrderModel';
import { FoodModel } from 'pages/FoodMenu/models/FoodModel';
import { v4 as uuidv4 } from 'uuid';
import { getRealOrderCount } from 'pages/FoodMenu/services/foodOrderService';
import * as foodOrderService from 'pages/FoodMenu/services/foodOrderService';
import { FoodTypeEnum } from 'pages/FoodMenu/models/FoodTypeEnum';
import { PromotionModel } from '../models/PromotionModel';

export const getPromotionHighLight = (promotion: PromotionModel): string => {
  let label = '';
  if (promotion.closedPrice) {
    label = `${currencyFormatter.format(promotion.closedPrice, {
      code: 'USD',
    })}!`;
  } else if (promotion.discountPercentage) {
    label = `${promotion.discountPercentage}% Off!`;
  }
  return label;
};

export const saveToPromoList = (
  promoApplied: PromotionAppliedModel,
  promoList: PromotionAppliedModel[],
): PromotionAppliedModel[] => {
  return [...promoList, promoApplied];
};

export const removeFromPromoList = (
  promoApplied: PromotionAppliedModel,
  promoList: PromotionAppliedModel[],
): PromotionAppliedModel[] => {
  const idx = promoList.findIndex((value) => value.uuid === promoApplied.uuid);
  promoList.splice(idx, 1);
  return [...promoList];
};

export const calculateTotalInPromos = (
  promoList: PromotionAppliedModel[],
): number => {
  return promoList.reduce(
    (current, promo) => current + promo.totalMemorized,
    0,
  );
};

export const isCustomOrderReady = (
  customizable: PromotionCustomizableModel[],
  subOrder?: CustomSubOrderPromotionModel,
): boolean => {
  if (!subOrder) {
    return false;
  }
  return customizable.every(
    (customItem) =>
      customItem.quantity ===
      getRealOrderCount(subOrder[customItem.foodType] || []),
  );
};

export const getCustomizedOrderPrices = (
  subOrder?: CustomSubOrderPromotionModel,
  discountPercentage?: number,
): { total: number; withDiscount: number } | null => {
  if (!subOrder || !discountPercentage) {
    return null;
  }
  const calculated = Object.values(subOrder).reduce(
    (current, order) =>
      current + (order ? foodOrderService.getTotal(order) : 0),
    0,
  );
  const discount = calculated * (discountPercentage / 100);
  return {
    total: calculated,
    withDiscount: calculated - discount,
  };
};

export const mapCustomOrders = (
  customOrder: CustomSubOrderPromotionModel,
): FoodOrderModel[] | undefined => {
  return Object.values(customOrder).reduce((current, order) => {
    if (!current) {
      return [];
    }
    if (!order) {
      return [...current];
    }
    return [...current, ...order];
  }, [] as FoodOrderModel[]);
};

export const mapClosedOrder = (values: FoodModel[]): FoodOrderModel[] => {
  return values.map<FoodOrderModel>((closed) => ({
    food: closed,
    quantity: 1,
  }));
};

export const calculatePromotionTotal = (
  promo: PromotionModel,
  subOrders?: FoodOrderModel[],
): number => {
  if (promo.closedPrice) {
    return Number(promo.closedPrice);
  }

  if (!subOrders) {
    return 0;
  }

  const subOrderTotal = foodOrderService.getTotal(subOrders);

  if (!promo.discountPercentage) {
    return subOrderTotal;
  }
  const discount = subOrderTotal * (Number(promo.discountPercentage) / 100);
  return subOrderTotal - discount;
};

export const applyPromotion = (
  promotion: PromotionModel,
  customOrder?: CustomSubOrderPromotionModel,
): PromotionAppliedModel => {
  const subOrders = customOrder
    ? mapCustomOrders(customOrder)
    : mapClosedOrder(promotion.closedValues);
  return {
    uuid: uuidv4(),
    promotionId: promotion.id,
    closedPrice: promotion.closedPrice,
    name: promotion.name,
    discountPercentage: promotion.discountPercentage,
    cover: promotion.cover,
    totalMemorized: calculatePromotionTotal(promotion, subOrders),
    foods: subOrders,
  };
};

export const filterPromotionsByType = (
  promotions: PromotionModel[],
  type: FoodTypeEnum,
): PromotionModel[] =>
  promotions.filter((promotion) => {
    return (
      (promotion.closedValues &&
        promotion.closedValues.some((food) => food.type === type)) ||
      (promotion.customizable &&
        promotion.customizable.some((custom) => custom.foodType === type))
    );
  });
