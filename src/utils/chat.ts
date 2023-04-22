/* eslint-disable no-console */
// NOT USED ANYWHERE!!!
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

export const run = async () => {
  const chat = new ChatOpenAI({ temperature: 0 });

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  const chain = new ConversationChain({
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    prompt: chatPrompt,
    llm: chat,
  });

  const response = await chain.call({
    input: "hi! whats up?",
  });

  console.log(response);
};



// import { LLMChain } from "langchain/chains";
// import { OpenAI } from "langchain/llms/openai";
// import { PromptTemplate } from "langchain/prompts";

// export const createModel = () =>
//   new OpenAI({
//     openAIApiKey: process.env.OPENAI_API_KEY,
//     temperature: 0.9,
//     modelName: "gpt-3.5-turbo",
//     maxTokens: 400,
//   });

// const discussPrompt = new PromptTemplate({
//   template:
//     "Write a random sentence about `{topic}` in `{subject}`",
//   inputVariables: ["subject", "topic"]
// });
// export const startDiscuss = async (model: OpenAI, subject: string, topic: string) => {
//   return await new LLMChain({
//     llm: model,
//     prompt: discussPrompt,
//   }).call({
//     subject,
//     topic,
//   });
// };