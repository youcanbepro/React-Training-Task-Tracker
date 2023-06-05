import { render, screen } from '@testing-library/react';
import App from './App';

test('Availability of Task Tracker app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Task Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
