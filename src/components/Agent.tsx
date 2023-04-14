/* eslint-disable no-console */
import axios from "axios";

export interface Message {
  type: "goal" | "thinking" | "task" | "action" | "system";
  info?: string;
  value: string;
}

class Agent {
  subject: string;
  proficiency: string;
  topic: string;
  task = '';
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
      this.task = await this.getInitialTask();
      await this.sendSystemMessage(this.task);
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

  sendSystemMessage(value : string) {
    this.sendMessage({ type: "system", value: value });
    console.log('IM CALLED!!! WTIH VALUE ' + value)
  }
}

export default Agent;