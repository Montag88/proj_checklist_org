import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-cycle
import TaskTreeNode from './TaskTreeNode';

export default function RenderTreeNode({ nodes, methods, display }) {
  return (
    <>
      <SubtaskContainer display={display}>
        <TestCont />
        {nodes.map((nodeData) => (
          <TaskTreeNode nodeData={nodeData} key={nodeData.id} methods={methods} />
        ))}
      </SubtaskContainer>
      <TestCont />
    </>
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

  flex-flow: column nowrap;

  border-radius: 6px;
`;

const TestCont = styled.div`
  height: 5px;
  background-color: black;
`;
