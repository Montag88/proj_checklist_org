// nodeIDs is set of existing IDs. used for lookup of uniqueness of ids.
// 0 - 99999
function generateNodeID(nodeIDs) {
  const max = 100000;
  const newNodeID = Math.floor(Math.random() * max);
  if (nodeIDs.has(newNodeID)) {
    return generateNodeID();
  }
  nodeIDs.add(newNodeID);
  return newNodeID;
}

function findNodeBFS(root, targetID) {
  let currNode;
  const queue = [];
  queue.push(root);
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

function traverseAllNodes(root, property, value, node) {
  const currNode = node || root;
  currNode[property] = value;
  if (currNode.children.length > 0) {
    currNode.children.forEach((nextNode) => traverseAllNodes(root, property, value, nextNode));
  }
}

// createPath()

// findNodePath()

export {
  generateNodeID,
  findNodeBFS,
  traverseAllNodes,
};
