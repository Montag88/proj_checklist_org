import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TaskButton from './TaskButton';
import ThemeSwitch from './ThemeSwitch';

export default function MainMenu({ methods, data }) {
  const {
    addNode,
    toggleAllNodes,
    toggleTheme,
  } = methods;

  const {
    id,
    theme,
    path,
  } = data;

  return (
    <MenuContainer>
      <TaskButton onClick={() => addNode(id, path)} bg="url(images/plus.svg)" />
      <TaskButton onClick={() => toggleAllNodes('expand')} bg="url(images/dbl-chev-down.svg)" />
      <TaskButton onClick={() => toggleAllNodes('collapse')} bg="url(images/dbl-chev-up.svg)" />
      <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
    </MenuContainer>
  );
}

MainMenu.defaultProps = {
  methods: {},
  data: {},
};

MainMenu.propTypes = {
  methods: {
    addNode: PropTypes.func,
    toggleAllNodes: PropTypes.func,
    toggleTheme: PropTypes.func,
  },
  data: {
    id: PropTypes.number,
    theme: PropTypes.string,
    path: PropTypes.string,
  },
};

const MenuContainer = styled.div`
  position: fixed;
  top: .3em;
  left: .3em;

  width: 95%;
  height: fit-content;

  box-sizing: border-box;
  padding: .1em;
  border: 2px solid ${(props) => props.theme.accent};
  
  background-color: ${(props) => props.theme.bg};
  border-radius: 6px;
`;
