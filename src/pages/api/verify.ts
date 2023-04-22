import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { verifyAgent } from "../../services/agent-service";
import type { RequestBody } from "../../utils/interfaces";

export const config = {
  runtime: "edge",
};

const handler = async (request: NextRequest) => {
  try {
    const { task, inputValue, subject, topic } = (await request.json()) as RequestBody;
    const result = await verifyAgent(task as string, inputValue as string, subject as string, topic as string);
    return NextResponse.json({ result });
  } catch (e) { /* empty */ }

  return NextResponse.error();
};

export default handler;
