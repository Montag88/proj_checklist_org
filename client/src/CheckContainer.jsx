import React, {useState, useEffect, useReducer} from 'react';
import CheckElement from './CheckElement';

export default function CheckContainer() {

  // checklist state - any task is added/deleted (updates when any task is expanded/collapsed)
  const [checklist, setChecklist] = useState([]);
  // Add a new task object
  
  // render all task objects

  return (
    <div>
      <div>
        <button>+</button>
        <button>Expand All</button>
        <button>Collapse All</button>
      </div>
      <table>
        <tbody>
          <CheckElement />
        </tbody>
      </table>
    </div>
  );
}