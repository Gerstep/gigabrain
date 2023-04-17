import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { startAgent } from "../../services/agent-service";
import type { RequestBody } from "../../utils/interfaces";

export const config = {
  runtime: "edge",
};

const handler = async (request: NextRequest) => {
  try {
    const { subject, topic } = (await request.json()) as RequestBody;
    console.log('starting agent with ' + subject +
      ' and ' + topic)
    const newTask = await startAgent(subject as string, topic as string);
    return NextResponse.json({ newTask });
  } catch (e) { /* empty */ }

  return NextResponse.error();
};

export default handler;
