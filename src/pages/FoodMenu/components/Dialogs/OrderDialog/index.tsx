import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from '@material-ui/core';
import { ShoppingBasket } from '@material-ui/icons';
import { ButtonAtBottom } from 'pages/FoodMenu/components/Buttons/ButtonAtBottom';
import { ButtonClose } from 'pages/FoodMenu/components/Buttons/ButtonClose';
import { FoodOrderModel } from 'pages/FoodMenu/models/FoodOrderModel';
import { OrderCard } from 'pages/FoodMenu/components/Cards/OrderCard';
import { FoodModel } from 'pages/FoodMenu/models/FoodModel';
import { PromotionAppliedModel } from 'pages/FoodMenu/models/PromotionAppliedModel';
import { PromotionOrderCard } from 'pages/FoodMenu/components/Cards/PromotionOrderCard';
import { useStyles } from './styles';

const FoodOrderList: React.FC<{
  foods: FoodOrderModel[];
  isPreparing: boolean;
  modifyFoodQuantity: (food: FoodModel, quantity: 1 | -1) => void;
}> = ({ foods, modifyFoodQuantity, isPreparing }) => {
  if (foods.length <= 0) {
    return null;
  }
  return (
    <>
      <Typography style={{ padding: '10px', fontWeight: 700 }}>
        Foods
      </Typography>
      {foods.map((cartItem) => (
        <OrderCard
          key={cartItem.food.id}
          cartItem={cartItem}
          isPreparing={isPreparing}
          onQuantityChange={(quantity) => {
            modifyFoodQuantity(cartItem.food, quantity);
          }}
        />
      ))}
    </>
  );
};

const PromotionOrderList: React.FC<{
  promotions: PromotionAppliedModel[];
  isPreparing: boolean;
  removePromotion: (promo: PromotionAppliedModel) => void;
}> = ({ promotions, removePromotion, isPreparing }) => {
  if (promotions.length <= 0) {
    return null;
  }
  return (
    <>
      <Typography style={{ padding: '10px', fontWeight: 700 }}>
        Promotions
      </Typography>
      {promotions.map((promo) => (
        <PromotionOrderCard
          key={promo.uuid}
          promotionApplied={promo}
          onRemove={removePromotion}
          isPreparing={isPreparing}
        />
      ))}
    </>
  );
};

export interface OrderDialogProps {
  onClose: () => void;
  open: boolean;
  totalAmount: number;
  totalItems: number;
  foods: FoodOrderModel[];
  promotions: PromotionAppliedModel[];
  removePromotion: (promo: PromotionAppliedModel) => void;
  modifyFoodQuantity: (food: FoodModel, quantity: 1 | -1) => void;
  clearOrder: () => void;
  onCreateOrder: () => void;
  isPreparing: boolean;
}

export const OrderDialog: React.FC<OrderDialogProps> = ({
  onClose,
  open,
  totalItems,
  totalAmount,
  foods,
  modifyFoodQuantity,
  promotions,
  removePromotion,
  clearOrder,
  onCreateOrder,
  isPreparing,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      keepMounted
      fullScreen
      classes={{ paper: classes.paper }}
      className={classes.dialog}
      open={open}
      onClose={onClose}
      aria-labelledby="Your Order"
      aria-describedby="Confirm your order"
    >
      <ButtonClose onClick={onClose} />
      <DialogTitle className={classes.titleContainer}>
        <span className={classes.title}>Your Order</span>
      </DialogTitle>
      <DialogContent className={classes.listContainer}>
        {foods.length > 0 || promotions.length > 0 ? (
          <>
            <PromotionOrderList
              promotions={promotions}
              removePromotion={removePromotion}
              isPreparing={isPreparing}
            />
            <FoodOrderList
              foods={foods}
              modifyFoodQuantity={modifyFoodQuantity}
              isPreparing={isPreparing}
            />

            <Button
              style={{ margin: '15px', width: '-webkit-fill-available' }}
              fullWidth
              color="primary"
              disabled={isPreparing}
              onClick={() => clearOrder()}
            >
              Clear Order
            </Button>
          </>
        ) : (
          <div className={classes.noItemsContainer}>
            <div className={classes.noItemsContainerInner}>
              <span>
                <ShoppingBasket />
              </span>
              <Typography variant="body1" className={classes.noItemsLabel}>
                You still do not have any product in your order
              </Typography>
            </div>
          </div>
        )}
      </DialogContent>
      <ButtonAtBottom
        zIndex={101}
        badgeNumber={totalItems}
        amount={totalAmount}
        text={!isPreparing ? 'Confirm order' : 'Preparing...'}
        onClick={() => onCreateOrder()}
        disabled={totalItems <= 0 || isPreparing}
      />
    </Dialog>
  );
};
