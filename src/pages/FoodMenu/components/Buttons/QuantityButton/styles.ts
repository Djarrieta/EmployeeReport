import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    unitsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '1rem',
      boxShadow: '0px 1px 5px 1px rgba(0,0,0,0.14)',
      width: '120px',
    },
  }),
);
