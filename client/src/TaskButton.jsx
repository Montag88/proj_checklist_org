import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TaskButton({
  onClick, background, id, display,
}) {
  return <Button onClick={onClick} background={background} id={id} display={display} />;
}

TaskButton.defaultProps = {
  onClick: null,
  background: null,
  id: null,
  display: null,
};

TaskButton.propTypes = {
  onClick: PropTypes.func,
  background: PropTypes.string,
  id: PropTypes.string,
  display: PropTypes.string,
};

const Button = styled.div.attrs((props) => ({
  id: props.id,
}))`
  display: ${({ display }) => (display || 'inline-block')};

  width: 1.5em;
  height: 1.5em;

  border: 1px solid grey;
  margin: 0.1em;

  background: ${({ background }) => background} no-repeat top left;
  background-position: center;
  background-size: 80%;

  border-radius: 4px;
`;
