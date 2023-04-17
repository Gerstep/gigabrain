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
  action: string;
  tasks: string[] = [];
  answer: string | undefined;
  sendMessage: (message: Message) => void;

  constructor(
    subject: string,
    proficiency: string,
    topic: string,
    action: string,
    addMessage: (message: Message) => void
  ){
    this.subject = subject;
    this.proficiency = proficiency;
    this.topic = topic;
    this.action = action;
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

  async explore(question : string) {
    try {
      this.sendThinkingMessage();
      this.answer = await this.getAnswer(question);
      console.log(' GOT ANSWER ::: ' + this.answer)
      this.sendTopicMessage(this.answer);
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async getInitialTask(): Promise<string[]>{
    const res = await axios.post(`/api/chain`, {
      subject: this.subject,
      topic: this.topic
    })
    return res.data.newTask as string[];
  }

  async getAnswer(question : string) {
    const res = await axios.post(`/api/answer`, {
      question: question
    })
    return res.data.answer as string;
  }

  sendTopicMessage(value : string) {
    this.sendMessage({ type: "topic", value: value, actions: ["answer"] });
  }

  sendThinkingMessage() {
    this.sendMessage({ type: "thinking", value: "" });
  }
}

export default Agent;