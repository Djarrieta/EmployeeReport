import cloneDeep from 'lodash/cloneDeep';
import * as foodOrderFixture from 'tests/fixtures/food-order.fixture';
import * as promotionAppliedFixture from 'tests/fixtures/promotion-applied.fixture';
import { OrderStateModel } from 'pages/FoodMenu/context/models/OrderStateModel';

export const getSingle = (order?: Partial<OrderStateModel>): OrderStateModel =>
  cloneDeep({
    foods: foodOrderFixture.getList(),
    promotions: promotionAppliedFixture.getList(),
    ...order,
  });
