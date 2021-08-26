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
  
  width: 1.8em;
  height: 1.8em;
  
  box-sizing: border-box;
  flex: none;

  border: 2px solid ${(props) => props.theme.accent};
  margin: 0.1em;

  background: ${({ bg }) => bg} no-repeat top left;
  background-color: ${(props) => props.theme.bg};
  background-position: center;
  background-size: contain;

  border-radius: 6px;
`;
