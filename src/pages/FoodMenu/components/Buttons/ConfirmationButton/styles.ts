import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    actionContainer: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '-webkit-fill-available',
      padding: '1.5rem',
      boxShadow: '0px -3px 9px 2px rgb(255 255 255 / 82%)',
      backgroundColor: '#fff',
    },
    actionContainerInner: {
      width: '100%',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      height: '50px',
    },
    button: {
      color: '#fff',
      fontWeight: 600,
      borderRadius: '1rem',
      minWidth: '120px',
    },
  }),
);
