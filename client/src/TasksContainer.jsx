import React, { useState } from 'react';
import styled from 'styled-components';

import TaskElement from './TaskElement';
import TaskButton from './TaskButton';

export default function TaskContainer() {
  // REMOVE AND SIMPLIFY ANY DUPLICATE CODE

  // NEXT
  // textbox entry and flex
  // ADD NESTED SUB TASKS
  // ADD TESTING for components
  // rearrangeable tasks
  // data storage (task state, text, task order)
  // task animations/polish/new double chevrons
  // light text editing
  // using array structure for now, will need to modify in future (Google LinkedMap, Double LL)

  // tasks state - keys of taskID, changed when any task is added/deleted (or expanded/collapsed)
  const [tasks, setTasks] = useState({
    order: [],
    placeholder: [99],
  });

  // generate unique taskID
  function generateTaskID() {
    console.log('in generate taskID');
    const max = 100000;
    const taskID = Math.floor(Math.random() * max);
    // need a better scheme, will generate random num for now
    // if tasks already contains taskID, generate another unique ID
    return tasks.order.includes(taskID) ? generateTaskID() : taskID;
  }
  // Add a new task at beginning of order
  function addTask() {
    console.log('In addTask');
    setTasks((prevTasks) => {
      prevTasks.order.unshift(generateTaskID());
      return { ...prevTasks };
    });
  }

  // Remove specific taskID key from tasks, passed down to TaskElement
  // modify ReactDOM/state to remove html elements, DO NOT find html element by id and remove
  function deleteTask(taskIndex) {
    console.log('in deleteTask');
    setTasks((prevTasks) => {
      prevTasks.order.splice(taskIndex, 1);
      return { ...prevTasks };
    });
  }

  // render all tasks
  function renderTasks() {
    console.log('in renderTasks');
    return (
      <>
        {
          tasks.order.map((task, i) => <TaskElement key={task} index={i} deleteTask={deleteTask} />)
        }
      </>
    );
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <TaskHeader>
              <TaskButton onClick={() => addTask()} background="url(images/plus.svg)" alt="Add Task" />
              <TaskButton background="url(images/chevron-dbl-up.svg)" alt="Collapse All" />
              <TaskButton background="url(images/chevron-dbl-down.svg)" alt="Expand All" />
            </TaskHeader>
          </tr>
        </thead>
        <tbody>
          {renderTasks()}
        </tbody>
      </table>
    </div>
  );
}

const TaskHeader = styled.th`
  text-align: left;
`;
