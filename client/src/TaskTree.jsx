import React from 'react';
import styled from 'styled-components';

import TaskButton from './TaskButton';
import RenderTreeNode from './RenderTreeNode';

import { generateNodeID } from '../helpers';

export default class TaskTree extends React.Component {
  // REMOVE AND SIMPLIFY ANY DUPLICATE CODE
  // CLEAN CODE OF ERRORS CONSTANTLY

  // NEXT
  // change task depth (up/down), needs to carry children
  // data structure change (Google LinkedMap, Double LL, Tree)
  // scheme taskIDs to indicate parent/depth, change on move?

  // SubtaskContainer border visible when task has children or expanded
  // refactor expand useEffect to not fire upon creation
  // textbox resize to fill to window
  // textbox flex fill to content (vertically)

  // expand and collapse all (start at root and find all children recursively)

  // double click to expand/collapse
  // trash wait to delete
  // rearrangeable tasks by drag

  // testing for components
  // data storage (task state, text, task order)
  // task animations/polish/new double chevrons
  // light text editing
  // convert svg to data URL
  // gzip to compress svgs
  constructor() {
    super();
    this.state = {
      root: {
        ID: 0,
        children: [],
      },
    };
    this.addNode = this.addNode.bind(this);
  }

  addNode() {
    console.log('In addNode');
    this.setState(({ root }) => {
      console.log('root in addNode: ', root);
      root.children.push(generateNodeID(root.children));
      return { ...root };
    });
  }

  render() {
    const { root } = this.state;
    return (
      <Main>
        <UIContainer>
          <TaskButton onClick={() => this.addNode(root)} background="url(images/plus.svg)" />
        </UIContainer>
        <RenderTreeNode node={root} />
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
