import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

beforeEach(()=>{
  render(<App />);
})

test('login button working and loading displays', () => {
  const buttonLogin = screen.getByText("CONTINUE")
  expect(buttonLogin).toBeInTheDocument();
  fireEvent.click(buttonLogin)
  expect(buttonLogin).not.toBeInTheDocument()
});


