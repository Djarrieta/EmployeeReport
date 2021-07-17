import cloneDeep from 'lodash/cloneDeep';
import { PromotionAppliedModel } from 'pages/FoodMenu/models/PromotionAppliedModel';
import * as foodOrderFixture from 'tests/fixtures/food-order.fixture';

export const getSingle = (
  promotion?: Partial<PromotionAppliedModel>,
): PromotionAppliedModel =>
  cloneDeep({
    uuid: 'string',
    promotionId: 1,
    name: 'promotion',
    cover: 'cover.jpg',
    closedPrice: 40,
    totalMemorized: 1,
    foods: foodOrderFixture.getList(),
    ...promotion,
  });

export const getList = (
  ...foods: Partial<PromotionAppliedModel>[]
): PromotionAppliedModel[] => {
  if (foods.length === 0) {
    return cloneDeep([getSingle()]);
  }
  return foods.map((partial) => getSingle(partial));
};
