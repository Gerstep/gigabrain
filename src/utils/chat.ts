/* eslint-disable no-console */
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";


export const createModel = () =>
  new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    modelName: "gpt-3.5-turbo",
    maxTokens: 400,
  });

const discussPrompt = new PromptTemplate({
  template:
    "Write a random sentence about `{topic}` in `{subject}`",
  inputVariables: ["subject", "topic"]
});
export const startDiscuss = async (model: OpenAI, subject: string, topic: string) => {
  return await new LLMChain({
    llm: model,
    prompt: discussPrompt,
  }).call({
    subject,
    topic,
  });
};