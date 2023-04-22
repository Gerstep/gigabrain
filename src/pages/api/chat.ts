import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { RequestBody } from "../../utils/interfaces";

export const config = {
  runtime: "edge",
};

const chat =
  new ChatOpenAI({
    openAIApiKey: process.env.OPEN_API_KEY,
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    maxTokens: 400,
  })

const chatMemory = new BufferMemory({ returnMessages: true, memoryKey: "history" })

export const startDiscuss = async (subject: string, topic: string, person: string, chatMessage: string) => {
  const systemTemplate = `Simulate ` + person + ` as a non-player character (NPC) in an interactive fiction game. You need to discuss ` + topic + ` in the context of ` + subject + ` as if you were ` + person + `. Allow me to ask questions, and then simulate how ` + person + ` would respond. Ensure that the responses ` + person + ` would have given are provided directly without saying "As a simulation". Ensure that the responses do not contain historical information in the past tense, and only say what ` + person + ` would have said in the present tense.`;

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(systemTemplate),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  return await new ConversationChain({
    memory: chatMemory,
    prompt: chatPrompt,
    llm: chat,
  }).call({
    input: chatMessage,
  });
};

async function askDiscuss(subject: string, topic: string, person: string, chatMessage: string) {
  const completion = await startDiscuss(subject, topic, person, chatMessage);
  console.log(typeof completion.response);
  console.log("Answer text:" + (completion.response));
  return completion.response as string;
}

const handler = async (request: NextRequest) => {
  try {
    const { subject, topic, person, chatMessage } = (await request.json()) as RequestBody;
    const discussMessage = await askDiscuss(subject as string, topic as string, person as string, chatMessage as string);
    return NextResponse.json({ discussMessage });
  } catch (e) { /* empty */ }

  return NextResponse.error();
};

export default handler;
