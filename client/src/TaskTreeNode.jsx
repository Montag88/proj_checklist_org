import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// eslint-disable-next-line import/no-cycle
import RenderTreeNode from './RenderTreeNode';

import TaskButton from './TaskButton';
import TaskCheckbox from './TaskCheckbox';
import TaskTextbox from './TaskTextbox';

import {
  addNode, deleteNode, changeHTMLDisplay, moveNode,
} from '../helpers';

export default function TaskTreeNode({ props }) {
  const [node, setNode] = useState({
    ID: props.taskID,
    children: [],
  });
  // true - fade text/element, change functional buttons
  // false - shows default
  const [checkState, setCheck] = useState(false);
  // true - shows child tasks, toggles with collapse, container expands
  // false - hide child tasks, toggles with expand
  const [expandState, setExpand] = useState(true);

  // This fires uneccesarily, can refactor similar to conditional rendering of xb
  useEffect(() => {
    console.log('in expand effect: ');
    const { children } = document.getElementById(`${props.taskID}subtasks`);
    return !expandState ? changeHTMLDisplay(children, 'none') : changeHTMLDisplay(children, 'block');
  },
  [expandState]);

  function checkboxHandler() {
    console.log('in checkHandler');
    setCheck((prevState) => !prevState);
  }

  function expandHandler() {
    console.log('in expandHandler');
    setExpand((prevState) => !prevState);
  }

  function renderExpandButton() {
    let display = 'none';
    if (node.children.length > 0) {
      display = 'inline-block';
    }
    return (
      <TaskButton
        onClick={() => expandHandler()}
        id={`${props.taskID}xb`}
        background={expandState ? 'url(images/chevron-up.svg)' : 'url(images/chevron-down.svg)'}
        display={display}
      />
    );
  }

  return (
    <TaskContainer id={`${props.taskID}task`}>
      <UIContainer>
        <TaskCheckbox onClick={() => checkboxHandler()} background={checkState ? 'url(images/cross.svg)' : 'null'} />
        <TaskTextbox checkState={checkState} />
        {renderExpandButton()}
        <TaskButton onClick={() => addNode(node, setNode)} background="url(images/plus.svg)" />
        <TaskButton onClick={() => deleteNode(props.node, props.setNode, props.i)} background="url(images/trash.svg)" />
        <Dragbox />
        <TaskButton onClick={() => moveNode(props.node, props.setNode, props.i, 'up')} />
        <TaskButton onClick={() => moveNode(props.node, props.setNode, props.i, 'down')} />
      </UIContainer>
      <RenderTreeNode node={node} setNode={setNode} />
    </TaskContainer>
  );
}

TaskTreeNode.defaultProps = {
  props: null,
  node: {
    children: [],
  },
  setNode: null,
  i: null,
  taskID: null,
};

TaskTreeNode.propTypes = {
  props: PropTypes.shape(),
  node: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.number),
  }),
  setNode: PropTypes.func,
  i: PropTypes.number,
  taskID: PropTypes.number,
};

const TaskContainer = styled.div`
  margin: 0 0 0 2em;
`;

const UIContainer = styled.div`
  white-space: nowrap;
`;

const Dragbox = styled.div`
  display: inline-block;

  width: 1em;
  height: 1.5em;

  background: url(images/menu-vertical.svg) no-repeat top left;
  background-position: top;
  background-size: contain;
`;
