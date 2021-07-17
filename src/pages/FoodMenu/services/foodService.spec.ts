import nock from 'nock';
import { MenuModel } from 'pages/FoodMenu/models/MenuModel';
import * as foodFixture from 'tests/fixtures/food.fixture';
import * as promotionFixture from 'tests/fixtures/promotion.fixture';
import { FoodTypeEnum } from 'pages/FoodMenu/models/FoodTypeEnum';
import * as foodService from './foodService';

describe('food service test', () => {
  let menu: MenuModel;

  beforeEach(() => {
    menu = {
      foods: foodFixture.getList({ type: FoodTypeEnum.MAIN }),
      promotions: promotionFixture.getList({
        customizable: [{ foodType: FoodTypeEnum.MAIN, quantity: 1 }],
      }),
    };
  });
  it('should fetch foodMenu', async () => {
    nock('http://localhost')
      .get('/menu')
      .query({ type: FoodTypeEnum.DESSERT })
      .reply(200, menu);
    const data = await foodService.listFood(FoodTypeEnum.DESSERT);
    expect(data).toEqual(menu);
  });

  it('should filter foodMenu', () => {
    const expectedMenu: MenuModel = {
      promotions: [],
      foods: [],
    };
    const filtered = foodService.filterMenuByType(menu, FoodTypeEnum.DRINK);
    expect(filtered).toEqual(expectedMenu);
  });
});
