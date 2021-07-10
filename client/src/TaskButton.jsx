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
  background: ${({ background }) => background} no-repeat top left;
  background-size: contain;

  display: inline-block;
  vertical-align: top;

  height: 25px;
  width: 25px;

  border-radius: 2px;
  border: 3px solid grey;
`;
