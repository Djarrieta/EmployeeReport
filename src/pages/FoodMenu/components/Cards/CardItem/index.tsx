import React from 'react';
import { Button, ButtonBase, Grid, Typography } from '@material-ui/core';
import { useInView } from 'react-intersection-observer';
import { FoodImage } from 'pages/FoodMenu/components/FoodImage';
import { useStyles } from './styles';

export interface CardItemProps {
  title: string;
  description: string;
  highLight: string;
  cover: string;
  buttonText: string;
  onSelected: () => void;
  disabled?: boolean;
}

export const CardItem: React.FC<CardItemProps> = ({
  highLight,
  buttonText,
  description,
  cover,
  title,
  disabled,
  onSelected,
}) => {
  const classes = useStyles();
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  return (
    <article className={classes.paper} ref={ref}>
      <Grid container spacing={2}>
        <Grid item className={classes.imgContainer}>
          <ButtonBase
            data-testid="img-button"
            disabled={disabled}
            disableTouchRipple
            onClick={() => onSelected()}
          >
            {inView && <FoodImage cover={cover} className={classes.img} />}
          </ButtonBase>
        </Grid>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography
              className={classes.title}
              variant="subtitle1"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </Grid>
          <Grid item xs className={classes.priceContainer}>
            <Typography variant="subtitle1" className={classes.highLight}>
              {highLight}
            </Typography>
            <Button
              size="small"
              color="primary"
              disabled={disabled}
              className={classes.button}
              disableRipple
              onClick={() => {
                onSelected();
              }}
            >
              {buttonText}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </article>
  );
};
