import { PromotionCustomizableModel } from './PromotionCustomizableModel';
import { FoodModel } from './FoodModel';

export interface PromotionModel {
  id: number;

  name: string;

  cover: string;

  closedPrice?: number;

  customizable: PromotionCustomizableModel[];

  description: string;

  discountPercentage?: number;

  closedValues: FoodModel[];
}
