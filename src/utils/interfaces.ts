import type { ModelSettings } from "./types";

export interface RequestBody {
  modelSettings: ModelSettings;
  subject?: string;
  topic?: string;
  task?: string;
  question?: string;
  testSubject?: string;
  tasks?: string[];
  lastTask?: string;
  result?: string;
  completedTasks?: string[];
}