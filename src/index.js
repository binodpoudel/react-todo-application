import React from 'react';
import ReactDOM from 'react-dom';
import '../src/style/index.css';
import App from './App';


 const dailyData = [
  { id: "todo-0", name: "Coding", completed: true },
  { id: "todo-1", name: "Search Google", completed: false },
  { id: "todo-2", name: "Sleep", completed: false }
];



ReactDOM.render(
  <React.StrictMode>
    <App dailyTasks={dailyData} /> 
  </React.StrictMode>,
  document.getElementById('root')
);

