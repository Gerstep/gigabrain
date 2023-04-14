import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { startAgent } from "../../services/agent-service";
import type { RequestBody } from "../../utils/interfaces";

export const config = {
  runtime: "edge",
};

const handler = async (request: NextRequest) => {
  try {
    const { subject } = (await request.json()) as RequestBody;
    const newTask = await startAgent(subject);
    return NextResponse.json({ newTask });
  } catch (e) {}

  return NextResponse.error();
};

export default handler;
