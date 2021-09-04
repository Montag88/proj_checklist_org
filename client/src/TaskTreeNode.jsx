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
    txtHeight,
  } = nodeData;

  const {
    addNode,
    deleteNode,
    checkNode,
    expandNode,
    writeNodeText,
    writeNodeHeight,
  } = methods;

  const nodeClass = 'NodeCont';

  function handleDoubleClick(e) {
    if (!e.target.className.includes(nodeClass)) {
      return;
    }
    expandNode(id);
  }

  function renderTextbox() {
    return (
      <TaskTextbox
        id={id}
        data={data}
        checked={checked}
        writeNodeText={writeNodeText}
        writeNodeHeight={writeNodeHeight}
        txtHeight={txtHeight}
      />
    );
  }

  function renderExpandButton() {
    const display = (children.length > 0) ? 'inline-block' : 'none';
    return (
      <TaskButton
        onClick={() => expandNode(id)}
        bg={expanded ? 'url(images/chevron-up.svg)' : 'url(images/chevron-down.svg)'}
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
      <UIContainer onDoubleClick={(e) => handleDoubleClick(e)} className={nodeClass}>
        <Dragbox />
        <TaskCheckbox onClick={() => checkNode(id)} bg={checked ? 'url(images/cross.svg)' : 'null'} />
        {renderTextbox()}
        {renderExpandButton()}
        <TaskButton onClick={() => addNode(id, path)} bg="url(images/plus.svg)" />
        <TaskButton onClick={() => deleteNode(id, parentID)} bg="url(images/trash.svg)" />
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
    txtHeight: 0,
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
    txtHeight: PropTypes.number,
  }),
  methods: PropTypes.shape({
    addNode: PropTypes.func,
    deleteNode: PropTypes.func,
    checkNode: PropTypes.func,
    expandNode: PropTypes.func,
    writeNodeText: PropTypes.func,
    writeNodeHeight: PropTypes.func,
  }),
};

const TaskContainer = styled.div`
  border: 1px dotted black;
  margin: .1em .1em .1em 2.1em;
  
  border-radius: 6px;
`;

const UIContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  
  border-radius: 6px;
  
  white-space: nowrap;

  :hover {
    background-color: ${(props) => props.theme.hover};
  }
`;

const Dragbox = styled.div`
  display: inline-block;
  
  width: 1.8em;
  height: 1.8em;
  
  box-sizing: border-box;
  flex: none;
  margin: 0.1em;

  background: url(images/menu-vertical.svg) no-repeat top left;
  background-position: top;
  background-size: contain;
`;
