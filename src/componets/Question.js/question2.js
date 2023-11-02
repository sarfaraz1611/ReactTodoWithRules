const { Engine } = require('json-rules-engine');
const readline = require('readline-sync');

const engine = new Engine();

// Define rules
engine.addRule({
  conditions: {
    fact: 'skipQuestions',
    operator: 'equal',
    value: true
  },
  event: {
    type: 'skipQuestionsEvent',
    params: {
      message: 'Skipping questions based on user input.'
    }
  }
});

function askQuestions(questions) {
  const answers = [];

  questions.forEach((question, index) => {
    const answer = readline.keyInYNStrict(`Question ${index + 1}: ${question.text}`);
    answers.push(answer);
  });

  return answers;
}

function main() {
  console.log('Welcome to the interactive rule-based questionnaire!');

  // Define the questions
  const questions = [
    { text: 'Do you want to skip the next question?', skip: true },
    { text: 'Question 2', skip: false },
    { text: 'Question 3', skip: false },
    // Add more questions as needed
  ];

  const answers = askQuestions(questions);

  // Check if the skip rule is triggered
  const skipQuestionsEvent = engine.run({ skipQuestions: answers[0] }).events.find(event => event.type === 'skipQuestionsEvent');

  if (skipQuestionsEvent) {
    console.log(skipQuestionsEvent.params.message);
    if (answers[0]) {
      console.log('Skipping Questions 2 and 3.');
    }
    // Add more logic to skip additional questions if needed
  } else {
    console.log('Proceed with all questions.');
  }
}

main();
