export function deepCopy(obj) {
  const copy = JSON.parse(JSON.stringify(obj));
  return copy;
}

// generate unique taskID
export function generateTaskID(taskIDs) {
  console.log('in generate taskID');
  const max = 100000;
  const taskID = Math.floor(Math.random() * max);
  // need a better scheme, will generate random num for now
  // if tasks already contains taskID, generate another unique ID
  return taskIDs.includes(taskID) ? generateTaskID() : taskID;
}

// Add a new task at beginning of order
export function addTask(tasksState, setTasks) {
  console.log('In addTask');
  setTasks(() => {
    tasksState.order.unshift(generateTaskID(tasksState.order));
    return { ...tasksState };
  });
}

// Remove specific taskID key from tasks, passed down to TaskElement
// modify ReactDOM/state to remove html elements, DO NOT find html element by id and remove
export function deleteTask(tasksState, setTasks, taskIndex) {
  console.log('in deleteTask');
  setTasks(() => {
    tasksState.order.splice(taskIndex, 1);
    return { ...tasksState };
  });
}
