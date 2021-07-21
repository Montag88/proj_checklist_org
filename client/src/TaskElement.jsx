import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TaskButton from './TaskButton';
import TaskCheckbox from './TaskCheckbox';
import TaskTextbox from './TaskTextbox';

import {
  addTask, deleteTask, changeHTMLDisplay, moveTaskUp, moveTaskDown,
} from '../helpers';

export default function TaskElement({ parent }) {
  // true - fade text/element, change functional buttons
  // false - shows default
  const [checkState, setCheck] = useState(false);

  function checkboxHandler() {
    console.log('in checkHandler');
    setCheck((prevState) => !prevState);
  }

  // true - shows child tasks, toggles with collapse, container expands
  // false - hide child tasks, toggles with expand
  const [expandState, setExpand] = useState(true);

  useEffect(() => {
    const { children } = document.getElementById(`${parent.taskID}subtasks`);
    return !expandState ? changeHTMLDisplay(children, 'none') : changeHTMLDisplay(children, 'block');
  },
  [expandState]);

  function expandHandler() {
    console.log('in expandHandler');
    setExpand((prevState) => !prevState);
  }

  const [tasksState, setTasks] = useState({ order: [] });

  function mapElements(taskID, i) {
    const parentData = {
      tasksState,
      setTasks,
      taskID,
      i,
    };
    return <TaskElement key={taskID} parent={parentData} />;
  }

  return (
    <TaskContainer id={`${parent.taskID}task`}>
      <UIContainer>
        <TaskCheckbox onClick={() => checkboxHandler()} background={checkState ? 'url(images/cross.svg)' : 'null'} />
        <TaskTextbox />
        <ExpandButton onClick={() => expandHandler()} background={expandState ? 'url(images/chevron-up.svg)' : 'url(images/chevron-down.svg)'} display={tasksState.order.length ? 'block' : 'none'} alt={expandState ? 'Collapse' : 'Expand'} />
        <TaskButton onClick={() => addTask(tasksState, setTasks)} background="url(images/plus.svg)" alt="Add SubTask" />
        <TaskButton onClick={() => deleteTask(parent.tasksState, parent.setTasks, parent.i)} background="url(images/trash.svg)" alt="Delete Task" />
        <Dragbox />
        <TaskButton onClick={() => moveTaskUp(parent.tasksState, parent.setTasks, parent.i)} />
        <TaskButton onClick={() => moveTaskDown(parent.tasksState, parent.setTasks, parent.i)} />
      </UIContainer>
      <SubtaskContainer id={`${parent.taskID}subtasks`}>
        {tasksState.order.map((taskID, i) => mapElements(taskID, i))}
      </SubtaskContainer>
    </TaskContainer>
  );
}

TaskElement.defaultProps = {
  parent: null,
};

TaskElement.propTypes = {
  parent: PropTypes.shape({
    tasksState: PropTypes.shape({
      order: PropTypes.arrayOf(PropTypes.number),
    }),
    setTasks: PropTypes.func,
    i: PropTypes.number,
    taskID: PropTypes.number,
  }),
};

const TaskContainer = styled.div`
  margin: 0 0 0 2em;
`;

const SubtaskContainer = styled.div`
`;

const UIContainer = styled.div`
  white-space: nowrap;
`;

const ExpandButton = styled(TaskButton)`
`;

const Dragbox = styled.div`
  display: inline-block;

  width: 1em;
  height: 1.5em;

  background: url(images/menu-vertical.svg) no-repeat top left;
  background-position: top;
  background-size: contain;
`;
