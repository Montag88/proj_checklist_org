import React, {useState, useEffect, useReducer} from 'react';
import TaskElement from './TaskElement';

export default function TaskContainer() {

  // REMOVE AND SIMPLIFY ANY DUPLICATE CODE

  // NEXT 
  // FORMAT CSS
  // ADD NESTED SUB TASKS
  // ADD TESTING for components
  // using array structure for now, will need to modify in future (Google LinkedMap, Double LL)

  // tasks state - keys of taskID, changed when any task is added/deleted (or expanded/collapsed)
  const [tasks, setTasks] = useState({
    order: [],
    placeholder: [99]
  });

  // generate unique taskID
  function generateTaskID() {
    console.log('in generate taskID')
    // need a better scheme, will generate random num for now
    var max = 100000;
    var taskID = Math.floor(Math.random() * max);
    // if tasks already contains taskID, generate another unique ID
    return tasks.order.includes(taskID) ? generateTaskID() : taskID;
  };
  
  // Add a new task
  function addTask() {
    console.log('In addTask');
    setTasks(prevTasks => {
      prevTasks.order.unshift(generateTaskID());
      return {...prevTasks};
    });
  };

  // Remove specific taskID key from tasks, pass down to TaskElement
  function deleteTask(taskIndex) {
    console.log('in deleteTask');
    // modify ReactDOM/state to remove html elements, DO NOT find html element by id and remove from DOM
    setTasks(prevTasks => {
      prevTasks.order.splice(taskIndex, 1);
      return {...prevTasks};
    });
  };

  // render all tasks
  function renderTasks() {
    console.log('in renderTasks')
    return (
      <>
        {
          tasks.order.map((task, i) => {
            return <TaskElement key={task} index={i} deleteTask={deleteTask}/>
          })
        }
      </>
    );
  };

  return (
    <div>
      <div>
        <input type='button' onClick={() => addTask()} />
        <button>Expand All</button>
        <button>Collapse All</button>
      </div>
      <table>
        <tbody>
          {renderTasks()}
        </tbody>
      </table>
    </div>
  );
}