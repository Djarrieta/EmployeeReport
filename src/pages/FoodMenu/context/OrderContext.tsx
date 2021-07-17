import React, { createContext, useContext, useEffect, useState } from 'react';
import { FoodModel } from 'pages/FoodMenu/models/FoodModel';
import * as foodOrderService from 'pages/FoodMenu/services/foodOrderService';
import * as promotionService from 'pages/FoodMenu/services/promotionService';
import * as orderService from 'pages/FoodMenu/services/orderService';
import { PromotionAppliedModel } from 'pages/FoodMenu/models/PromotionAppliedModel';
import { OrderStateModel } from 'pages/FoodMenu/context/models/OrderStateModel';
import { SessionContext } from 'context/SessionContext';

export const useStateContainer = (
  initialState: { order: OrderStateModel; isPreparing?: boolean },
  sessionContext: typeof SessionContext,
) => {
  const {
    data: { sessionId },
  } = useContext(sessionContext);

  const [order, setOrder] = useState<OrderStateModel>(initialState.order);
  const [isPreparing, setIsPreparing] = useState(
    initialState.isPreparing || false,
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    orderService.persistOrder(order);
  }, [order]);

  const updateFoodOrder = (food: FoodModel, quantity: number) => {
    setOrder({
      promotions: order.promotions,
      foods: foodOrderService.saveToOrderList(food, quantity, order.foods),
    });
  };
  const savePromo = (promo: PromotionAppliedModel) => {
    setOrder({
      foods: order.foods,
      promotions: promotionService.saveToPromoList(promo, order.promotions),
    });
  };

  const removePromo = (promo: PromotionAppliedModel) => {
    setOrder({
      foods: order.foods,
      promotions: promotionService.removeFromPromoList(promo, order.promotions),
    });
  };

  const getTotalAmount = (): number => {
    return (
      foodOrderService.getTotal(order.foods) +
      promotionService.calculateTotalInPromos(order.promotions)
    );
  };

  const sendOrder = (): Promise<void> => {
    return orderService
      .createOrder(order, sessionId)
      .then(() => {
        setIsPreparing(true);
        /* setTimeout(() => {
          setIsPreparing(false);
          setOrder({ promotions: [], foods: [] });
          setShowConfirmation(true);
        }, 5000); */
      })
      .catch((err) => console.log(err.response));
  };

  const getTotalItems = (): number => {
    return (
      foodOrderService.getRealOrderCount(order.foods) + order.promotions.length
    );
  };

  const clearOrder = () => {
    setOrder({ foods: [], promotions: [] });
  };

  return {
    data: { order, isPreparing, showConfirmation },
    computed: {
      get totalAmount(): number {
        return getTotalAmount();
      },
      get totalItems(): number {
        return getTotalItems();
      },
    },
    mutations: {
      updateFoodOrder,
      savePromo,
      removePromo,
      clearOrder,
      sendOrder,
      setShowConfirmation,
    },
  };
};

export const OrderContext = createContext<ReturnType<typeof useStateContainer>>(
  {} as never,
);

export const OrderProvider: React.FC = ({ children }) => {
  const contextValue = useStateContainer(
    {
      order: orderService.restoreOrder(),
      isPreparing: false,
    },
    SessionContext,
  );
  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};
