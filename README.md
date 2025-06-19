# React Todo App

A beautiful, responsive todo list application built with React and Tailwind CSS. Perfect for beginners learning frontend development!

## 🌟 Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete individual todos
- ✅ Filter todos (All, Active, Completed)
- ✅ Clear all completed todos
- ✅ **🌙 Dark/Light Mode Toggle** - Manual theme switching with localStorage persistence
- ✅ **📱 Responsive Navbar** - Mobile-friendly navigation with hamburger menu
- ✅ **📊 Live Counter** - Real-time task counts in navigation
- ✅ Fully responsive design for all screen sizes
- ✅ Beautiful UI with smooth animations and transitions
- ✅ System theme preference detection
- ✅ Persistent theme selection across sessions

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Create a new React app:**
   ```bash
   npx create-react-app todo-app
   cd todo-app
   ```

2. **Install Tailwind CSS:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Configure Tailwind CSS:**
   
   Replace the content of `tailwind.config.js`:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. **Add Tailwind directives to your CSS:**
   
   Replace the content of `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. **Install Lucide React for icons:**
   ```bash
   npm install lucide-react
   ```

6. **Replace App.js content:**
   Copy the React component code from the artifact above and paste it into `src/App.js`

7. **Start the development server:**
   ```bash
   npm start
   ```

The app will open in your browser at `http://localhost:3000`

## 📂 Project Structure

```
todo-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js          # Main Todo component
│   ├── index.js        # Entry point
│   ├── index.css       # Tailwind CSS imports
│   └── ...
├── package.json
└── README.md
```

## 🎨 What You'll Learn

This project demonstrates key React concepts and modern web development practices:

### 1. **React Hooks**
- `useState` - Managing component state (todos, theme, mobile menu)
- `useEffect` - Side effects and lifecycle (theme persistence, initial data)

### 2. **Event Handling**
- Click events for buttons and navigation
- Key press events for input
- Form handling and mobile menu toggling

### 3. **State Management**
- Adding items to state arrays
- Updating objects in arrays
- Filtering and mapping arrays
- Theme state management

### 4. **Conditional Rendering**
- Showing different UI based on state
- Dynamic styling with conditions
- Theme-based class switching

### 5. **Responsive Design**
- Mobile-first approach
- Responsive navigation patterns
- Hamburger menu implementation
- Breakpoint-based styling

### 6. **Local Storage**
- Persisting user preferences
- Reading and writing to localStorage
- System theme preference detection

### 7. **Modern UI/UX**
- Dark/Light mode implementation
- Smooth transitions and animations
- Accessible design patterns

## 🔧 Key Code Concepts

### State Management
```javascript
const [todos, setTodos] = useState([]);
const [inputValue, setInputValue] = useState('');
const [darkMode, setDarkMode] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
```

### Theme Persistence
```javascript
// Save theme preference to localStorage
useEffect(() => {
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
}, [darkMode]);

// Load saved theme on component mount
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setDarkMode(savedTheme === 'dark');
  } else {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }
}, []);
```

### Dynamic Styling
```javascript
const themeClasses = darkMode 
  ? 'bg-gray-900 text-white' 
  : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900';

const cardClasses = darkMode 
  ? 'bg-gray-800 border-gray-700' 
  : 'bg-white border-gray-200';
```

### Responsive Navigation
```javascript
// Desktop navigation
<div className="hidden md:block">
  {/* Navigation items */}
</div>

// Mobile navigation
<div className="md:hidden">
  <button onClick={toggleMobileMenu}>
    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
</div>
```

### Adding Todos
```javascript
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
```

### Filtering Data
```javascript
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
```

## 🚀 Deployment Options

### Option 1: Netlify (Recommended for beginners)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Sign up at [Netlify](https://netlify.com)**

3. **Drag and drop the `build` folder** to Netlify's deploy area

4. **Your app is live!** Netlify will provide a URL.

### Option 2: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts** and your app will be deployed!

### Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/todo-app",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## 🎯 Next Steps & Enhancements

Once you're comfortable with the basics, try adding:

### Beginner Enhancements:
- **Todo Editing**: Double-click to edit existing todos
- **Keyboard Shortcuts**: Add shortcuts for common actions
- **Todo Priority**: Add high/medium/low priority levels
- **Sound Effects**: Add subtle sounds for actions

### Intermediate Features:
- **Categories/Tags**: Organize todos by category
- **Due Dates**: Add date functionality with calendar picker
- **Search Functionality**: Find specific todos with search bar
- **Drag & Drop**: Reorder todos with drag and drop
- **Bulk Operations**: Select multiple todos for bulk actions

### Advanced Features:
- **Data Sync**: Save to cloud database (Firebase/Supabase)
- **User Authentication**: Personal todo lists
- **Offline Support**: Progressive Web App (PWA) features
- **Notifications**: Browser notifications for due dates
- **Export/Import**: Backup and restore todo data
- **Collaboration**: Share todo lists with others
- **Analytics**: Track productivity statistics

## 📝 Code Customization

### Changing Colors
Modify the Tailwind classes in the component:
- `bg-blue-500` → `bg-purple-500` (change primary color)
- `from-blue-50 to-indigo-100` → `from-purple-50 to-pink-100` (change background gradient)
- Update both light and dark mode color schemes

### Theme Customization
```javascript
// Light mode colors
const lightTheme = {
  background: 'bg-gradient-to-br from-blue-50 to-indigo-100',
  card: 'bg-white border-gray-200',
  text: 'text-gray-900'
};

// Dark mode colors
const darkTheme = {
  background: 'bg-gray-900',
  card: 'bg-gray-800 border-gray-700',
  text: 'text-white'
};
```

### Adding New Features
The component is well-structured for extensions. Key functions to enhance:
- `addTodo()` - Enhance todo creation (categories, due dates)
- `getFilteredTodos()` - Add new filter types (priority, date)
- `toggleTheme()` - Add more theme options
- The JSX return - Modify the UI components

### Responsive Breakpoints
Customize the responsive behavior:
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)
- `2xl:` - 2X Large screens (1536px+)

## 🐛 Troubleshooting

### Common Issues:

1. **App won't start**: 
   - Make sure you have Node.js installed and ran `npm install`
   - Check if all dependencies are properly installed

2. **Styling issues**: 
   - Ensure Tailwind CSS is properly configured
   - Verify `tailwind.config.js` includes the correct content paths

3. **Icons not showing**: 
   - Check that `lucide-react` is installed: `npm install lucide-react`

4. **Dark mode not persisting**:
   - Check browser console for localStorage errors
   - Ensure the browser supports localStorage

5. **Mobile menu not working**:
   - Verify responsive classes are applied correctly
   - Check for JavaScript errors in console

6. **Theme toggle button not responding**:
   - Check if the `toggleTheme` function is properly bound
   - Verify state updates are working correctly

### Performance Tips:
- The app uses localStorage for theme persistence
- State updates are optimized to prevent unnecessary re-renders
- All animations use CSS transitions for smooth performance

### Getting Help:
- Check the browser console for errors
- Review the React documentation
- Visit Stack Overflow for common React issues
- Check the official Tailwind CSS documentation for styling issues

## 📚 Learning Resources

- [React Official Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [JavaScript ES6+ Features](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React Hooks Guide](https://reactjs.org/docs/hooks-intro.html)

---

**Happy coding! 🎉** This project gives you hands-on experience with modern React development. Take your time to understand each part, and don't hesitate to experiment with the code!