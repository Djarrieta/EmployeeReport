import { FoodOrderModel } from './FoodOrderModel';
import { PromotionAppliedModel } from './PromotionAppliedModel';

export interface OrderModel {
  promotions: PromotionAppliedModel[];
  foods: FoodOrderModel[];
}
