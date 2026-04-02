import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('renders the kanban board title', () => {
  render(<App />);
  expect(screen.getByText(/Awesome Kanban Board/i)).toBeInTheDocument();
});

test('renders all four columns', () => {
  render(<App />);
  expect(screen.getByText('Backlog')).toBeInTheDocument();
  expect(screen.getByText('Ready')).toBeInTheDocument();
  expect(screen.getByText('In Progress')).toBeInTheDocument();
  expect(screen.getByText('Finished')).toBeInTheDocument();
});

test('renders footer with task counts', () => {
  render(<App />);
  expect(screen.getByText(/Active tasks:/i)).toBeInTheDocument();
  expect(screen.getByText(/Finished tasks:/i)).toBeInTheDocument();
});

test('initial tasks are shown in correct columns', () => {
  render(<App />);
  expect(screen.getByText('Login page – performance issues')).toBeInTheDocument();
  expect(screen.getByText('Shop page – performance issues')).toBeInTheDocument();
});
