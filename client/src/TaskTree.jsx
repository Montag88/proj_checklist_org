import React, { Component } from 'react';
import styled from 'styled-components';

import TaskButton from './TaskButton';
import RenderTreeNode from './RenderTreeNode';

import TreeNode from './utils/tree-node-class';

export default class TaskTree extends Component {
  // REMOVE AND SIMPLIFY ANY DUPLICATE CODE
  // CLEAN CODE OF ERRORS CONSTANTLY

  // NEXT
  // double click to expand/collapse
  // expand and collapse all (start at root and find all children recursively)

  // does the entire tree rerender when root children is modified?
  // path scheme, update on move

  // textbox resize to fill to window
  // textbox flex fill to content (vertically)

  // rearrangeable tasks by drag
  // change task depth (up/down), needs to carry children

  // testing for components
  // data storage (tree, text, task order)
  // POLISH
  //  trash wait to delete
  //  task animations/polish/new double chevrons
  //  light text editing
  //  ctrl z to undo deletes
  // OPTIMIZE
  //  convert svg to data URL
  //  gzip to compress svgs
  // HOST/docker/aws

  constructor() {
    super();
    this.nodeIDs = new Set();
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
  }

  // ***** LOCAL METHODS, NOT PART OF CONTEXT ***********
  generateNodeID() {
    // what is the best way to org these? ordered w/ timestamp?
    // nodeIDs is set of existing IDs. nodeIDs just used for lookup of uniqueness of ids.
    // 0 - 9999
    const max = 100000;
    const newNodeID = Math.floor(Math.random() * max);
    if (this.nodeIDs.has(newNodeID)) {
      return this.generateNodeID();
    }
    this.nodeIDs.add(newNodeID);
    return newNodeID;
  }

  // findNodePath() {}

  // createPath()
  // deleteNode(parent, parentDepth, index) {
  //   console.log('in deleteNode');
  //   this.setState(() => {});
  // }

  findNodeBFS(targetID) {
    const queue = [];
    // push root node to queue
    queue.push(this.state);
    while (queue.length > 0) {
      const currNode = queue.shift();
      if (currNode.id === targetID) {
        return currNode;
      }
      if (currNode.children.length > 0) {
        queue.push(...currNode.children);
      }
    }
    return false;
  }

  findNodeDFS(targetID, node) {
    console.log('in findNode');
    const currNode = node || this.state;
    if (currNode.id === targetID) {
      console.log('target acquired');
      return currNode;
    }
    // if currNode has no children

    for (let i = 0; i < currNode.children.length; i += 1) {
      console.log('looping i: ', i);
      return this.findNodeDFS(targetID, currNode.children[i]);
    }
    return false;
    // finds correct node and does not stop evaluating rest. similar to for loop w/o return
    // return currNode.children.forEach((next) => this.findNodeDFS(targetID, next));
  }

  // ***** PROPS METHODS ************
  addNode(parentID, parentPath) {
    console.log('in addNode, id: ', parentID, 'path: ', parentPath);
    // Should accept the parent node/path/id
    this.setState(({ children }) => {
      const parentNode = this.findNodeBFS(parentID);
      const nodeData = {
        parentID,
        path: `${parentPath}${parentNode.children.length}/`,
        id: this.generateNodeID(),
      };
      parentNode.children.push(new TreeNode(nodeData));
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

  // create context for children and methods add/delete/move node, check/expand handlers
  render() {
    const { children, path, id } = this.state;
    const methods = {
      addNode: this.addNode,
      deleteNode: this.deleteNode,
      checkNode: this.checkNode,
      expandNode: this.expandNode,
    };
    return (
      <Main>
        <UIContainer>
          <TaskButton onClick={() => this.addNode(id, path)} background="url(images/plus.svg)" />
        </UIContainer>
        <RenderTreeNode nodes={children} methods={methods} />
      </Main>
    );
  }
}

const UIContainer = styled.div`
`;

const Main = styled.div`
  overflow: auto;

  width: 90%;
  min-width: 25%;
  max-width: 100%;

  height: 90%;
  min-height: 25%;
  max-height: 100%;

  border: 1px solid black;
  border-radius: 4px;

  resize: auto;
`;
