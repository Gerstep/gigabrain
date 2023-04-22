/* eslint-disable no-console */
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

import { quizParser, tasksParser } from "./parsers";

export const createModel = () =>
  new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    modelName: "gpt-3.5-turbo",
    maxTokens: 400,
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
    "Give me answer to the following question: `{question}` in the context of `{topic}` in `{subject}`..",
  inputVariables: ["question", "subject", "topic"]
});
export const startAnswerAgent = async (model: OpenAI, question: string, subject: string, topic: string) => {
  return await new LLMChain({
    llm: model,
    prompt: startAnswerPrompt,
  }).call({
    question,
    subject,
    topic
  });
};

const explainPrompt = new PromptTemplate({
  template:
    "Explain me `{concept}` in the context of `{topic}` in `{subject}`.",
  inputVariables: ["concept", "subject", "topic"]
});
export const startExplainAgent = async (model: OpenAI, concept: string, subject: string, topic: string) => {
  return await new LLMChain({
    llm: model,
    prompt: explainPrompt,
  }).call({
    concept,
    subject,
    topic
  });
};

const verifyPrompt = new PromptTemplate({
  template:
    "You are a teacher and I am a student. Your goal is to verify my work and provide feedback. Provide you feedback, starting with overall assessment of the my work. Then give me a feedback. Think through how you would improve it. Provide suggestions. Help fix bugs & errors. Point out areas of improvement. Commend what was done well. Add your thoughts on anything you think is worth commenting on. The assigment is `{task}` in the context of `{topic}` in `{subject}`. My response is `{inputValue}`.",
  inputVariables: ["task", "inputValue", "subject", "topic"]
});
export const startVerifyAgent = async (model: OpenAI, task: string, inputValue: string, subject: string, topic: string) => {
  return await new LLMChain({
    llm: model,
    prompt: verifyPrompt,
  }).call({
    task,
    inputValue,
    subject,
    topic
  });
};


const quizPrompt = new PromptTemplate({
  template:
    "Create a single quizz question with four potential answers for the following material: `{testSubject}`. You need to offer 4 quizz answers to this question out of which exactly one will be correct. You need to mark correct answer with (correct) tag.\n{format_instructions}",
  inputVariables: ["testSubject"],
  partialVariables: {
    format_instructions: quizParser.getFormatInstructions(),
  },
});
export const startQuizAgent = async (model: OpenAI, testSubject: string) => {
  return await new LLMChain({
    llm: model,
    prompt: quizPrompt,
  }).call({
    testSubject
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