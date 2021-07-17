import { FoodOrderModel } from 'pages/FoodMenu/models/FoodOrderModel';
import cloneDeep from 'lodash/cloneDeep';
import * as foodFixture from 'tests/fixtures/food.fixture';

export const getSingle = (
  foodOrder?: Partial<FoodOrderModel>,
): FoodOrderModel =>
  cloneDeep({
    food: foodFixture.getSingle(),
    quantity: 1,
    ...foodOrder,
  });

export const getList = (
  ...foods: Partial<FoodOrderModel>[]
): FoodOrderModel[] => {
  if (foods.length === 0) {
    return cloneDeep([getSingle()]);
  }
  return foods.map((partial) => getSingle(partial));
};
