import React, { createContext, useEffect, useRef, useState } from 'react';
import { SessionState } from 'context/models/SessionState';
import * as sessionService from '../services/sessionService';

export const useStateContainer = (initialState: SessionState = {}) => {
  const [username, setUsername] = useState(initialState.username);
  const [sessionId, setSessionId] = useState(initialState.sessionId);
  const usernameRef = useRef(false);

  useEffect(() => {
    if (!usernameRef.current) {
      usernameRef.current = true;
      return;
    }
    if (!username) {
      return;
    }
    setSessionId(sessionService.createSession(username));
  }, [username]);

  return {
    data: { username, sessionId },
    mutations: { setUsername },
  };
};

export const SessionContext = createContext<
  ReturnType<typeof useStateContainer>
>({} as never);

export const SessionProvider: React.FC = ({ children }) => {
  const contextValue = useStateContainer(sessionService.recoverSession());
  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
