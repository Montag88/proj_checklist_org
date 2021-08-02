import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// eslint-disable-next-line import/no-cycle
import RenderTreeNode from './RenderTreeNode';

import TaskButton from './TaskButton';
import TaskCheckbox from './TaskCheckbox';
import TaskTextbox from './TaskTextbox';

export default function TaskTreeNode({ nodeData, methods }) {
  const {
    path,
    id,
    parentID,
    // data,
    children,
    expanded,
    checked,
  } = nodeData;
  const {
    addNode,
    deleteNode,
    checkNode,
    expandNode,
  } = methods;

  function renderExpandButton() {
    const display = (children.length > 0) ? 'inline-block' : 'none';
    return (
      <TaskButton
        onClick={() => expandNode(id)}
        background={expanded ? 'url(images/chevron-up.svg)' : 'url(images/chevron-down.svg)'}
        display={display}
      />
    );
  }

  function renderChildren() {
    const display = (expanded && children.length > 0) ? 'flex' : 'none';
    return <RenderTreeNode nodes={children} methods={methods} display={display} />;
  }

  return (
    <TaskContainer>
      <UIContainer>
        <TaskCheckbox onClick={() => checkNode(id)} background={checked ? 'url(images/cross.svg)' : 'null'} />
        <TaskTextbox checked={checked} />
        {renderExpandButton()}
        <TaskButton onClick={() => addNode(id, path)} background="url(images/plus.svg)" />
        <TaskButton onClick={() => deleteNode(id, parentID)} background="url(images/trash.svg)" />
        <Dragbox />
      </UIContainer>
      {renderChildren()}
    </TaskContainer>
  );
}

TaskTreeNode.defaultProps = {
  nodeData: {
    path: null,
    id: null,
    parentID: null,
    data: null,
    children: [],
    expanded: false,
    checked: false,
  },
  methods: {},
};

TaskTreeNode.propTypes = {
  nodeData: PropTypes.shape({
    path: PropTypes.string,
    id: PropTypes.number,
    parentID: PropTypes.number,
    data: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.object),
    expanded: PropTypes.bool,
    checked: PropTypes.bool,
  }),
  methods: PropTypes.shape({
    addNode: PropTypes.func,
    deleteNode: PropTypes.func,
    checkNode: PropTypes.func,
    expandNode: PropTypes.func,
  }),
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
