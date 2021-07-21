import React, { useState } from 'react';
import styled from 'styled-components';

import TaskButton from './TaskButton';
import TaskElement from './TaskElement';

import { addTask } from '../helpers';

export default function TasksComponent() {
  // REMOVE AND SIMPLIFY ANY DUPLICATE CODE
  // CLEAN CODE OF ERRORS CONSTANTLY

  // NEXT
  // flexbox to column-reverse to speed up modifying of order array
  // change task level (up/down), needs to carry children
  // data structure change (Google LinkedMap, Double LL, Tree)

  // change of functions/colors on add task
  // need to add border to SubtaskContainer if subtasks exist

  // change of functions/colors on check

  // textbox resize to fill to window
  // textbox flex fill to content (vertically)

  // rearrangeable tasks by drag

  // expand and collapse all
  // double click to expand/collapse

  // trash wait to delete

  // testing for components
  // data storage (task state, text, task order)
  // task animations/polish/new double chevrons
  // light text editing
  // convert svg to data URL
  // gzip to compress svgs

  // changes when any subtask is added/deleted
  const [tasksState, setTasks] = useState({
    // array of subtaskID nums
    order: [],
    // marker for proper copying of state
    placeholder: [99],
  });

  // props to children
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
    <Main>
      <UIContainer>
        <TaskButton onClick={() => addTask(tasksState, setTasks)} background="url(images/plus.svg)" alt="Add Task" />
        <TaskButton alt="Collapse All" />
        <TaskButton alt="Expand All" />
      </UIContainer>
      <SubtaskContainer>
        {tasksState.order.map((taskID, i) => mapElements(taskID, i))}
      </SubtaskContainer>
    </Main>
  );
}

const UIContainer = styled.div`
`;

const SubtaskContainer = styled.div`
  display: flex;

  flex-direction: column;

  border: 1px dashed blue;
  border-radius: 4px;
`;

const Main = styled.div`
  overflow: auto;

  width: 90%;
  min-width: 25%;
  max-width: 100%;

  height: 90%;
  min-height: 25%;
  max-height: 100%;

  border: 1px solid black;
  border-radius: 4px;

  resize: auto;
`;
