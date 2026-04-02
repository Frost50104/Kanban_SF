import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders active and finished task counts', () => {
  render(<Footer activeTasks={3} finishedTasks={5} />);
  expect(screen.getByText(/Active tasks: 3/i)).toBeInTheDocument();
  expect(screen.getByText(/Finished tasks: 5/i)).toBeInTheDocument();
});
