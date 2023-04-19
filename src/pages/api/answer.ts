import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { askAgent } from "../../services/agent-service";
import type { RequestBody } from "../../utils/interfaces";

export const config = {
  runtime: "edge",
};

const handler = async (request: NextRequest) => {
  try {
    const { question, subject, topic } = (await request.json()) as RequestBody;
    const answer = await askAgent(question as string, subject as string, topic as string);
    return NextResponse.json({ answer });
  } catch (e) { /* empty */ }

  return NextResponse.error();
};

export default handler;
