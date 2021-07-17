import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imgContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    paper: {
      marginTop: '10px',
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
      // borderBottom: '1px solid #dee2e6',
    },
    img: {
      margin: 'auto',
      display: 'block',
      borderRadius: '10px',
      width: 100,
      height: 100,
      objectFit: 'cover',
      animation: '.3s $fadeIn ease',
    },
    title: {
      fontWeight: 800,
      lineHeight: 1.1,
      fontSize: '1.2rem',
      letterSpacing: '0',
    },
    priceContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    highLight: {
      fontWeight: 800,
      fontSize: '1.1rem',
    },
    button: {
      fontWeight: 700,
      borderRadius: '1rem',
      boxShadow: '0px 1px 5px 1px rgba(0,0,0,0.14)',
    },
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
        filter: 'blur(5px)',
      },
      to: {
        opacity: 1,
        filter: 'blur(0)',
      },
    },
  }),
);
