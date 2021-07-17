import React from 'react';
import { Container } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { LandingContainer } from './containers/LandingContainer';

export const LandingPage: React.FC<RouteComponentProps> = () => {
  return (
    <Container>
      <LandingContainer />
    </Container>
  );
};
