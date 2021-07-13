import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TaskTextbox() {
  return <Textbox />;
}

const Textbox = styled.input.attrs(() => ({
  type: 'text',
}))`
  display: inline-block;
  vertical-align: top;

  height: 25px;
  width: 200px;

  border-radius: 2px;
  border: 3px solid purple;
`;
