import React, { useContext } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FoodMenuContext } from 'pages/FoodMenu/context/FoodMenuContext';
import { FoodTypeEnum } from 'pages/FoodMenu/models/FoodTypeEnum';
import { GiCakeSlice, GiKnifeFork } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import { useStyles } from './styles';

export const MenuContainer: React.FC = () => {
  const {
    mutations: { setFoodType },
    data: { foodType },
  } = useContext(FoodMenuContext);
  const classes = useStyles();
  return (
    <BottomNavigation
      value={foodType}
      onChange={(event, newValue) => {
        setFoodType(newValue);
      }}
      showLabels
      className={classes.stick}
    >
      <BottomNavigationAction
        value={null}
        label="All"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Mains"
        value={FoodTypeEnum.MAIN}
        icon={<GiKnifeFork size="25" />}
      />
      <BottomNavigationAction
        label="Drinks"
        value={FoodTypeEnum.DRINK}
        icon={<BiDrink size="25" />}
      />
      <BottomNavigationAction
        label="Desserts"
        value={FoodTypeEnum.DESSERT}
        icon={<GiCakeSlice size="25" />}
      />
    </BottomNavigation>
  );
};
