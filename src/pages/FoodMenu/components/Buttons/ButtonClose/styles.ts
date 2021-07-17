import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    closeContainer: {
      position: 'fixed',
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    closeButton: (props: { isDark?: boolean }) => ({
      backgroundColor: props.isDark ? '#fff' : '#000',
      color: props.isDark ? '#000' : '#fff',
      padding: '0px',
      marginTop: '20px',
      marginRight: '20px',
      boxShadow: 'rgba(0, 0, 0, 0.5) 0px 2px 5px 0px',
    }),
  }),
);
