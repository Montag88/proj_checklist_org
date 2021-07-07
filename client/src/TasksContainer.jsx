import React, {useState, useEffect, useReducer} from 'react';
import TaskElement from './TaskElement';

export default function TaskContainer() {

  // REMOVE AND SIMPLIFY ANY DUPLICATE CODE
  // DEEP COPY OBJECT W/ JSON

  // tasks state - any task is added/deleted (updates when any task is expanded/collapsed)
  // tasks contains set of key/value pairs of taskIDs
  const [tasks, setTasks] = useState({2131:2131});

  //update when number of tasks in checklist changes, state change already triggers rerender
  // useEffect(
  //   () => {
  //     console.log('useEffect');
  //     renderTasks();
  //   },[checklist]
  // );
  
  // Add a new task object
  function addTask() {
    console.log('In addTask');
    // Deep copy in case of change to array of objects later
    var newTasks = JSON.parse(JSON.stringify(tasks));
    // create new property of tasks with unique taskID
    // Create a unique taskID/taskHash property in tasks
    var newTaskID = 12345;
    newTasks[newTaskID] = newTaskID
    setTasks(newTasks);
  };

  // Remove specific task, pass down to TaskElement
  // remove taskID from state tasks object
  function deleteTask(taskID) {
    console.log('in deleteTask');
    // modify ReactDOM/state to remove html elements, DO NOT find html element by id and remove from DOM
    var newTasks = JSON.parse(JSON.stringify(tasks));
    delete newTasks[taskID];
    setTasks(newTasks);
  };

  // render all task objects
  function renderTasks() {
    console.log('in renderTasks')
    return (
      <>
        {
          Object.keys(tasks).map((task) => {
            return <TaskElement key={task} id={task} deleteTask={deleteTask}/>
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