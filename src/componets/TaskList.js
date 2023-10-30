import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Task from "./Task";

const fetchTasks = async () => {
  const response = await axios.get("http://localhost:8000/task");
  return response.data;
};

const TaskList = () => {
  const { data: tasks, isLoading, isError } = useQuery("tasks", fetchTasks, {
    refetchInterval: 1000,
    refetchOnWindowFocus: true
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading tasks. Please try again later.</p>;
  }
  const pendingTask = tasks.filter(task => task.completed === false);

  return (
    <div>
      <h2>Task List</h2>
      {pendingTask.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        pendingTask.map(task => (
          <Task
            key={task.id}
            task={task}
            criteria={task.criteria} 
            category={task.category} 
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
