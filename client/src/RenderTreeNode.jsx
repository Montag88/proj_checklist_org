import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-cycle
import TaskTreeNode from './TaskTreeNode';

export default function RenderTreeNode({ nodes, methods, display }) {
  return (
    <SubtaskContainer display={display}>
      {nodes.map((nodeData) => (
        <TaskTreeNode nodeData={nodeData} key={nodeData.id} methods={methods} />
      ))}
    </SubtaskContainer>
  );
}

RenderTreeNode.defaultProps = {
  nodes: [],
  methods: null,
  display: null,
};

RenderTreeNode.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object),
  methods: PropTypes.objectOf(PropTypes.func),
  display: PropTypes.string,
};

const SubtaskContainer = styled.div`
  display: ${({ display }) => display || 'flex'};

  flex-direction: column-reverse;

  border: 1px dashed blue;
  border-radius: 4px;
`;
