import React, { useState } from 'react';
import styled from 'styled-components';

import TaskButton from './TaskButton';
import TaskElement from './TaskElement';

import { addTask } from '../helpers';

export default function TaskContainer() {
  // REMOVE AND SIMPLIFY ANY DUPLICATE CODE
  // Clean code of errors constantly

  // NEXT
  // nested tasks indent, boxes around div containers for clarity
  // expand and collapse all
  // textbox entry and flex
  // ADD TESTING for components
  // rearrangeable tasks
  // data storage (task state, text, task order)
  // task animations/polish/new double chevrons
  // light text editing
  // using array structure for now, will need to modify in future (Google LinkedMap, Double LL)

  // tasks state - keys of taskID, changed when any task is added/deleted (or expanded/collapsed)
  const [tasksState, setTasks] = useState({
    order: [],
    placeholder: [99],
  });

  function mapElements(taskID, i) {
    const parentData = {
      i,
      tasksState,
      setTasks,
      taskID,
    };
    return <TaskElement key={taskID} parent={parentData} />;
  }

  return (
    <div>
      <div>
        <TaskHeader>
          <TaskButton onClick={() => addTask(tasksState, setTasks)} background="url(images/plus.svg)" alt="Add Task" />
          <TaskButton background="url(images/chevron-dbl-up.svg)" alt="Collapse All" />
          <TaskButton background="url(images/chevron-dbl-down.svg)" alt="Expand All" />
        </TaskHeader>
        <div>
          {tasksState.order.map((taskID, i) => mapElements(taskID, i))}
        </div>
      </div>
    </div>
  );
}

const TaskHeader = styled.div`
  text-align: left;
`;
