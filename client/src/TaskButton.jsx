import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TaskButton({ onClick, background }) {
  return <Button onClick={onClick} background={background} />;
}

TaskButton.defaultProps = {
  onClick: null,
  background: null,
};

TaskButton.propTypes = {
  onClick: PropTypes.func,
  background: PropTypes.string,
};

const Button = styled.div`
  display: inline-block;

  width: 1.5em;
  height: 1.5em;

  border: 1px solid grey;
  margin: 0.1em;

  background: ${({ background }) => background} no-repeat top left;
  background-position: center;
  background-size: 80%;

  border-radius: 4px;
`;
