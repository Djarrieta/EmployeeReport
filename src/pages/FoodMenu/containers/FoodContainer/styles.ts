import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    foodItem: {
      '& article:not(:last-child)': {
        borderBottom: '1px solid #dee2e6',
      },
    },
  }),
);
