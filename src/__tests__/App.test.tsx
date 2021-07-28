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

test('change route to Employees', () => {
  const buttonEmployees = screen.getAllByText('Employees')[0];
  fireEvent.click(buttonEmployees);

  expect(window.location.pathname).toBe('/Employees');
});

test('click on add butto with error', () => {
  const buttonAdd = screen.getByText('Add');
  fireEvent.click(buttonAdd);

  const displayError = screen.getByText(
    'Dario, there is no name for the new employee.',
  );
  setTimeout(() => {
    expect(displayError).toBeInTheDocument();
  }, 500);
});

test('click on add button success', () => {
  const buttonAdd = screen.getByText('Add');
  const inputText = screen.getByTestId('employeeName');
  userEvent.type(inputText, 'hola');
  fireEvent.click(buttonAdd);

  setTimeout(() => {
    const displayError = screen.getByText('hola has been created.');
    expect(displayError).toBeInTheDocument();
  }, 500);
});

test('change route to Reports', () => {
  const buttonReports = screen.getAllByText('Reports')[0];
  fireEvent.click(buttonReports);

  expect(window.location.pathname).toBe('/Reports');
});
test('click to save with error', () => {
  const buttonAdd = screen.getByText('Save');
  fireEvent.click(buttonAdd);

  setTimeout(() => {
    const displayError = screen.getByText(
      'Dario, theres is no employee selected.',
    );
    expect(displayError).toBeInTheDocument();
  }, 500);
});
test('change signOut', () => {
  const buttonEmployees = screen.getAllByText('Dario')[0];
  fireEvent.click(buttonEmployees);

  expect(window.location.pathname).toBe('/');
});
