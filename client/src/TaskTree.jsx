import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';

import RenderTreeNode from './RenderTreeNode';
import MainMenu from './MainMenu';

import TreeNode from './utils/tree-node-class';
import {
  generateNodeID,
  findNodeBFS,
  traverseAllNodes,
} from './utils/tree-root-methods';

export default class TaskTree extends Component {
  constructor(props) {
    super(props);
    // No current scheme for nodeIDs, just unique ID
    this.nodeIDs = new Set();
    // Used to check last saved state and periodic put to db
    this.saveInfo = {
      timer: null,
      lastSave: '',
    };
    this.state = {
      children: [],
      theme: 'light',
      // depth: 0,
      path: '~/',
      id: -1,
    };
    this.addNode = this.addNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.checkNode = this.checkNode.bind(this);
    this.expandNode = this.expandNode.bind(this);
    this.writeNodeText = this.writeNodeText.bind(this);
    this.writeNodeHeight = this.writeNodeHeight.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.toggleAllNodes = this.toggleAllNodes.bind(this);
  }

  // get initial data on load, store get as last save.
  componentDidMount() {
    axios.get('/api/treedata')
      .then((res) => {
        this.saveInfo.lastSave = res.data;
        this.setState(() => {
          const children = JSON.parse(res.data) || [];
          return { children };
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    this.saveDataMonitor();
  }

  // 5s store timer, if existing timer is already in progress, will not start another.
  saveDataMonitor() {
    if (!this.saveInfo.timer) {
      const { children } = this.state;
      this.saveInfo.timer = setInterval(() => {
        const currChildren = JSON.stringify(children);
        if (this.saveInfo.lastSave !== currChildren) {
          axios.put('/api/treedata', { treeData: currChildren })
            .catch((err) => console.log(err));
          this.saveInfo.lastSave = currChildren;
        } else {
          clearInterval(this.saveInfo.timer);
          this.saveInfo.timer = null;
        }
      }, 5000);
    }
  }

  // ***** PROPS METHODS ************
  addNode(nodeID, nodePath) {
    this.setState((prevState) => {
      const parentNode = findNodeBFS(prevState, nodeID);
      const nodeData = {
        parentID: nodeID,
        path: `${nodePath}${parentNode.children.length}/`,
        id: generateNodeID(this.nodeIDs),
      };
      parentNode.children.unshift(new TreeNode(nodeData));
      parentNode.expanded = true;
      return { parentNode };
    });
  }

  deleteNode(targetID, parentID) {
    // update paths of children
    // confirm before delete if children have data
    this.setState((prevState) => {
      const parentNode = findNodeBFS(prevState, parentID);
      for (let i = 0; i < parentNode.children.length; i += 1) {
        if (targetID === parentNode.children[i].id) {
          parentNode.children.splice(i, 1);
          this.nodeIDs.delete(targetID);
        }
      }
      return { parentNode };
    });
  }

  checkNode(targetID) {
    this.setState((prevState) => {
      const targetNode = findNodeBFS(prevState, targetID);
      targetNode.checked = !targetNode.checked;
      return { targetNode };
    });
  }

  expandNode(targetID) {
    this.setState((prevState) => {
      const targetNode = findNodeBFS(prevState, targetID);
      targetNode.expanded = !targetNode.expanded;
      return { targetNode };
    });
  }

  writeNodeText(nodeID, text) {
    this.setState((prevState) => {
      const targetNode = findNodeBFS(prevState, nodeID);
      targetNode.data = text;
      return { targetNode };
    });
  }

  writeNodeHeight(nodeID, height) {
    this.setState((prevState) => {
      const targetNode = findNodeBFS(prevState, nodeID);
      targetNode.txtHeight = height;
      return { targetNode };
    });
  }

  toggleAllNodes(type) {
    this.setState((prevProps) => {
      let property;
      let value;
      switch (type) {
        case 'expand':
          property = 'expanded';
          value = true;
          break;
        case 'collapse':
          property = 'expanded';
          value = false;
          break;
        default:
          console.log('Error. Type: ', type, ' not recognized');
      }
      traverseAllNodes(prevProps, property, value);
      return prevProps;
    });
  }

  toggleTheme(color) {
    this.setState(() => ({ theme: color }));
  }

  render() {
    const {
      children,
      path,
      id,
      theme,
    } = this.state;

    const methods = {
      addNode: this.addNode,
      deleteNode: this.deleteNode,
      checkNode: this.checkNode,
      expandNode: this.expandNode,
      writeNodeText: this.writeNodeText,
      writeNodeHeight: this.writeNodeHeight,
      toggleAllNodes: this.toggleAllNodes,
      toggleTheme: this.toggleTheme,
    };

    let currentTheme = {};
    switch (theme) {
      case 'light':
        currentTheme = {
          bg: 'white',
          accent: 'royalblue',
          text: 'black',
          hover: 'lightgrey',
          scrollbar: 'rgba(0,0,0,.3)',
          svg: 'black',
        };
        break;
      case 'dark':
        currentTheme = {
          bg: 'black',
          accent: 'forestgreen',
          text: 'white',
          hover: 'darkgrey',
          scrollbar: 'rgba(200,200,200,.3)',
          svg: 'gold',
        };
        break;
      default:
        console.log('theme not recognized');
    }

    return (
      <ThemeProvider theme={currentTheme}>
        <Window>
          <Main>
            <MainMenu methods={methods} data={{ id, theme, path }} />
            <RenderTreeNode nodes={children} methods={methods} />
          </Main>
        </Window>
      </ThemeProvider>
    );
  }
}

const Window = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.bg};
`;

const Main = styled.div`
  display: inline-block;
  overflow: scroll;
  
  width: 95%;
  height: 90%;

  box-sizing: border-box;

  border: 2px solid ${(props) => props.theme.accent};
  margin-top: 3.2em;
  margin-right: .3em;
  margin-left: .3em;

  background-color: ${(props) => props.theme.bg};
  border-radius: 6px;
  scrollbar-gutter: stable;

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
    
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.scrollbar};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-corner {
    background-color: ${(props) => props.theme.scrollbar};
  }
`;
