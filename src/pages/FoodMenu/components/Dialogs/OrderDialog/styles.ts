import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    dialog: {
      marginTop: '70px',
    },
    paper: {
      borderTopLeftRadius: '25px',
      borderTopRightRadius: '25px',
    },
    listContainer: {
      marginTop: '10px',
      padding: 0,
      backgroundColor: '#f9f9f7',
      marginBottom: '60px',
    },
    titleContainer: {
      backgroundColor: '#f9f9f7',
    },
    title: {
      fontWeight: 800,
      fontSize: '1.5rem',
    },
    noItemsContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '-60px',
      height: '100%',
    },
    noItemsContainerInner: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
    },
    noItemsLabel: {
      fontWeight: 700,
      fontSize: '1.2rem',
      padding: '15px',
    },
  }),
);
