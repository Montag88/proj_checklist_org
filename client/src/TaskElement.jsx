import React from 'react';

export default function TaskElement(props) {
  
  return (
    <tr>
      <td>
        <input type='checkbox' />
      </td>
      <td>
        <input type='text' />
      </td>
      <td>
        <button type='button'>+</button>
      </td>
      <td>
        <button type='button'>^</button>
      </td>
      <td>
        <input type='button' onClick={() => props.deleteTask(props.index)}/>
      </td>
    </tr>
  );
}