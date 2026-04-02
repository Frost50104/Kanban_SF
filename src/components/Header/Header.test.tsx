import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

test('renders the board title', () => {
  render(<Header />);
  expect(screen.getByText('Awesome Kanban Board')).toBeInTheDocument();
});

test('user menu is hidden by default', () => {
  render(<Header />);
  expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
});

test('clicking avatar button opens the user menu', () => {
  render(<Header />);
  fireEvent.click(screen.getByLabelText('User menu'));
  expect(screen.getByText('Profile')).toBeInTheDocument();
  expect(screen.getByText('Log Out')).toBeInTheDocument();
});

test('arrow points down when menu is closed', () => {
  render(<Header />);
  expect(screen.getByText('▼')).toBeInTheDocument();
});

test('arrow points up when menu is open', () => {
  render(<Header />);
  fireEvent.click(screen.getByLabelText('User menu'));
  expect(screen.getByText('▲')).toBeInTheDocument();
});

test('clicking avatar button again closes the menu', () => {
  render(<Header />);
  fireEvent.click(screen.getByLabelText('User menu'));
  fireEvent.click(screen.getByLabelText('User menu'));
  expect(screen.queryByText('Profile')).not.toBeInTheDocument();
});
