import React from 'react';
import { SessionProvider } from 'context/SessionContext';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

beforeEach(() => {
  render(
    <SessionProvider>
      <App />
    </SessionProvider>,
  );
});

test('login button working and UserName displays', () => {
  const userName = 'Dario';
  const buttonLogin = screen.getByText('Continue');
  const inputName = screen.getAllByText('Username');

  expect(buttonLogin).toBeInTheDocument();
  expect(inputName.length).toBeGreaterThan(0);

  userEvent.type(inputName[0], userName);
  fireEvent.click(buttonLogin);

  setTimeout(() => {
    const displayName = screen.getByText(userName);
    expect(displayName).toBeInTheDocument();
  }, 500);
});
