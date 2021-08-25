import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import TaskButton from './TaskButton';
import RenderTreeNode from './RenderTreeNode';

import TreeNode from './utils/tree-node-class';

export default class TaskTree extends Component {
  // REMOVE AND SIMPLIFY ANY DUPLICATE CODE
  // CLEAN CODE OF ERRORS CONSTANTLY

  // NEXT

  // SERVER/DATABASE
  //  how to not flash empty treenodes on site load?
  //  set up userid as _id in db in future for performance

  // cleanup tree methods
  // reduce the number of times BFS is called to find a node
  // task search

  // TESTING
  //  testing for components

  // TASK MOVEMENT
  //  vector
  //  path scheme, update on move
  //  rearrangeable tasks by drag
  //  change task depth (up/down), needs to carry children
  //  highlight new location when dragging

  // TEXTAREA
  //  size of text area is saved only on text input, need to save on user drag
  //  text area auto resizing when deleting text with extra rows
  //  resize text area  to fit text on window change
  //  adjust height in increments of textsize
  //  how does em relate to text size?

  // POLISH
  //  change color/highlight of tasks on hover (limit area of highlight)
  //  top menu sticky during scroll
  //  border around task and subtasks
  //  light/dark color schemes
  //  trash wait to delete (animate fill)
  //  hover text on buttons, aria?
  //  light text editing (text color, bold, italicize, underline, crossout)
  //  ctrl z to undo task deletes
  //  optimize nodeID scheme

  // OPTIMIZE
  //  change tree to first child/next sibling binary tree
  //  does the entire tree rerender when root children is modified?
  //  convert svg to data URL
  //  gzip to compress svgs
  // HOST/docker/aws
  //  google login?

  constructor(props) {
    super(props);
    this.nodeIDs = new Set();
    this.saveInfo = {
      timer: null,
      lastSave: '',
    };
    this.state = {
      children: [],
      depth: 0,
      path: '~/',
      id: -1,
    };
    this.addNode = this.addNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.checkNode = this.checkNode.bind(this);
    this.expandNode = this.expandNode.bind(this);
    this.writeNodeText = this.writeNodeText.bind(this);
    this.writeNodeHeight = this.writeNodeHeight.bind(this);
  }

  componentDidMount() {
    axios.get('/api/treedata')
      .then((res) => {
        console.log('RESPONSE FROM SERVER: ', res);
        this.saveInfo.lastSave = res.data;
        this.setState(() => {
          const children = JSON.parse(res.data) || [];
          return { children };
        });
      })
      .catch((err) => console.log(err));
  }

  // need to set initial pack on load, comp did mount
  componentDidUpdate() {
    this.saveDataMonitor();
  }

  saveDataMonitor() {
    if (!this.saveInfo.timer) {
      const { children } = this.state;
      this.saveInfo.timer = setInterval(() => {
        const currChildren = JSON.stringify(children);
        if (this.saveInfo.lastSave !== currChildren) {
          this.saveInfo.lastSave = currChildren;
          axios.put('/api/treedata', { treeData: this.saveInfo.lastSave })
            // .then((res) => console.log(res))
            .catch((err) => console.log(err));
        } else {
          clearInterval(this.saveInfo.timer);
          this.saveInfo.timer = null;
        }
      }, 5000);
    }
  }

  // ***** LOCAL METHODS ***********
  generateNodeID() {
    // nodeIDs is set of existing IDs. used for lookup of uniqueness of ids.
    // 0 - 99999
    const max = 100000;
    const newNodeID = Math.floor(Math.random() * max);
    if (this.nodeIDs.has(newNodeID)) {
      return this.generateNodeID();
    }
    this.nodeIDs.add(newNodeID);
    return newNodeID;
  }

  // createPath()

  // findNodePath()

  findNodeBFS(targetID) {
    let currNode;
    const queue = [];
    queue.push(this.state);
    while (queue.length > 0) {
      currNode = queue.shift();
      if (currNode.id === targetID) {
        return currNode;
      }
      if (currNode.children.length > 0) {
        queue.push(...currNode.children);
      }
    }
    return false;
  }

