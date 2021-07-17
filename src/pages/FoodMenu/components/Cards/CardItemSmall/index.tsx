import React from 'react';
import { ButtonBase, Grid, Typography } from '@material-ui/core';
import { useInView } from 'react-intersection-observer';
import { FoodImage } from 'pages/FoodMenu/components/FoodImage';
import { useStyles } from './styles';

export interface CardItemSmallProps {
  coverImg: string;
  title: string;
  description?: string;
  descriptionBold?: boolean;
  descriptionDirection: 'row' | 'column';
  onImageClick?: () => void;
}

export const CardItemSmall: React.FC<CardItemSmallProps> = ({
  children,
  coverImg,
  title,
  description,
  descriptionBold,
  descriptionDirection,
  onImageClick,
}) => {
  const classes = useStyles({
    descriptionBold,
    descriptionDirection,
  });
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  return (
    <article className={classes.paper} ref={ref}>
      <Grid container alignItems="center" justify="space-between" spacing={2}>
        <Grid xs={8} item className={classes.item}>
          <Grid item>
            <ButtonBase
              disableTouchRipple
              onClick={() => onImageClick && onImageClick()}
            >
              {inView && <FoodImage cover={coverImg} className={classes.img} />}
            </ButtonBase>
          </Grid>
          <Grid item className={classes.description}>
            <Typography variant="subtitle1">{title}</Typography>
            {description && (
              <Typography
                variant="subtitle1"
                className={classes.descriptionInner}
              >
                {description}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid xs={4} item className={classes.rightContainer}>
          {children}
        </Grid>
      </Grid>
    </article>
  );
};
