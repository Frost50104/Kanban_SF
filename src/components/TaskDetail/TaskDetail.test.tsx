import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TaskDetail from './TaskDetail';
import { Task } from '../../types';

const tasks: Task[] = [
  { id: 'abc123', title: 'Test Task', description: 'Some description', columnId: 'backlog' },
  { id: 'noDesc', title: 'No Desc Task', description: '', columnId: 'ready' },
];

const renderDetail = (taskId: string, onUpdate = jest.fn(), onDelete = jest.fn()) =>
  render(
    <MemoryRouter initialEntries={[`/tasks/${taskId}`]}>
      <Routes>
        <Route
          path="/tasks/:id"
          element={
            <TaskDetail
              tasks={tasks}
              onUpdateDescription={onUpdate}
              onDeleteTask={onDelete}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );

test('renders task title and description', () => {
  renderDetail('abc123');
  expect(screen.getByText('Test Task')).toBeInTheDocument();
  expect(screen.getByText('Some description')).toBeInTheDocument();
});

test('shows placeholder text when no description', () => {
  renderDetail('noDesc');
  expect(screen.getByText('This task has no description')).toBeInTheDocument();
});

test('clicking description enables editing', () => {
  renderDetail('abc123');
  fireEvent.click(screen.getByText('Some description'));
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('calls onUpdateDescription when Save is clicked', () => {
  const onUpdate = jest.fn();
  renderDetail('abc123', onUpdate);
  fireEvent.click(screen.getByText('Some description'));
  const textarea = screen.getByRole('textbox');
  fireEvent.change(textarea, { target: { value: 'Updated description' } });
  fireEvent.click(screen.getByText('Save'));
  expect(onUpdate).toHaveBeenCalledWith('abc123', 'Updated description');
});

test('renders delete button', () => {
  renderDetail('abc123');
  expect(screen.getByText('Delete task')).toBeInTheDocument();
});

test('calls onDeleteTask when Delete task is clicked', () => {
  const onDelete = jest.fn();
  renderDetail('abc123', jest.fn(), onDelete);
  fireEvent.click(screen.getByText('Delete task'));
  expect(onDelete).toHaveBeenCalledWith('abc123');
});
