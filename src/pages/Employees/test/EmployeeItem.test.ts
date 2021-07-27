import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmployeeItem } from '../components/EmployeeItem';

test('EmployeeItem displays', () => {
  const NewEmployeeName="NewEmployeeName"
  render(
    EmployeeItem({
      employee: { name: 'NewEmployeeName', id: 1, HD: 1, HN: 1 },
      handleDelete: () => {},
    }),
  );
  const EmployeeNameElement= screen.getByText('NewEmployeeName')
  expect(EmployeeNameElement).toBeInTheDocument();
});
