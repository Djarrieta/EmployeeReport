import { FoodOrderModel } from 'pages/FoodMenu/models/FoodOrderModel';
import { FoodModel } from 'pages/FoodMenu/models/FoodModel';

export const modifyQuantity = (
  cartItem: FoodOrderModel,
  quantity: number,
  orderList: FoodOrderModel[],
): FoodOrderModel[] => {
  const clonedOrder = [...orderList];
  const newCartItem = { ...cartItem };
  newCartItem.quantity += quantity;
  const idx = clonedOrder.findIndex(
    (item) => item.food.id === cartItem.food.id,
  );
  if (newCartItem.quantity > 0) {
    clonedOrder.splice(idx, 1, newCartItem);
  } else {
    clonedOrder.splice(idx, 1);
  }
  return clonedOrder;
};

export const saveToOrderList = (
  food: FoodModel,
  quantity: number,
  orderList: FoodOrderModel[],
): FoodOrderModel[] => {
  const clonedOrder = [...orderList];
  const foundItem = clonedOrder.find((item) => item.food.id === food.id);
  if (foundItem) {
    return modifyQuantity(foundItem, quantity, clonedOrder);
  }
  return [...clonedOrder, { food, quantity }];
};

export const getRealOrderCount = (orderList: FoodOrderModel[]): number =>
  orderList.reduce((total, { quantity }) => total + quantity, 0);

export const getTotal = (orderList: FoodOrderModel[]): number =>
  orderList.reduce(
    (total, { quantity, food: { price } }) => total + quantity * price,
    0,
  );
