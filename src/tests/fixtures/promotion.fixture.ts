import { PromotionModel } from 'pages/FoodMenu/models/PromotionModel';
import cloneDeep from 'lodash/cloneDeep';
import * as foodFixture from 'tests/fixtures/food.fixture';

export const getSingle = (
  promotion?: Partial<PromotionModel>,
): PromotionModel =>
  cloneDeep({
    name: 'promotion',
    closedValues: foodFixture.getList(),
    closedPrice: 40,
    description: 'description',
    cover: 'cover.jpg',
    customizable: [],
    id: 1,
    ...promotion,
  });

export const getList = (
  ...promotions: Partial<PromotionModel>[]
): PromotionModel[] => {
  if (promotions.length === 0) {
    return cloneDeep([getSingle()]);
  }
  return promotions.map((partial) => getSingle(partial));
};
