import { FoodModel } from 'pages/FoodMenu/models/FoodModel';
import { FoodTypeEnum } from 'pages/FoodMenu/models/FoodTypeEnum';
import cloneDeep from 'lodash/cloneDeep';

export const getSingle = (food?: Partial<FoodModel>): FoodModel =>
  cloneDeep({
    cover: 'cover.jpg',
    price: 30.2,
    name: 'pasta',
    type: FoodTypeEnum.MAIN,
    description: 'pasta',
    ...food,
  });

export const getList = (...foods: Partial<FoodModel>[]): FoodModel[] => {
  if (foods.length === 0) {
    return cloneDeep([getSingle()]);
  }
  return foods.map((partial) => getSingle(partial));
};
