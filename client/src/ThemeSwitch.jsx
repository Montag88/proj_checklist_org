import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function ThemeSwitch({ toggleTheme, theme }) {
  function handleChange(e, color) {
    e.preventDefault();
    toggleTheme(color);
  }

  return (
    <SwitchContainer>
      <SwitchLabel htmlFor="themeSwitch">
        {theme}
        <SwitchToggle id="themeSwitch">
          <LightSelector bg="white" br="30% 0 0 30%" color={theme} onClick={(e) => handleChange(e, 'light')} />
          <DarkSelector bg="black" br="0 30% 30% 0" color={theme} onClick={(e) => handleChange(e, 'dark')} />
        </SwitchToggle>
      </SwitchLabel>
    </SwitchContainer>
  );
}

ThemeSwitch.defaultProps = {
  toggleTheme: null,
  theme: null,
};

ThemeSwitch.propTypes = {
  toggleTheme: PropTypes.func,
  theme: PropTypes.string,
};

const SwitchContainer = styled.div`
  position: relative;
  display: inline-block;

  float: right;
  
  box-sizing: border-box;

`;

const SwitchToggle = styled.div`
  position: relative;
  display: inline-block;

  width: 4em;
  height: 1.8em;

  box-sizing: border-box;
  padding: 0;
  margin: .1em;

  cursor: pointer;
`;

const SwitchLabel = styled.label`
  position: relative;
  top: 50%;
  display: inline-block;
  color: ${(props) => props.theme.text};
  line-height: 0;
  vertical-align: middle;
`;

const SwitchSelector = styled.div`
  position: relative;
  display: inline-block;
  width: 50%;
  height: 100%;

  box-sizing: border-box;
`;

const LightSelector = styled(SwitchSelector)`
  border: 2px solid ${(props) => ((props.color === 'light') ? props.theme.accent : 'black')};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.br};
`;

const DarkSelector = styled(SwitchSelector)`
  border: 2px solid ${(props) => ((props.color === 'dark') ? props.theme.accent : 'black')};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.br};
`;
