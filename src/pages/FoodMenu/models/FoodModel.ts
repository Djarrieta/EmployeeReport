import { FoodTypeEnum } from 'pages/FoodMenu/models/FoodTypeEnum';

export interface FoodModel {
  id?: number;
  name: string;
  price: number;
  cover: string;
  type: FoodTypeEnum;
  description: string;
}
