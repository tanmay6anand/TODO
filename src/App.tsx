import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoComponent from './todo';
import CurrencyConverter from './currencyconverter';

export const App = () => {
  // State to manage the theme
  const [darkTheme, setDarkTheme] = useState(false);

  // Effect hook to apply the class to the root element
  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
          <ul className="flex space-x-4">
            <li>
              <Link to="/todo" className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-500">Todo List</Link>
            </li>
            <li>
              <Link to="/currency-converter" className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-500">Currency Converter</Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
          <button
            onClick={toggleTheme}
            className="rounded p-2 transition-colors duration-300 bg-blue-200 dark:bg-blue-400 text-blue-800 dark:text-blue-900"
          >
            {darkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/todo" element={<TodoComponent darkTheme={darkTheme} toggleTheme={toggleTheme}/>} />
            <Route path="/currency-converter" element={<CurrencyConverter darkTheme={darkTheme} toggleTheme={toggleTheme}/>} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
