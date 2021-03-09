import React,  { useState, useRef, useEffect } from 'react';
import { Todo, ButtonFilter, TodoForm } from "./components/index";
import { nanoid } from "nanoid";





function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const allFilter = {
  All: () => true,
  Doing: task => !task.Finished,
  Finished: task => task.Finished
};  


const keyName = Object.keys(allFilter);



function App(props) {

  const [dailyTasks, setdailyTasks] = useState(props.dailyTasks);
  const [filter, setFilter] = useState('All');

  function toggleTaskCompleted(id) {
    const updatedTasks = dailyTasks.map(incomplete => {
      //  if shopping list is  incomplete edit and make complete 
      if (id === incomplete.id) {
        // using object spread to make a new object
        // whose `completed` prop has been inverted
        return {...incomplete, Finished: !incomplete.Finished}
      }
      return incomplete;
    });
    setdailyTasks(updatedTasks);
  }


  function deleteDailyTask(id) {
    const remainingTasks = dailyTasks.filter(task => id !== task.id);
    setdailyTasks(remainingTasks);
  }


  function editTask(id, newName) {
    const editedTaskList = dailyTasks.map(task => {
    // here if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setdailyTasks(editedTaskList);
  }

  
   
  const taskList = dailyTasks.filter(allFilter[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteDailyTask}
      editTask={editTask}
    />
  ));
//// Filter_NAMES to keyName

  const filterList = keyName.map(name => (
    <ButtonFilter
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setdailyTasks([...dailyTasks, newTask]);
  }


  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  //  here dailyTasks to dailyData
  const prevTaskLength = usePrevious(dailyTasks.length);

  useEffect(() => {
    if (dailyTasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
    // this code for dailyTasks to dailyData
  }, [dailyTasks.length, prevTaskLength]);

  return (
    
    <div className="todoapp stack-large">
      <TodoForm addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
           {taskList}
      </ul>
    </div>
  
  );
  
}

export default App;
