import React from 'react';
import { Container } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { MenuContainer } from './containers/MenuContainer';
import { FoodMenuProvider } from './context/FoodMenuContext';
import { FoodContainer } from './containers/FoodContainer';
import { OrderContainer } from './containers/OrderContainer';
import { OrderProvider } from './context/OrderContext';
import { useStyles } from './styles';
import { PromotionContainer } from './containers/PromotionContainer';

export const FoodMenuPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" disableGutters>
      <OrderProvider>
        <FoodMenuProvider>
          <MenuContainer />
          <div className={classes.container}>
            <PromotionContainer />
            <FoodContainer />
          </div>
          <OrderContainer />
        </FoodMenuProvider>
      </OrderProvider>
    </Container>
  );
};