  // findNodeDFS(targetID) {
  // console.log('in findNode');
  // let found = false;
  // let currNode = this.state;
  // while (currNode && !found) {
  //   if (currNode.id === targetID) {
  //     console.log('target acquired');
  //     found = true;
  //   }
  //   for (let i = 0; i < currNode.children.length; i += 1) {
  //     console.log('looping i: ', i);
  //     return this.findNodeDFS(targetID, currNode.children[i]);
  //   }
  // }
  // return currNode;
  // finds correct node and does not stop evaluating rest. similar to for loop w/o return
  // return currNode.children.forEach((next) => this.findNodeDFS(targetID, next));
  // }

  traverseAllNodes(property, value, node) {
    const currNode = node || this.state;
    currNode[property] = value;
    if (currNode.children.length > 0) {
      currNode.children.forEach((nextNode) => this.traverseAllNodes(property, value, nextNode));
    }
  }

  toggleAllNodes(type) {
    this.setState(({ children }) => {
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
      this.traverseAllNodes(property, value);
      return { children };
    });
  }

  // ***** PROPS METHODS ************
  addNode(nodeID, nodePath) {
    this.setState(({ children }) => {
      console.log('in addNode');
      const parentNode = this.findNodeBFS(nodeID);
      const nodeData = {
        parentID: nodeID,
        path: `${nodePath}${parentNode.children.length}/`,
        id: this.generateNodeID(),
      };
      parentNode.children.unshift(new TreeNode(nodeData));
      parentNode.expanded = true;
      return { children };
    });
  }

  deleteNode(targetID, parentID) {
    // update paths of children
    // confirm before delete if children have data
    this.setState(({ children }) => {
      const parentNode = this.findNodeBFS(parentID);
      for (let i = 0; i < parentNode.children.length; i += 1) {
        if (targetID === parentNode.children[i].id) {
          parentNode.children.splice(i, 1);
          this.nodeIDs.delete(targetID);
        }
      }
      return { children };
    });
  }

  checkNode(targetID) {
    this.setState(({ children }) => {
      const targetNode = this.findNodeBFS(targetID);
      targetNode.checked = !targetNode.checked;
      return { children };
    });
  }

  expandNode(targetID) {
    this.setState(({ children }) => {
      const targetNode = this.findNodeBFS(targetID);
      targetNode.expanded = !targetNode.expanded;
      return { children };
    });
  }

  writeNodeText(nodeID, text) {
    this.setState(({ children }) => {
      const node = this.findNodeBFS(nodeID);
      node.data = text;
      return { children };
    });
  }

  writeNodeHeight(nodeID, height) {
    this.setState(({ children }) => {
      const node = this.findNodeBFS(nodeID);
      node.txtHeight = height;
      return { children };
    });
  }

  testFunc() {
    this.saveDataMonitor();
  }

  render() {
    const { children, path, id } = this.state;
    const methods = {
      addNode: this.addNode,
      deleteNode: this.deleteNode,
      checkNode: this.checkNode,
      expandNode: this.expandNode,
      writeNodeText: this.writeNodeText,
      writeNodeHeight: this.writeNodeHeight,
    };

    return (
      <Main>
        <MainMenu>
          <TaskButton onClick={() => this.addNode(id, path)} bg="url(images/plus.svg)" />
          <TaskButton onClick={() => this.toggleAllNodes('expand')} bg="url(images/dbl-chev-down.svg)" />
          <TaskButton onClick={() => this.toggleAllNodes('collapse')} bg="url(images/dbl-chev-up.svg)" />
          <TaskButton onClick={() => this.testFunc()} />
        </MainMenu>
        <RenderTreeNode nodes={children} methods={methods} />
      </Main>
    );
  }
}

const MainMenu = styled.div`
  height: 2em;
  padding-bottom: .3em;
`;

const Main = styled.div`
  overflow: scroll;
  
  width: 90%;
  min-width: 25%;
  max-width: 100%;
  
  height: 90%;
  min-height: 25%;
  max-height: 100%;
  
  border: 1px solid black;
  border-radius: 4px;
  
  resize: auto;
  scrollbar-gutter: stable;

  ::-webkit-scrollbar {
    width: 7px;
  }
    
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,.3);
    border-radius: 4px;
  }
`;
