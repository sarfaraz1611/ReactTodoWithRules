import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Task from './Task';

const fetchTasks = async () => {
  const response = await axios.get('http://localhost:8000/task');
  return response.data;
};

const TaskListComplete = () => {
  const { data: tasks, isLoading, isError } = useQuery('tasks', fetchTasks );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading tasks. Please try again later.</p>;
  }

  const completedTasks = tasks.filter(task => task.completed ==true);

  return (
    <div>
      <h2>Completed Tasks</h2>
      {completedTasks.length === 0 ? <p>No completed tasks available.</p> :
        completedTasks.map(task => (
          <Task key={task.id} task={task} />
        ))
      }
    </div>
  );
};

export default TaskListComplete;
