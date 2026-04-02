import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../types';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('sourceColumnId', task.columnId);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <button className={styles.title} onClick={handleClick}>
        {task.title}
      </button>
    </div>
  );
};

export default TaskCard;
