import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    img: {
      width: 50,
      height: 50,
      objectFit: 'cover',
      borderRadius: '10px',
    },
    paper: {
      padding: '15px',
      borderBottom: '1px solid #dee2e6',
      backgroundColor: '#fff',
    },
    item: {
      display: 'flex',
    },
    description: {
      marginLeft: '10px',
    },
    price: {
      fontWeight: 700,
      color: '#000',
    },
  }),
);
