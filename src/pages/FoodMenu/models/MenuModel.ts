import { PromotionModel } from './PromotionModel';
import { FoodModel } from './FoodModel';

export interface MenuModel {
  promotions: PromotionModel[];
  foods: FoodModel[];
}
