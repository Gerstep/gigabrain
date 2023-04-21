import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { createModel, startDiscuss } from '@/utils/chat'

import type { RequestBody } from "../../utils/interfaces";

export const config = {
  runtime: "edge",
};

async function askDiscuss(subject: string, topic: string) {
  const completion = await startDiscuss(createModel(), subject, topic);
  console.log(typeof completion.text);
  console.log("Answer text:" + (completion.text as string));
  return completion.text as string;
}

const handler = async (request: NextRequest) => {
  try {
    const { subject, topic } = (await request.json()) as RequestBody;
    const discussMessage = await askDiscuss(subject as string, topic as string);
    return NextResponse.json({ discussMessage });
  } catch (e) { /* empty */ }

  return NextResponse.error();
};

export default handler;
