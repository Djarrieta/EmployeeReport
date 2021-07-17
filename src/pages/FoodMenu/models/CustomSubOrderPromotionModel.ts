import { FoodOrderModel } from './FoodOrderModel';
import { FoodTypeEnum } from './FoodTypeEnum';

export type CustomSubOrderPromotionModel = Partial<
  Record<FoodTypeEnum, FoodOrderModel[]>
>;
