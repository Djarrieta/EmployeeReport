import React, { createContext, useEffect, useState } from 'react';
import * as foodService from '../services/foodService';
import { FoodModel } from '../models/FoodModel';
import { FoodTypeEnum } from '../models/FoodTypeEnum';
import { PromotionModel } from '../models/PromotionModel';
import { MenuModel } from '../models/MenuModel';

export interface FoodMenuState {
  foods?: FoodModel[];
  promotions?: PromotionModel[];
  foodType?: FoodTypeEnum;
  allMenu?: MenuModel;
}

export const useStateContainer = (initialState: FoodMenuState = {}) => {
  const [allMenu, setAllMenu] = useState(
    initialState.allMenu || { foods: [], promotions: [] },
  );
  const [foodMenu, setFoodMenu] = useState(initialState.foods || []);
  const [promotions, setPromotions] = useState(initialState.promotions || []);

  const [foodType, setFoodType] = useState(initialState.foodType || null);
  useEffect(() => {
    foodService.listFood().then((menu) => setAllMenu(menu));
  }, []);

  useEffect(() => {
    const { foods: filteredFoods, promotions: filteredPromotions } =
      foodService.filterMenuByType(allMenu, foodType);
    setFoodMenu(filteredFoods);
    setPromotions(filteredPromotions);
  }, [allMenu, foodType]);

  return {
    data: { foodMenu, foodType, promotions, allMenu },
    mutations: { setFoodType },
  };
};

export const FoodMenuContext = createContext<
  ReturnType<typeof useStateContainer>
>({} as never);

export interface FoodProviderProps {
  initialState?: FoodMenuState;
}
export const FoodMenuProvider: React.FC<FoodProviderProps> = ({
  children,
  initialState = {},
}) => {
  const contextValue = useStateContainer(initialState);
  return (
    <FoodMenuContext.Provider value={contextValue}>
      {children}
    </FoodMenuContext.Provider>
  );
};
