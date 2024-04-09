import React, { useState,useEffect } from 'react';
import './todo.css'; // Import the CSS file

type Todo = {
  id: number;
  text: string;
  isCompleted: boolean;
};
type TodoComponentProps = {
  darkTheme: boolean;
  toggleTheme: () => void;
};

// Use the TodoComponentProps type for your component's props
const TodoComponent: React.FC<TodoComponentProps> = ({ darkTheme, toggleTheme }) => {
// const TodoComponent: React.FC = ({ darkTheme, toggleTheme }) => {

  // const [darkTheme, setDarkTheme] = useState(false);

  // // Function to toggle the theme
  // const toggleTheme = () => {
  //   setDarkTheme(prevTheme => !prevTheme);
  // };

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme]);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [input, setInput] = useState('');
  // const [darkTheme, setDarkTheme] = useState(false);

  const addTodo = (text: string): void => {
    if (text.trim() === '') return;
    const newTodo: Todo = { id: Date.now(), text, isCompleted: false };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      addTodo(input);
    }
  };

  const handleFilterChange = (filterType: 'all' | 'pending' | 'completed') => {
    setFilter(filterType);
  };

  const getFilteredTodos = (): Todo[] => {
    switch (filter) {
      case 'all': return todos;
      case 'pending': return todos.filter(todo => !todo.isCompleted);
      case 'completed': return todos.filter(todo => todo.isCompleted);
      default: return todos;
    }
  };
  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
 

  return (
    <div className={`min-h-screen ${darkTheme ? 'dark' : ''}`}>
      
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Todo App</h1>
        <div className="flex mb-4">
          <input
            className="border rounded-l-lg p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={input}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            placeholder="Add new todo"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}"
            onClick={() => addTodo(input)}
          >
            Add Todo
          </button>
        </div>
        <div className="mb-4">
          <button
            className={`text-sm px-4 py-1 rounded-full mr-2 focus:outline-none ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button
            className={`text-sm px-4 py-1 rounded-full mr-2 focus:outline-none ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handleFilterChange('pending')}
          >
            Pending
          </button>
          <button
            className={`text-sm px-4 py-1 rounded-full focus:outline-none ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handleFilterChange('completed')}
          >
            Completed
          </button>
        </div>
        {/* <ul>
          {getFilteredTodos().map((todo) => (
            <li
              key={todo.id}
              className="flex items-center mb-2 bg-gray-100 p-2 rounded justify-between"
            >
              <div className="flex items-center">
                <input
                  className="form-checkbox h-5 w-5"
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={`ml-2 ${todo.isCompleted ? 'line-through' : ''}`}>{todo.text}</span>
              </div>
              <button
                className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={() => toggleTodo(todo.id)}
              >
                ×
              </button>
            </li>
          ))}
          </ul> */}
        

<ul>
  {getFilteredTodos().map((todo) => (
    <li
      key={todo.id}
      className={`flex items-center mb-2 p-2 rounded justify-between 
                 ${darkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
    >
      <div className="flex items-center">
        <input
          className={`form-checkbox h-5 w-5 ${darkTheme ? 'text-blue-400 border-gray-600' : 'text-blue-600 border-gray-300'}`}
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className={`ml-2 ${todo.isCompleted ? 'line-through' : ''} 
                         ${darkTheme ? 'text-gray-300' : 'text-gray-800'}`}>
          {todo.text}
        </span>
      </div>
      <button
        className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        onClick={() => deleteTodo(todo.id)}
      >
        ×
      </button>
    </li>
  ))}
</ul>





      </div>
    </div>
  );
};

export default TodoComponent;
