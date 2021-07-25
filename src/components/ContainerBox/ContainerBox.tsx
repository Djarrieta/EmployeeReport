import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

export const ContainerBox = (props: {
  children: JSX.Element;
  name: string;
}): JSX.Element => {
  const { children, name } = props;

  return (
    <Container>
      <Box marginTop={5} paddingTop={5}>
        <Typography variant="h4">{name}</Typography>
      </Box>
      {children}
    </Container>
  );
};
