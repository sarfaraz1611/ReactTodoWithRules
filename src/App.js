import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import TaskForm from "./componets/TaskForm";
import TaskList from "./componets/TaskList";
import TaskListComplete from "./componets/TaskComplete";

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>To-Do List</h1>
        <TaskForm />
        <div style={{display:"flex"}}>
          <div style={{width:"50%"}}>
            <TaskList />
          </div>
          <div style={{width:"50%"}}>
            <TaskListComplete />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
