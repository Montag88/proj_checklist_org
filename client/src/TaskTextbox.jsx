import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TaskTextbox({ checked }) {
  const bcolor = checked ? 'grey' : 'white';
  function handleInput(e) {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }
  return <Textbox bcolor={bcolor} onInput={(e) => handleInput(e)} />;
}

TaskTextbox.defaultProps = {
  checked: false,
};

TaskTextbox.propTypes = {
  checked: PropTypes.bool,
};

const Textbox = styled.textarea.attrs(() => ({
  type: 'text',
  placeholder: '...',
  rows: 1,
}))`
  display: inline-block;
  
  width: 10em;
  min-width: 10em;
  max-width: 20em;
  height: 1.5em;
  min-height: 1em;
  
  flex: 1 1 5em;
  
  padding: 0.2em;
  border: 1px solid grey;
  margin: 0.1em;
  
  background-color: ${(props) => props.bcolor};
  border-radius: 4px;
  
  font-family: "Roboto Mono", monospace;
  font-size: 1em;
  overflow-y: hidden;
  resize: both;
  vertical-align: top;
`;
