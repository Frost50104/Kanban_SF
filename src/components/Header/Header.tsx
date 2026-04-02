import React, { useState } from 'react';
import UserMenu from '../UserMenu/UserMenu';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Awesome Kanban Board</h1>
      <div className={styles.userArea}>
        <button
          className={styles.avatarButton}
          onClick={handleToggleMenu}
          aria-label="User menu"
        >
          <svg
            className={styles.avatarIcon}
            viewBox="0 0 40 40"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="14" r="8" />
            <path d="M4 36c0-8.837 7.163-16 16-16s16 7.163 16 16" />
          </svg>
          <span className={styles.arrow}>{menuOpen ? '▲' : '▼'}</span>
        </button>
        {menuOpen && <UserMenu onClose={() => setMenuOpen(false)} />}
      </div>
    </header>
  );
};

export default Header;
