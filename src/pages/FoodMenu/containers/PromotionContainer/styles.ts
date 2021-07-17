import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      border: `3px solid ${theme.palette.primary.main}`,
      borderRadius: '10px',
      padding: '10px',
    },
    chipContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '-11px',
    },
    listContainer: {
      marginTop: '-35px',
      '& article:not(:last-child)': {
        borderBottom: '1px solid #dee2e6',
      },
    },
    chip: {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
      fontFamily: theme.typography.fontFamily,
      fontSize: '15px',
      padding: '5px',
      borderBottomLeftRadius: '10px',
      borderBottomRightRadius: '10px',
    },
  }),
);
