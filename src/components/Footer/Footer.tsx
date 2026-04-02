import React from 'react';
import styles from './Footer.module.css';

interface FooterProps {
  activeTasks: number;
  finishedTasks: number;
}

const Footer: React.FC<FooterProps> = ({ activeTasks, finishedTasks }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.taskCounts}>
        <span className={styles.count}>Active tasks: {activeTasks}</span>
        <span className={styles.count}>Finished tasks: {finishedTasks}</span>
      </div>
      <span className={styles.credits}>Kanban board by Petr Popov, {currentYear}</span>
    </footer>
  );
};

export default Footer;
