import React, { useLayoutEffect, useState } from 'react';
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineNightlight } from "react-icons/md";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useLayoutEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 hover:dark:bg-gray-700 duration-200"
    >
      {theme === 'light' ? <IoSunnyOutline className='text-black w-5 h-5'/> : <MdOutlineNightlight className='text-white w-4 h-4'/> }
    </button>
  );
};

export default ThemeToggle;
