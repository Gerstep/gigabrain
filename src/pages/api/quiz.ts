import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { quizAgent } from "../../services/agent-service";
import type { RequestBody } from "../../utils/interfaces";

export const config = {
  runtime: "edge",
};

const handler = async (request: NextRequest) => {
  try {
    const { testSubject } = (await request.json()) as RequestBody;
    const quiz = await quizAgent(testSubject);
    return NextResponse.json({ quiz });
  } catch (e) { /* empty */ }

  return NextResponse.error();
};

export default handler;
