import React, { createContext, useEffect, useRef, useState } from 'react';
import { SessionState } from 'context/models/SessionState';
import * as sessionService from '../services/sessionService';

export const useStateContainer = (
  initialState: SessionState = {},
): {
  data: { username: string | undefined; sessionId: string | undefined };
  mutations: {
    setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
    setAlert: React.Dispatch<React.SetStateAction<string>>;
  };
  alert: string;
} => {
  const [username, setUsername] = useState(initialState.username);
  const [sessionId, setSessionId] = useState(initialState.sessionId);
  const [alert, setAlert] = useState('');
  const usernameRef = useRef(false);

  useEffect(() => {
    if (!usernameRef.current) {
      usernameRef.current = true;
      return;
    }
    if (!username) {
      setSessionId(undefined);
      return;
    }
    setSessionId(sessionService.createSession(username));
  }, [username]);

  return {
    data: { username, sessionId },
    mutations: { setUsername, setAlert },
    alert,
  };
};

export const SessionContext = createContext<
  ReturnType<typeof useStateContainer>
>({} as never);

export const SessionProvider: React.FC = ({ children }): JSX.Element => {
  const contextValue = useStateContainer(sessionService.recoverSession());

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
