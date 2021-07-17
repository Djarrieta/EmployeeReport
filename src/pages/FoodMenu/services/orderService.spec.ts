import * as orderFixture from 'tests/fixtures/order.fixture';
import { OrderStateModel } from 'pages/FoodMenu/context/models/OrderStateModel';
import nock from 'nock';
import matches from 'lodash/matches';
import * as orderService from './orderService';
import { ORDER_IDENTIFIER } from './orderService';

describe('Order service test', () => {
  let order: OrderStateModel;

  beforeEach(() => {
    order = orderFixture.getSingle();
  });
  it('should persist order', () => {
    jest.spyOn(localStorage, 'setItem');
    orderService.persistOrder(order);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      ORDER_IDENTIFIER,
      JSON.stringify(order),
    );
  });

  it('should create order', async () => {
    const expectedUuid = '12345';
    nock('http://localhost')
      .post('/orders', matches(order))
      .reply(200, { uuid: expectedUuid });
    const uuid = await orderService.createOrder(order);
    expect(uuid).toBe(expectedUuid);
  });
});
