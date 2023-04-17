/* eslint-disable no-console */
import {
  createModel,
  extractArray,
  startAnswerAgent,
  startGoalAgent} from "../utils/chain";

export async function startAgent(subject: string, topic: string) {
  const completion = await startGoalAgent(createModel(), subject, topic);
  console.log(typeof completion.text);
  console.log("Completion:" + (completion.text as string));
  return extractArray(completion.text as string);
}

export async function askAgent(question: string) {
  const completion = await startAnswerAgent(createModel(), question);
  console.log(typeof completion.text);
  console.log("Completion:" + (completion.text as string));
  return completion.text as string;
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
