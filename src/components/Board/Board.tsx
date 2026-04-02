import React from 'react';
import { Task, ColumnId } from '../../types';
import Column from '../Column/Column';
import styles from './Board.module.css';

interface BoardProps {
  tasks: Task[];
  onAddTask: (title: string) => void;
  onMoveTask: (taskId: string, targetColumn: ColumnId) => void;
}

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'ready', title: 'Ready' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'finished', title: 'Finished' },
];

const SOURCE_COLUMN: Partial<Record<ColumnId, ColumnId>> = {
  ready: 'backlog',
  inProgress: 'ready',
  finished: 'inProgress',
};

const Board: React.FC<BoardProps> = ({ tasks, onAddTask, onMoveTask }) => {
  const getTasksByColumn = (columnId: ColumnId) =>
    tasks.filter((t) => t.columnId === columnId);

  return (
    <main className={styles.board}>
      {COLUMNS.map((col) => {
        const sourceColId = SOURCE_COLUMN[col.id];
        const sourceTasks = sourceColId ? getTasksByColumn(sourceColId) : [];

        return (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={getTasksByColumn(col.id)}
            sourceTasks={sourceTasks}
            onAddTask={col.id === 'backlog' ? onAddTask : undefined}
            onMoveTask={
              col.id !== 'backlog'
                ? (taskId: string) => onMoveTask(taskId, col.id)
                : undefined
            }
            onDropTask={(taskId: string) => onMoveTask(taskId, col.id)}
          />
        );
      })}
    </main>
  );
};

export default Board;
