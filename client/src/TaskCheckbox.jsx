import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TaskCheckbox({ onClick, background }) {
  return <Checkbox onClick={onClick} background={background} />;
}

TaskCheckbox.defaultProps = {
  onClick: null,
  background: null,
};

TaskCheckbox.propTypes = {
  onClick: PropTypes.func,
  background: PropTypes.string,
};

const Checkbox = styled.div`
background: ${({ background }) => background} no-repeat top left;
background-size: contain;

display: inline-block;
vertical-align: top;

height: 25px;
width: 25px;

border-radius: 5px;
border: 3px solid grey;
`;
