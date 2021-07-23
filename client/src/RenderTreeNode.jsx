import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-cycle
import TaskTreeNode from './TaskTreeNode';

export default function RenderTreeNode({ node, setNode }) {
  function mapElements(taskID, i) {
    const props = {
      node,
      setNode,
      taskID,
      i,
    };
    return <TaskTreeNode key={taskID} props={props} />;
  }

  return (
    <SubtaskContainer id={`${node.ID}subtasks`}>
      {node.children.map((taskID, i) => mapElements(taskID, i))}
    </SubtaskContainer>
  );
}

RenderTreeNode.defaultProps = {
  node: null,
  setNode: null,
};

RenderTreeNode.propTypes = {
  node: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.number),
    ID: PropTypes.number,
  }),
  setNode: PropTypes.func,
};

const SubtaskContainer = styled.div`
  display: flex;

  flex-direction: column-reverse;

  border: 1px dashed blue;
  border-radius: 4px;
`;
