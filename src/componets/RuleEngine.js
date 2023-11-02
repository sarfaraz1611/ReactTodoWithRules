import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import hashIt from 'hash-it';
const { Engine } = require('json-rules-engine');

const TaskComponent = () => {
  const priorityRules = {
    conditions: {
      all: [
        {
          fact: 'dueTime',
          operator: 'equal',
          value: ('0' + new Date().getHours()).slice(-2) + ':' + ('0' + new Date().getMinutes()).slice(-2),
        },
      ],
    },
    event: {
      type: 'notification',
      params: {
        message: 'Task due now! Please complete it.',
      },
    },
  };

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:8000/task');
    return response.data;
  };

  const { data: tasks, isLoading, isError } = useQuery('tasks', fetchTasks, {
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
  });
  
  useEffect(() => {
      if (!isLoading && !isError && tasks) {
        const pendingTask = tasks.filter(task => task.completed === false&& task.dueTime>('0' + new Date().getHours()).slice(-2) + ':' + ('0' + new Date().getMinutes()).slice(-2));
      const engine = new Engine();
 

      console.log(pendingTask);
      
    //   pendingTask.forEach(task => {
        // pendingTask[0]?.dueTime, 
        const fact = {
          dueTime: ('0' + new Date().getHours()).slice(-2) + ':' + ('0' + new Date().getMinutes()).slice(-2)
        };
        const fact2 =hashIt(fact)
        engine.addRule(priorityRules);
        engine.run(fact2).then(results => {
          console.log(results.events[0]?.params.message);
          // Perform any further actions based on the rule evaluation results here
        }).catch(error => {
          console.error(error);
        });
    //   }
    //   );
    }
  }, [tasks, isLoading, isError]);

  return""
};

export default TaskComponent;
