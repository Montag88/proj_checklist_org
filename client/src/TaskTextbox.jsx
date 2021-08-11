import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TaskTextbox(props) {
  const {
    id,
    data,
    checked,
    writeNodeText,
  } = props;

  const bgcolor = checked ? 'grey' : 'white';

  function handleChange(e) {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    writeNodeText(id, e.target.value);
  }

  return (
    <Textbox
      bgcolor={bgcolor}
      value={data}
      onChange={(e) => handleChange(e)}
    />
  );
}

TaskTextbox.defaultProps = {
  id: null,
  data: '',
  checked: false,
  writeNodeText: null,
};

TaskTextbox.propTypes = {
  id: PropTypes.number,
  data: PropTypes.string,
  checked: PropTypes.bool,
  writeNodeText: PropTypes.func,
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
  
  background-color: ${(props) => props.bgcolor};
  border-radius: 4px;
  
  font-family: "Roboto Mono", monospace;
  font-size: 1em;
  overflow-y: hidden;
  resize: both;
  vertical-align: top;
`;
