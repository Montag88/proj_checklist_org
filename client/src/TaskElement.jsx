import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TaskButton from './TaskButton';
import TaskCheckbox from './TaskCheckbox';
import TaskTextbox from './TaskTextbox';

export default function TaskElement({ index, deleteTask }) {
  // ADD SUBTASK
  // RENDER SUBTASKS
  // CAN CONVERT SVG TO DATA URL TO REDUCE FILES AND ADDITIONAL CLIENTSIDE REQUESTS
  // USE GZIP TO COMPRESS SVGs
  // When checked, fade text color/ change container colors/lock and add function buttons
  const [checked, setChecked] = useState(false);
  function checkboxHandler() {
    console.log('in checkHandler');
    setChecked((prevState) => !prevState);
  }
  // when expanded, renders child tasks, button changes to collapse, container expands
  const [expanded, setExpanded] = useState(false);
  function expandHandler() {
    console.log('in expandHandler');
    setExpanded((prevState) => !prevState);
  }
  return (
    <tr>
      <td>
        <Container>
          <TaskCheckbox onClick={() => checkboxHandler()} background={checked ? 'url(images/cross.svg)' : 'null'} />
          <TaskTextbox />
          <TaskButton onClick={() => expandHandler()} background={expanded ? 'url(images/chevron-up.svg)' : 'url(images/chevron-down.svg)'} alt={expanded ? 'Collapse' : 'Expand'} />
          <TaskButton background="url(images/plus.svg)" alt="Add SubTask" />
          <TaskButton onClick={() => deleteTask(index)} background="url(images/trash.svg)" alt="Delete Task" />
          <Dragbox />
        </Container>
      </td>
    </tr>
  );
}

TaskElement.defaultProps = {
  deleteTask: null,
  index: null,
};

TaskElement.propTypes = {
  deleteTask: PropTypes.func,
  index: PropTypes.number,
};

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
