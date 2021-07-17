import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    stick: {
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
      backgroundColor: '#f9f9f7',
      boxShadow: '2px 3px 6px 1px rgba(0,0,0,0.14)',
    },
    img: {
      height: '30px',
      width: '30px',
    },
  }),
);
