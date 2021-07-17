import { PromotionAppliedModel } from 'pages/FoodMenu/models/PromotionAppliedModel';
import { FoodOrderModel } from 'pages/FoodMenu/models/FoodOrderModel';

export interface OrderStateModel {
  promotions: PromotionAppliedModel[];
  foods: FoodOrderModel[];
}
