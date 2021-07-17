import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      backgroundColor: '#f9f9f7',
    },
    title: {
      fontWeight: 800,
      fontSize: '1.8rem',
    },
    price: {
      marginTop: '10px',
      fontWeight: 600,
      fontSize: '1.2rem',
      color: '#000',
    },
    content: {
      marginTop: '-15px',
    },
    img: (props: { imgHeight: string; imgPosition: string }) => ({
      display: 'block',
      width: '100%',
      height: props.imgHeight,
      objectFit: 'cover',
      objectPosition: `0px ${props.imgPosition}`,
    }),
    contentDescription: {
      paddingBottom: '10px',
      borderBottom: '1px solid #dee2e6',
    },
  }),
);
