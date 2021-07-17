import { createStyles, makeStyles } from '@material-ui/core/styles';

interface StyleProps {
  descriptionDirection: 'row' | 'column';
  descriptionBold?: boolean;
}
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
    description: (props: StyleProps) => ({
      display: 'flex',
      flexDirection: props.descriptionDirection,
      alignItems: 'center',
      marginLeft: '10px',
    }),
    descriptionInner: (props: StyleProps) => ({
      fontWeight: props.descriptionBold ? 700 : 200,
      color: '#000',
      width: '100%',
    }),
    rightContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
);
