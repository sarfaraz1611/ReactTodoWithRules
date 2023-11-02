import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";



const importanceOptions = ["Low", "Medium", "High"]; 
const categoryOptions = ["Personal", "Work", "Study", "Other"];  

const addTask = async newTask => {
  const response = await axios.post("http://localhost:8000/task", newTask);
  return response.data;
};

const TaskForm = () => {
  const [task, setTask] = useState({
    description: "",
    dueTime: '',
    importance: "", // Selected importance option
    category: "" ,
    completed: false
  });
  const queryClient = useQueryClient();

  const mutation = useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    }
  });



 
  const handleSubmit = (e) => {
    e.preventDefault();
  
  
     mutation.mutate(task);
    setTask({
      description: "",
      dueTime: "",
      importance: "",
      category: "",
      completed: false
    });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task.description}
        onChange={e => setTask({ ...task, description: e.target.value })}
        placeholder="Task description"
      />
      {/* <input
        type="time"
        value={task.dueDate.toISOString().split("T")[0]}
        onChange={e => setTask({ ...task, dueDate: new Date(e.target.value) })}
        placeholder="Due date"
      /> */}
       <label>
        Due Time:
        <input
          type="time"
          value={task.dueTime}
          onChange={e => setTask({ ...task, dueTime: e.target.value })}
        />
      </label>
      <select
        value={task.importance}
        onChange={e => setTask({ ...task, importance: e.target.value })}
      >
        <option value="">Select Importance</option>
        {importanceOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        value={task.category}
        onChange={e => setTask({ ...task, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {categoryOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button type="submit" disabled={mutation.isLoading}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
