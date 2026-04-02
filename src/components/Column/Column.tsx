import React, { useState } from 'react';
import { Task, ColumnId } from '../../types';
import TaskCard from '../TaskCard/TaskCard';
import styles from './Column.module.css';

interface ColumnProps {
  id: ColumnId;
  title: string;
  tasks: Task[];
  sourceTasks: Task[];
  onAddTask?: (title: string) => void;
  onMoveTask?: (taskId: string) => void;
  onDropTask: (taskId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  id,
  title,
  tasks,
  sourceTasks,
  onAddTask,
  onMoveTask,
  onDropTask,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const isBacklog = id === 'backlog';
  const isAddDisabled = !isBacklog && sourceTasks.length === 0;

  const handleAddClick = () => {
    if (isAddDisabled) return;
    setIsAdding(true);
  };

  const handleSubmit = () => {
    if (onAddTask && inputValue.trim()) {
      onAddTask(inputValue.trim());
    }
    setIsAdding(false);
    setInputValue('');
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const taskId = e.target.value;
    if (taskId && onMoveTask) {
      onMoveTask(taskId);
      setIsAdding(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    if (taskId && sourceColumnId !== id) {
      onDropTask(taskId);
    }
  };

  return (
    <section
      className={`${styles.column} ${isDragOver ? styles.dragOver : ''}`}
      aria-label={title}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2 className={styles.columnTitle}>{title}</h2>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {isAdding && isBacklog && (
          <input
            className={styles.input}
            type="text"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') handleSubmit();
            }}
            placeholder="New task title..."
            autoFocus
          />
        )}

        {isAdding && !isBacklog && (
          <select
            className={styles.dropdown}
            onChange={handleSelectChange}
            defaultValue=""
            size={sourceTasks.length + 1}
          >
            <option value="" disabled>Select a task...</option>
            {sourceTasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
        )}

        {isAdding && isBacklog ? (
          <button className={styles.submitButton} onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          !isAdding && (
            <button
              className={`${styles.addButton} ${isAddDisabled ? styles.addButtonDisabled : ''}`}
              onClick={handleAddClick}
              disabled={isAddDisabled}
            >
              + Add card
            </button>
          )
        )}
      </div>
    </section>
  );
};

export default Column;
