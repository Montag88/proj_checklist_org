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
  
  width: 1.8em;
  height: 1.8em;
  
  box-sizing: border-box;
  flex: none;
  
  border: 2px solid ${(props) => props.theme.accent};
  margin: 0.1em;

  background: ${({ bg }) => bg} no-repeat top left;
  background-color: ${(props) => props.theme.bg};
  background-position: center;
  background-size: 80%;

  border-radius: 6px;
  
  color: black;
`;
