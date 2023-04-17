/* eslint-disable no-console */
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

import {tasksParser } from "./parsers";

export const createModel = () =>
  new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    modelName: "gpt-3.5-turbo",
    maxTokens: 300,
  });

const startGoalPrompt = new PromptTemplate({
  template:
    "Your goal is to provide a list of 2-3 questions regarding `{topic}` in `{subject}`.\n{format_instructions}",
  inputVariables: ["subject", "topic"],
  partialVariables: {
    format_instructions: tasksParser.getFormatInstructions(),
  },
});
export const startGoalAgent = async (model: OpenAI, subject: string, topic: string) => {
  return await new LLMChain({
    llm: model,
    prompt: startGoalPrompt,
  }).call({
    subject,
    topic,
  });
};

const startAnswerPrompt = new PromptTemplate({
  template:
    "Give me answer to the following question: `{question}`.",
  inputVariables: ["question"]
});
export const startAnswerAgent = async (model: OpenAI, question: string) => {
  return await new LLMChain({
    llm: model,
    prompt: startAnswerPrompt,
  }).call({
    question
  });
};

// const executeTaskPrompt = new PromptTemplate({
//   template:
//     "You are an autonomous task execution AI called AgentGPT. You have the following objective `{goal}`. You have the following tasks `{task}`. Execute the task and return the response as a string.",
//   inputVariables: ["goal", "task"],
// });
// export const executeTaskAgent = async (
//   model: OpenAI,
//   goal: string,
//   task: string
// ) => {
//   return await new LLMChain({ llm: model, prompt: executeTaskPrompt }).call({
//     goal,
//     task,
//   });
// };

// const createTaskPrompt = new PromptTemplate({
//   template:
//     "You are an AI task creation agent. You have the following objective `{goal}`. You have the following incomplete tasks `{tasks}` and have just executed the following task `{lastTask}` and received the following result `{result}`. Based on this, create a new task to be completed by your AI system ONLY IF NEEDED such that your goal is more closely reached or completely reached.\n{format_instructions}",
//   inputVariables: ["goal", "tasks", "lastTask", "result"],
//   partialVariables: {
//     format_instructions: tasksParser.getFormatInstructions(),
//   },
// });
// export const executeCreateTaskAgent = async (
//   model: OpenAI,
//   goal: string,
//   tasks: string[],
//   lastTask: string,
//   result: string
// ) => {
//   return await new LLMChain({ llm: model, prompt: createTaskPrompt }).call({
//     goal,
//     tasks,
//     lastTask,
//     result,
//   });
// };

export const extractArray = (inputStr: string): string[] => {
  // Match an outer array of strings (including nested arrays)
  const regex = /(\[(?:\s*"(?:[^"\\]|\\.)*"\s*,?)+\s*\])/;
  const match = inputStr.match(regex);

  if (match && match[0]) {
    try {
      // Parse the matched string to get the array
      return JSON.parse(match[0]) as string[];
    } catch (error) {
      console.error("Error parsing the matched array:", error);
    }
  }

  console.warn("Error, could not extract array from inputString:", inputStr);
  return [];
};