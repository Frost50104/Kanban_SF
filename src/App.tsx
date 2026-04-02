import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Task, ColumnId } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Board from './components/Board/Board';
import TaskDetail from './components/TaskDetail/TaskDetail';
import styles from './App.module.css';

const generateId = (): string => Date.now().toString(36) + Math.random().toString(36).slice(2);

const INITIAL_TASKS: Task[] = [
  { id: 'task1', title: 'Login page – performance issues', description: '', columnId: 'backlog' },
  { id: 'task2', title: 'Sprint bugfix', description: '', columnId: 'backlog' },
  { id: 'task3', title: 'Shop page – performance issues', description: '', columnId: 'ready' },
  { id: 'task4', title: 'Checkout bugfix', description: '', columnId: 'ready' },
  { id: 'task5', title: 'User page – performance issues', description: '', columnId: 'inProgress' },
  { id: 'task6', title: 'Auth bugfix', description: '', columnId: 'inProgress' },
  { id: 'task7', title: 'Main page – performance issues', description: '', columnId: 'finished' },
  { id: 'task8', title: 'Main page bugfix', description: '', columnId: 'finished' },
];

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('kanban-tasks', INITIAL_TASKS);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: generateId(),
      title,
      description: '',
      columnId: 'backlog',
    };
    setTasks([...tasks, newTask]);
  };

  const handleMoveTask = (taskId: string, targetColumn: ColumnId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const remaining = tasks.filter((t) => t.id !== taskId);
    setTasks([...remaining, { ...task, columnId: targetColumn }]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleUpdateDescription = (taskId: string, description: string) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, description } : t))
    );
  };

  const activeTasks = tasks.filter((t) => t.columnId === 'backlog').length;
  const finishedTasks = tasks.filter((t) => t.columnId === 'finished').length;

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Board
                tasks={tasks}
                onAddTask={handleAddTask}
                onMoveTask={handleMoveTask}
              />
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <TaskDetail
                tasks={tasks}
                onUpdateDescription={handleUpdateDescription}
                onDeleteTask={handleDeleteTask}
              />
            }
          />
        </Routes>
        <Footer activeTasks={activeTasks} finishedTasks={finishedTasks} />
      </div>
    </BrowserRouter>
  );
};

export default App;
