import React from 'react';
import {  useQueryClient } from 'react-query';
import axios from 'axios';
// import Toast from './Toast'; // Import the Toast component

const Task = ({ task, category }) => {
  const queryClient = useQueryClient();

  const toggleCompleted = async () => {
    await axios.patch(`http://localhost:8000/task/${task.id}`, {
      completed: !task.completed,
    });
    queryClient.invalidateQueries('tasks');

    // Show toast notification upon successful completion
    // <Toast message={`Task "${task.text}" has been completed!`} />;
  };

  return (
    <div>
       {/* style={{ textDecoration: task.completed ? 'line-through' : 'none' }} */}
      
       <div className="task-item bg-gray-100 p-4 rounded shadow mb-4">
      <h3 className="text-lg font-bold mb-2">{task.description}</h3>
      <p>Due Date: {task.dueTime}</p>
      <p>Importance: {task.importance}</p>
      <p>Category: {category}</p>
      <p>Priority: {task.priority}</p> {/* Display priority */}
      {/* Add more task details as needed */}
    </div>
    
      {!task.completed && <button onClick={toggleCompleted}>Mark Completed</button>}
    </div>
  
  );
};

export default Task;
