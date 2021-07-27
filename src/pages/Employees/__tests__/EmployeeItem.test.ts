import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmployeeItem } from '../components/EmployeeItem';

const newEmployeeName="newEmployeeName"
beforeEach(()=>{
  
  render(
    EmployeeItem({
      employee: { name: 'newEmployeeName', id: 1, HD: 1, HN: 1 },
      handleDelete: () => {return  true},
    }),
  );
})
test('EmployeeItem displays', () => {
  const EmployeeNameElement= screen.getByText('newEmployeeName')
  expect(EmployeeNameElement).toBeInTheDocument();
});
test('delete button ok', () => {
  const buttonDelete= screen.getByRole('button')
  const result=fireEvent.click(buttonDelete);
  expect(result)

});
