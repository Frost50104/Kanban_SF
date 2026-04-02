import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../../types';
import styles from './TaskDetail.module.css';

interface TaskDetailProps {
  tasks: Task[];
  onUpdateDescription: (taskId: string, description: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ tasks, onUpdateDescription, onDeleteTask }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task?.description || '');

  if (!task) {
    return (
      <main className={styles.container}>
        <div className={styles.card}>
          <p>Task not found.</p>
          <button className={styles.closeButton} onClick={() => navigate('/')}>×</button>
        </div>
      </main>
    );
  }

  const handleSave = () => {
    onUpdateDescription(task.id, description);
    setIsEditing(false);
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
    navigate('/');
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Close">
          ×
        </button>
        <h2 className={styles.title}>{task.title}</h2>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete task
        </button>
        <div className={styles.descriptionArea}>
          {isEditing ? (
            <>
              <textarea
                className={styles.textarea}
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                autoFocus
                rows={6}
              />
              <div className={styles.editActions}>
                <button className={styles.saveButton} onClick={handleSave}>
                  Save
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setDescription(task.description);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p
              className={styles.description}
              onClick={() => setIsEditing(true)}
              title="Click to edit"
            >
              {task.description || 'This task has no description'}
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default TaskDetail;
