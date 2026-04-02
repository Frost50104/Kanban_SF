import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Column from './Column';
import { Task } from '../../types';

const mockTasks: Task[] = [
  { id: '1', title: 'Task One', description: '', columnId: 'backlog' },
  { id: '2', title: 'Task Two', description: '', columnId: 'backlog' },
];

const sourceTasks: Task[] = [
  { id: '3', title: 'Source Task A', description: '', columnId: 'backlog' },
];

const renderColumn = (props = {}) =>
  render(
    <MemoryRouter>
      <Column
        id="backlog"
        title="Backlog"
        tasks={mockTasks}
        sourceTasks={[]}
        onAddTask={jest.fn()}
        onDropTask={jest.fn()}
        {...props}
      />
    </MemoryRouter>
  );

test('renders column title', () => {
  renderColumn();
  expect(screen.getByText('Backlog')).toBeInTheDocument();
});

test('renders task cards', () => {
  renderColumn();
  expect(screen.getByText('Task One')).toBeInTheDocument();
  expect(screen.getByText('Task Two')).toBeInTheDocument();
});

test('shows input when Add card is clicked on backlog', () => {
  renderColumn();
  fireEvent.click(screen.getByText('+ Add card'));
  expect(screen.getByPlaceholderText('New task title...')).toBeInTheDocument();
  expect(screen.getByText('Submit')).toBeInTheDocument();
});

test('calls onAddTask with input value when Submit is clicked', () => {
  const onAddTask = jest.fn();
  renderColumn({ onAddTask });
  fireEvent.click(screen.getByText('+ Add card'));
  const input = screen.getByPlaceholderText('New task title...');
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(screen.getByText('Submit'));
  expect(onAddTask).toHaveBeenCalledWith('New Task');
});

test('does not call onAddTask when input is empty', () => {
  const onAddTask = jest.fn();
  renderColumn({ onAddTask });
  fireEvent.click(screen.getByText('+ Add card'));
  fireEvent.click(screen.getByText('Submit'));
  expect(onAddTask).not.toHaveBeenCalled();
});

test('Add card button is disabled when sourceTasks is empty for non-backlog', () => {
  render(
    <MemoryRouter>
      <Column
        id="ready"
        title="Ready"
        tasks={[]}
        sourceTasks={[]}
        onMoveTask={jest.fn()}
        onDropTask={jest.fn()}
      />
    </MemoryRouter>
  );
  expect(screen.getByText('+ Add card')).toBeDisabled();
});

test('shows dropdown when Add card is clicked on non-backlog with source tasks', () => {
  render(
    <MemoryRouter>
      <Column
        id="ready"
        title="Ready"
        tasks={[]}
        sourceTasks={sourceTasks}
        onMoveTask={jest.fn()}
        onDropTask={jest.fn()}
      />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('+ Add card'));
  expect(screen.getByRole('listbox')).toBeInTheDocument();
});

test('calls onMoveTask when task selected from dropdown', () => {
  const onMoveTask = jest.fn();
  render(
    <MemoryRouter>
      <Column
        id="ready"
        title="Ready"
        tasks={[]}
        sourceTasks={sourceTasks}
        onMoveTask={onMoveTask}
        onDropTask={jest.fn()}
      />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('+ Add card'));
  fireEvent.change(screen.getByRole('listbox'), { target: { value: '3' } });
  expect(onMoveTask).toHaveBeenCalledWith('3');
});

test('calls onDropTask when a task is dropped on the column', () => {
  const onDropTask = jest.fn();
  render(
    <MemoryRouter>
      <Column
        id="ready"
        title="Ready"
        tasks={[]}
        sourceTasks={[]}
        onDropTask={onDropTask}
      />
    </MemoryRouter>
  );
  const column = screen.getByRole('region', { name: 'Ready' });
  fireEvent.drop(column, {
    dataTransfer: {
      getData: (key: string) => (key === 'taskId' ? 'task-x' : 'backlog'),
    },
  });
  expect(onDropTask).toHaveBeenCalledWith('task-x');
});
