import {
  Badge,
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core';

export const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }),
)(Badge);

export const useStyles = makeStyles(() =>
  createStyles({
    container: (props: { zIndex: number }) => ({
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
      zIndex: props.zIndex,
      boxShadow: 'rgba(0, 0, 0, 0.14) -1px -3px 18px 0px',
    }),
    containerInner: {
      paddingRight: '20px',
      paddingLeft: '20px',
      height: '60px',
      display: 'flex',
      alignItems: 'flex-end',
      backgroundColor: '#fff',
    },
    button: {
      color: '#fff',
      borderTopLeftRadius: '.50rem',
      borderTopRightRadius: '.50rem',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      height: '45px',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);
