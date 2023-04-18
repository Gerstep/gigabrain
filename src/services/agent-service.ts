/* eslint-disable no-console */
import {
  createModel,
  extractArray,
  startAnswerAgent,
  startExplainAgent,
  startGoalAgent,
  startQuizAgent
} from "../utils/chain";

export async function startAgent(subject: string, topic: string) {
  const completion = await startGoalAgent(createModel(), subject, topic);
  console.log(typeof completion.text);
  console.log("Completion:" + (completion.text as string));
  return extractArray(completion.text as string);
}

export async function askAgent(question: string) {
  const completion = await startAnswerAgent(createModel(), question);
  console.log(typeof completion.text);
  console.log("Answer text:" + (completion.text as string));
  return completion.text as string;
}

export async function explainAgent(concept: string, subject: string, topic: string) {
  const completion = await startExplainAgent(createModel(), concept, subject, topic);
  console.log(typeof completion.text);
  console.log("Explain text:" + (completion.text as string));
  return completion.text as string;
}

export async function quizAgent(testSubject: string) {
  const completion = await startQuizAgent(createModel(), testSubject);
  const prefixLength = 7;
  const suffixLength = 3;
  const question = JSON.parse(completion.text.slice(prefixLength, -suffixLength));
  console.log(typeof question);
  console.log("Quiz question:" + question);
  return question as object;
}

// export async function createAgent(
//   modelSettings: ModelSettings,
//   goal: string,
//   tasks: string[],
//   lastTask: string,
//   result: string,
//   completedTasks: string[] | undefined
// ) {
//   const completion = await executeCreateTaskAgent(
//     createModel(modelSettings),
//     goal,
//     tasks,
//     lastTask,
//     result
//   );

//   return extractArray(completion.text as string)
//     .filter(realTasksFilter)
//     .filter((task) => !(completedTasks || []).includes(task));
// }

// export async function executeAgent(
//   modelSettings: ModelSettings,
//   goal: string,
//   task: string
// ) {
//   const completion = await executeTaskAgent(
//     createModel(modelSettings),
//     goal,
//     task
//   );
//   return completion.text as string;
// }
