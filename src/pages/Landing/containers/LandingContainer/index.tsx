import React, { useContext } from 'react';
import { SessionContext } from 'context/SessionContext';
import { Landing } from 'pages/Landing/components/Landing';

export const LandingContainer: React.FC = () => {
  const {
    mutations: { setUsername },
  } = useContext(SessionContext);
  return <Landing onContinue={setUsername} />;
};
