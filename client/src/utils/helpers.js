export function deepCopy(obj) {
  const copy = JSON.parse(JSON.stringify(obj));
  return copy;
}

// generate unique taskID
export function generateNodeID(nodeIDs) {
  // nodeIDs is set of existing IDs.
  console.log('in generate nodeID');
  const max = 100000;
  const nodeID = Math.floor(Math.random() * max);
  // need a better scheme, will generate random num for now
  // if tasks already contains taskID, generate another unique ID
  return nodeIDs.includes(nodeID) ? generateNodeID() : nodeID;
}

// Add a new task at beginning of order
export function addNode(node, setNode) {
  console.log('In addTask');
  setNode(() => {
    node.children.push(generateNodeID(node.children));
    return { ...node };
  });
}

// Remove specific taskID key from tasks, passed down to TaskElement
// modify ReactDOM/state to remove html elements, DO NOT find html element by id and remove
export function deleteNode(node, setNode, taskIndex) {
  console.log('in deleteTask');
  setNode(() => {
    node.children.splice(taskIndex, 1);
    return { ...node };
  });
}

export function changeHTMLDisplay(arrHTML, option) {
  const targets = arrHTML;
  for (let i = 0; i < targets.length; i += 1) {
    targets[i].style.display = option;
  }
}

export function moveNode(node, setNode, i, direction) {
  switch (direction) {
    case 'up':
      if (i !== 0) {
        setNode(() => {
          const taskOrder = node.children;
          const swap = taskOrder[i];
          taskOrder[i] = taskOrder[i - 1];
          taskOrder[i - 1] = swap;
          return { ...node };
        });
      }
      break;
    case 'down':
      if (i !== node.children.length - 1) {
        setNode(() => {
          const taskOrder = node.children;
          const swap = taskOrder[i];
          taskOrder[i] = taskOrder[i + 1];
          taskOrder[i + 1] = swap;
          return { ...node };
        });
      }
      break;
    default:
      console.log('error in moveNode');
  }
}

// export function changeNodeDepth() {

// }
