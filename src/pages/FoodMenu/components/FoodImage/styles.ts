import { createStyles, makeStyles } from '@material-ui/core/styles';

interface StyleProps {
  height: string;
}
export const useStyles = makeStyles(() =>
  createStyles({
    imgContainer: (props: StyleProps) => ({
      height: props.height,
    }),
    img: {
      animation: '.3s $fadeIn ease',
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
