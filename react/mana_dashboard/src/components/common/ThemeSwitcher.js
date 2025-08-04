import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switch-container">
      <div className={`tdnn ${mode === 'light' ? 'day' : ''}`} onClick={toggleTheme}>
        <div className={`moon ${mode === 'light' ? 'sun' : ''}`}></div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
