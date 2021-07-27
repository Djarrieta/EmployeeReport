import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { EmployeeItem } from '../components/EmployeeItem';

beforeEach(() => {
  render(
    EmployeeItem({
      employee: { name: 'newEmployeeName', id: 1, HD: 1, HN: 1 },
      handleDelete: () => {
        return true;
      },
    }),
  );
});
test('EmployeeItem displays', () => {
  const EmployeeNameElement = screen.getByText('newEmployeeName');
  setTimeout(() => {
    expect(EmployeeNameElement).toBeInTheDocument();
  }, 1000);
});
test('delete button ok', () => {
  const buttonDelete = screen.getByRole('button');
  const result = fireEvent.click(buttonDelete);
  expect(result);
});
