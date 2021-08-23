import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TaskButton({
  onClick, bg, id, display, text,
}) {
  return (
    <Button onClick={onClick} bg={bg} id={id} display={display}>
      {text}
    </Button>
  );
}

TaskButton.defaultProps = {
  onClick: null,
  bg: null,
  id: null,
  display: null,
  text: null,
};

TaskButton.propTypes = {
  onClick: PropTypes.func,
  bg: PropTypes.string,
  id: PropTypes.string,
  display: PropTypes.string,
  text: PropTypes.string,
};

const Button = styled.div.attrs((props) => ({
  id: props.id,
}))`
  display: ${({ display }) => (display || 'inline-block')};
  
  width: 1.5em;
  height: 1.5em;
  
  flex: none;
  
  border: 1px solid grey;
  margin: 0.1em;

  background: ${({ bg }) => bg} no-repeat top left;
  background-position: center;
  background-size: 80%;

  border-radius: 4px;
`;
