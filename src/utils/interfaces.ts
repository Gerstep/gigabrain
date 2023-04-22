import type { ModelSettings } from "./types";

export interface RequestBody {
  modelSettings: ModelSettings;
  subject?: string;
  topic?: string;
  task?: string;
  question?: string;
  person?: string;
  chatMessage?: string;
  concept?: string;
  testSubject?: string;
  inputValue?: string;
  tasks?: string[];
  lastTask?: string;
  result?: string;
  completedTasks?: string[];
}