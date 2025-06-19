import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Sun, Moon, Menu, X } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load todos and theme preference when component mounts
  useEffect(() => {
    // Load sample todos
    const sampleTodos = [
      { id: 1, text: 'Learn React basics', completed: true },
      { id: 2, text: 'Build a todo app', completed: false },
      { id: 3, text: 'Add dark mode feature', completed: false },
      { id: 4, text: 'Deploy the application', completed: false }
    ];
    setTodos(sampleTodos);

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  const themeClasses = darkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900';

  const cardClasses = darkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  const inputClasses = darkMode 
    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400' 
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
      {/* Navbar */}
      <nav className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  📝 TodoApp
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    filter === 'all'
                      ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100')
                  }`}
                >
                  All ({todos.length})
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    filter === 'active'
                      ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100')
                  }`}
                >
                  Active ({activeCount})
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    filter === 'completed'
                      ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100')
                  }`}
                >
                  Completed ({completedCount})
                </button>
              </div>
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  darkMode 
                    ? 'text-yellow-400 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <button
                  onClick={() => { setFilter('all'); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    filter === 'all'
                      ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100')
                  }`}
                >
                  All ({todos.length})
                </button>
                <button
                  onClick={() => { setFilter('active'); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    filter === 'active'
                      ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100')
                  }`}
                >
                  Active ({activeCount})
                </button>
                <button
                  onClick={() => { setFilter('completed'); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    filter === 'completed'
                      ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100')
                  }`}
                >
                  Completed ({completedCount})
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              My Tasks
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Stay organized and productive
            </p>
          </div>

          {/* Add Todo Input */}
          <div className={`${cardClasses} rounded-lg shadow-md p-4 mb-6 border transition-colors duration-300`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new todo..."
                className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-300 ${inputClasses}`}
              />
              <button
                onClick={addTodo}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Plus size={20} />
                Add
              </button>
            </div>
          </div>

          {/* Current Filter Display */}
          <div className={`${cardClasses} rounded-lg shadow-md p-3 mb-6 border transition-colors duration-300`}>
            <div className="text-center">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Showing: <span className="capitalize font-bold text-blue-500">{filter}</span> tasks
              </span>
            </div>
          </div>

          {/* Todo List */}
          <div className={`${cardClasses} rounded-lg shadow-md overflow-hidden border transition-colors duration-300`}>
            {getFilteredTodos().length === 0 ? (
              <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {filter === 'all' ? 'No todos yet. Add one above!' : 
                 filter === 'active' ? 'No active todos!' : 'No completed todos!'}
              </div>
            ) : (
              <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {getFilteredTodos().map((todo) => (
                  <div
                    key={todo.id}
                    className={`p-4 flex items-center gap-3 transition-colors duration-200 ${
                      darkMode 
                        ? 'hover:bg-gray-700' + (todo.completed ? ' bg-gray-750' : '')
                        : 'hover:bg-gray-50' + (todo.completed ? ' bg-gray-50' : '')
                    }`}
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        todo.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : (darkMode ? 'border-gray-500 hover:border-green-400' : 'border-gray-300 hover:border-green-400')
                      }`}
                    >
                      {todo.completed && <Check size={14} />}
                    </button>
                    
                    <span
                      className={`flex-1 transition-all duration-200 ${
                        todo.completed
                          ? (darkMode ? 'text-gray-500 line-through' : 'text-gray-500 line-through')
                          : (darkMode ? 'text-white' : 'text-gray-800')
                      }`}
                    >
                      {todo.text}
                    </span>
                    
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className={`flex-shrink-0 text-red-500 hover:text-red-700 p-1 rounded transition-colors duration-200 ${
                        darkMode ? 'hover:bg-red-900' : 'hover:bg-red-50'
                      }`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Stats */}
          <div className={`${cardClasses} rounded-lg shadow-md p-4 mt-6 border transition-colors duration-300`}>
            <div className={`flex justify-between items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <span>{activeCount} active</span>
              <span>{completedCount} completed</span>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  Clear completed
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className={`text-center mt-8 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>Built with React & Tailwind CSS</p>
            <p className="mt-1">✨ Now with Dark Mode & Responsive Design!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;