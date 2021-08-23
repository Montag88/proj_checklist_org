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
    data,
    parentID,
    children,
    expanded,
    checked,
  } = nodeData;
  const {
    addNode,
    deleteNode,
    checkNode,
    expandNode,
    writeNodeText,
  } = methods;

  function renderTextbox() {
    return (
      <TaskTextbox
        id={id}
        data={data}
        checked={checked}
        writeNodeText={writeNodeText}
      />
    );
  }

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
    const display = (expanded && children.length > 0) ? 'block' : 'none';
    return <RenderTreeNode nodes={children} methods={methods} display={display} />;
  }

  return (
    <TaskContainer>
      <UIContainer onDoubleClick={() => expandNode(id)}>
        <TaskCheckbox onClick={() => checkNode(id)} background={checked ? 'url(images/cross.svg)' : 'null'} />
        {renderTextbox()}
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
    data: '',
    parentID: null,
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
    data: PropTypes.string,
    parentID: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.object),
    expanded: PropTypes.bool,
    checked: PropTypes.bool,
  }),
  methods: PropTypes.shape({
    addNode: PropTypes.func,
    deleteNode: PropTypes.func,
    checkNode: PropTypes.func,
    expandNode: PropTypes.func,
    writeNodeText: PropTypes.func,
  }),
};

const TaskContainer = styled.div`
  margin: 0 0 0 2em;
`;

const UIContainer = styled.div`
  display: flex;
  white-space: nowrap;
`;

const Dragbox = styled.div`
  display: inline-block;
  
  width: 1em;
  height: 1.5em;

  flex: none;

  background: url(images/menu-vertical.svg) no-repeat top left;
  background-position: top;
  background-size: contain;
`;
