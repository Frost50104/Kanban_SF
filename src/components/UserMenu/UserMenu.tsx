import React, { useEffect, useRef } from 'react';
import styles from './UserMenu.module.css';

interface UserMenuProps {
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className={styles.menu} ref={menuRef}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>Profile</li>
        <li className={styles.menuItem}>Log Out</li>
      </ul>
    </div>
  );
};

export default UserMenu;
