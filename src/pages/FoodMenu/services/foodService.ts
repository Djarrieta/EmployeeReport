import axios from 'axios';
import { FoodTypeEnum } from 'pages/FoodMenu/models/FoodTypeEnum';
import { MenuModel } from 'pages/FoodMenu/models/MenuModel';
import { FoodModel } from 'pages/FoodMenu/models/FoodModel';
import * as promotionService from 'pages/FoodMenu/services/promotionService';

export const listFood = (type?: FoodTypeEnum): Promise<MenuModel> =>
  axios.get<MenuModel>('/menu', { params: { type } }).then((res) => res.data);

export const filterFoodByType = (
  foods: FoodModel[],
  type: FoodTypeEnum,
): FoodModel[] => foods.filter((food) => food.type === type);

export const filterMenuByType = (
  menu: MenuModel,
  type?: FoodTypeEnum | null,
): MenuModel => {
  if (!type) {
    return menu;
  }
  return {
    foods: filterFoodByType(menu.foods, type),
    promotions: promotionService.filterPromotionsByType(menu.promotions, type),
  };
};
