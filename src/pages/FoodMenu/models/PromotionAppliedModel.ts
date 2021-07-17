import { FoodOrderModel } from './FoodOrderModel';

export interface PromotionAppliedModel {
  uuid: string;
  promotionId: number;

  name: string;

  cover: string;

  closedPrice?: number;

  discountPercentage?: number;

  foods?: FoodOrderModel[];

  totalMemorized: number;
}
