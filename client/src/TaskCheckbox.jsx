import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TaskCheckbox({ onClick, bg }) {
  return <Checkbox onClick={onClick} bg={bg} />;
}

TaskCheckbox.defaultProps = {
  onClick: null,
  bg: null,
};

TaskCheckbox.propTypes = {
  onClick: PropTypes.func,
  bg: PropTypes.string,
};

const Checkbox = styled.div`
  display: inline-block;
  
  width: 1.5em;
  height: 1.5em;
  
  flex: none;

  border: 1px solid grey;
  margin: 0.1em;

  background: ${({ bg }) => bg} no-repeat top left;
  background-position: center;
  background-size: contain;

  border-radius: 4px;
`;
