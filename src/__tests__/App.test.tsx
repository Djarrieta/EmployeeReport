import React from 'react';
import { SessionProvider } from 'context/SessionContext';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const userName = 'Dario';

beforeEach(() => {
  render(
    <SessionProvider>
      <App />
    </SessionProvider>,
  );
});
test(' UserName errors works', () => {
  const buttonLogin = screen.getByText('Continue');
  fireEvent.click(buttonLogin);
  const displayError = screen.getByText('Incorrect entry.');
  setTimeout(() => {
    expect(displayError).toBeInTheDocument();
  }, 500);
});

test('login button working and UserName displays', () => {
  const buttonLogin = screen.getByText('Continue');
  const inputName = screen.getAllByText('Username');

  userEvent.type(inputName[0], userName);
  fireEvent.click(buttonLogin);

  setTimeout(() => {
    const displayName = screen.getByText(userName);
    expect(displayName).toBeInTheDocument();
  }, 500);
});

/* test('Employee Page renders ', () => {
  const buttonLogin = screen.getByText('Continue');
  const inputName = screen.getAllByText('Username');

  userEvent.type(inputName[0], userName);
  fireEvent.click(buttonLogin);

  const employeeButton = screen.getAllByRole('link')[1];
  fireEvent.click(employeeButton);
  const reportButton = screen.getAllByRole('link')[0];
  fireEvent.click(reportButton);

}); */
