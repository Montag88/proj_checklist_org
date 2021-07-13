import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TaskButton from './TaskButton';
import TaskCheckbox from './TaskCheckbox';
import TaskTextbox from './TaskTextbox';

import { addTask, deleteTask } from '../helpers';

export default function TaskElement({ parent }) {
  // CAN CONVERT SVG TO DATA URL TO REDUCE FILES AND ADDITIONAL CLIENTSIDE REQUESTS
  // USE GZIP TO COMPRESS SVGs

  // When checked, fade text color/ change container colors/lock and add function buttons
  const [checkState, setCheck] = useState(false);
  function checkboxHandler() {
    console.log('in checkHandler');
    setCheck((prevState) => !prevState);
  }
  // when expanded, renders child tasks, button changes to collapse, container expands
  const [expandState, setExpand] = useState(true);
  useEffect(() => {
    // const children = document.getElementById(`${parent.taskID}subtaskContainer`).children;
    const children = document.getElementById(`${parent.taskID}subtaskContainer`).children;
    console.log('children: ', children);
    if (!expandState) {
      for (let i = 0; i < children.length; i += 1) {
        children[i].style.display = 'none';
      }
    } else {
      for (let i = 0; i < children.length; i += 1) {
        children[i].style.display = 'block';
      }
    }
  },
  [expandState]);
  // use useeffect to collapse/expand children of subtask container when expanded state is modified
  // find subtask container by html id
  // select all children and set display to none

  function expandHandler() {
    console.log('in expandHandler');
    setExpand((prevState) => !prevState);
  }
  const [tasksState, setTasks] = useState({ order: [] });

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
      <Container>
        <TaskCheckbox onClick={() => checkboxHandler()} background={checkState ? 'url(images/cross.svg)' : 'null'} />
        <TaskTextbox />
        <TaskButton onClick={() => expandHandler()} background={expandState ? 'url(images/chevron-up.svg)' : 'url(images/chevron-down.svg)'} alt={expandState ? 'Collapse' : 'Expand'} />
        <TaskButton onClick={() => addTask(tasksState, setTasks)} background="url(images/plus.svg)" alt="Add SubTask" />
        <TaskButton onClick={() => deleteTask(parent.tasksState, parent.setTasks, parent.i)} background="url(images/trash.svg)" alt="Delete Task" />
        <Dragbox />
      </Container>
      <SubtaskContainer id={`${parent.taskID}subtaskContainer`}>
        {tasksState.order.map((taskID, i) => mapElements(taskID, i))}
      </SubtaskContainer>
    </div>
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

const SubtaskContainer = styled.div``;

const Container = styled.div`
  white-space: nowrap;
`;

const Dragbox = styled.div`
  background: url(images/menu-vertical.svg) no-repeat top left;
  background-size: contain;

  display: inline-block;
  vertical-align: top;

  height: 25px;
  width: 20px;
`;
