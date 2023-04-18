import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { explainAgent } from "../../services/agent-service";
import type { RequestBody } from "../../utils/interfaces";

export const config = {
  runtime: "edge",
};

const handler = async (request: NextRequest) => {
  try {
    const { concept, subject, topic } = (await request.json()) as RequestBody;
    const explanation = await explainAgent(concept as string, subject as string, topic as string);
    return NextResponse.json({ explanation });
  } catch (e) { /* empty */ }

  return NextResponse.error();
};

export default handler;
