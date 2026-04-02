import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TaskCard from './TaskCard';
import { Task } from '../../types';

const task: Task = {
  id: 'card-1',
  title: 'Fix login bug',
  description: '',
  columnId: 'backlog',
};

const renderCard = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<TaskCard task={task} />} />
        <Route path="/tasks/:id" element={<div>Task detail page</div>} />
      </Routes>
    </MemoryRouter>
  );

test('renders the task title', () => {
  renderCard();
  expect(screen.getByText('Fix login bug')).toBeInTheDocument();
});

test('clicking the title navigates to the task detail page', () => {
  renderCard();
  fireEvent.click(screen.getByText('Fix login bug'));
  expect(screen.getByText('Task detail page')).toBeInTheDocument();
});

test('card has draggable attribute', () => {
  renderCard();
  const card = screen.getByText('Fix login bug').closest('div');
  expect(card).toHaveAttribute('draggable', 'true');
});

test('sets task data on drag start', () => {
  renderCard();
  const card = screen.getByText('Fix login bug').closest('div')!;
  const setData = jest.fn();
  fireEvent.dragStart(card, { dataTransfer: { setData, effectAllowed: '' } });
  expect(setData).toHaveBeenCalledWith('taskId', 'card-1');
  expect(setData).toHaveBeenCalledWith('sourceColumnId', 'backlog');
});
