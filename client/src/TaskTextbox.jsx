import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TaskTextbox(props) {
  const {
    id,
    data,
    checked,
    writeNodeText,
    writeNodeHeight,
    txtHeight,
  } = props;

  function handleChange(e) {
    const height = e.target.scrollHeight;
    e.target.style.height = 'auto';
    e.target.style.height = `${height}px`;
    writeNodeHeight(id, height);
    writeNodeText(id, e.target.value);
  }

  return (
    <Textbox
      checked={checked}
      value={data}
      txtHeight={txtHeight}
      onChange={(e) => handleChange(e)}
    />
  );
}

TaskTextbox.defaultProps = {
  id: null,
  data: '',
  checked: false,
  writeNodeText: null,
  writeNodeHeight: null,
  txtHeight: 0,
};

TaskTextbox.propTypes = {
  id: PropTypes.number,
  data: PropTypes.string,
  checked: PropTypes.bool,
  writeNodeText: PropTypes.func,
  writeNodeHeight: PropTypes.func,
  txtHeight: PropTypes.number,
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
  height: ${(props) => props.txtHeight}px;
  min-height: 2em;
  
  box-sizing: border-box;
  flex: 1 1 5em;
  
  border: 2px solid ${(props) => props.theme.accent};
  margin: 0.1em;
  
  background-color: ${(props) => props.theme.bg};
  border-radius: 6px;
  
  color: ${(props) => props.theme.text};
  font-family: "Roboto Mono", monospace;
  font-size: 100%;
  
  overflow-y: hidden;
  resize: both;
  
  text-decoration: ${(props) => (props.checked ? 'line-through' : 'none')};
  vertical-align: top;
`;
