import { OrderStateModel } from 'pages/FoodMenu/context/models/OrderStateModel';
import axios from 'axios';

export const ORDER_IDENTIFIER = 'MEMORIZED_ORDER';
export const IS_PREPARING_IDENTIFIER = 'IS_PREPARING';

export const persistOrder = (order: OrderStateModel): void => {
  localStorage.setItem(ORDER_IDENTIFIER, JSON.stringify(order));
};

export const restoreOrder = (): OrderStateModel => {
  const foundOrder = localStorage.getItem(ORDER_IDENTIFIER);
  if (!foundOrder) {
    return { promotions: [], foods: [] };
  }
  return JSON.parse(foundOrder);
};

export const SESSION_ID = 'X-Session-Id';

export const createOrder = (
  order: OrderStateModel,
  sessionId?: string,
): Promise<string> => {
  return axios
    .post<{ uuid: string }>('/orders', order, {
      headers: {
        [SESSION_ID]: sessionId,
      },
    })
    .then((res) => res.data.uuid);
};
