import { Engine } from "json-rules-engine";

const engine = new Engine();
const evaluateRules = (task, rules) => {
    // rules.forEach(rule => {
        console.log(rules);
        engine.addRule(rules); 
    // });
  
    engine.run(task).then(events => {
      console.log("Rule evaluation events: ", events); 
    //   events.map(event => {
    //     if (event.type === "notification") {
    //      return  console.log("Notification Event Triggered: ", event.params.message);
    //     }
    //   });
    // }).catch(error => {
    //   console.error("Error running rules: ", error);
    });
    
  };
  

// const evaluateRules = (task, rules) => {
//     rules.forEach(rule => {
//         engine.addRule(rule); 
//     });

//     engine.run(task).then(events => {
//         events.map(event => {
//             if (event.type === "notification") {
//                 console.log(event.params.message.red);
//             }
//         });
//     }).catch(error => {
//         console.error("Error running rules: ", error);
//     });
// };

const priorityRules = 
    {
      conditions: {
        all: [
          {
            fact: "dueTime",
            operator: "equal",
            value: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      },
      event: {
        type: "notification",
        params: {
          message: "Task due now! Please complete it."
        }
      }
    }
  
  

export { evaluateRules, priorityRules };
