import { SessionContext } from 'context/SessionContext';
import React, { FC, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteSession } from 'services/sessionService';

export const Header: FC = () => {
  const {
    data: { sessionId },
  } = useContext(SessionContext);
  const name = sessionId?.split(':::')[1];
  const history = useHistory();
  const signOut = () => {
    deleteSession();
    history.push('/');
  };
  return (
    <nav>
      <Link to="/">Login</Link>
      <Link to="/reports">Reports</Link>
      <Link to="/employees">Employees</Link>
      {sessionId && (
        <div>
          <span>{name}</span>
          <button type="button" onClick={signOut}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};
