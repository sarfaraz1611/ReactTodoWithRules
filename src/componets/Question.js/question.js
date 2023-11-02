'use strict';

const { Engine } = require('json-rules-engine');
const colors = require('colors');

async function start() {
  /**
   * Setup a new engine
   */
  const engine = new Engine();

  // Define your questions and conditions here
  const questions = [
    { id: 1, text: 'Question 1', condition: null },
    { id: 2, text: 'Question 2', condition: 'answer1' },
    { id: 3, text: 'Question 3', condition: 'answer1' },
    { id: 4, text: 'Question 4', condition: null }
  ];
  // Define a rule to skip questions based on conditions
  questions.forEach(question => {
    if (question.condition) {
      engine.addRule({
        conditions: {
          any: [
            {
              fact: question.condition,
              operator: 'equal',
              value: 'true'
            }
          ]
        },
        event: {
          type: 'skipQuestion',
          params: {
            questionId: question.id,
            message: `Skipping question ${question.id}!`
          }
        }
      });
    }
  });

  /**
   * Define the facts (user answers)
   */
  const answers = {
    answer1: 'false'
  };

  const { events } = await engine.run(answers);

  events.forEach(event => {
    console.log(event.params.message.red);
  });
}

start();
