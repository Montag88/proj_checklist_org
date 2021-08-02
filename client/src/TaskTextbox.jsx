import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TaskTextbox({ checked }) {
  const bcolor = checked ? 'grey' : 'white';
  return <Textbox bcolor={bcolor} />;
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
  rows: 2,
}))`
  display: inline-block;
  width: 20em;
  min-width: 10em;
  min-height: 1.5em;
  
  padding: 0;
  border: 1px solid grey;
  margin: 0.1em;
  
  background-color: ${(props) => props.bcolor};
  border-radius: 4px;
  
  font-family: "Roboto Mono", monospace;
  resize: both;
  vertical-align: top;
`;
