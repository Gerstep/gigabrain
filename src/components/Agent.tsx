/* eslint-disable no-console */
import axios from "axios";

export interface Message {
  type: "thinking" | "action" | "system" | "topic";
  info?: string;
  value: string;
  actions?: string[];
}

class Agent {
  subject: string;
  proficiency: string;
  topic: string;
  tasks: string[] = [];
  sendMessage: (message: Message) => void;

  constructor(
    subject: string,
    proficiency: string,
    topic: string,
    addMessage: (message: Message) => void
  ){
    this.subject = subject;
    this.proficiency = proficiency;
    this.topic = topic;
    this.sendMessage = addMessage;
  }

  async run() {
    try {
      this.sendThinkingMessage();

      this.tasks = await this.getInitialTask();
      for (const task of this.tasks) {
        await new Promise((r) => setTimeout(r, 800));
        this.sendTopicMessage(task);
      }
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async getInitialTask(): Promise<string>{
    const res = await axios.post(`/api/chain`, {
      subject: this.subject
    })
    return res.data.newTask as string;
  }

  sendTopicMessage(value : string) {
    this.sendMessage({ type: "topic", value: value, actions: ["Learn more → "] });
  }

  sendThinkingMessage() {
    this.sendMessage({ type: "thinking", value: "" });
  }
}

export default Agent;