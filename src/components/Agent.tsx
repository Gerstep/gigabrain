/* eslint-disable no-console */
import axios from "axios";

export interface Message {
  type: "thinking" | "action" | "system" | "topic" | "test" | "answer";
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
      this.sendAnswerMessage(this.answer);
    } catch (e) {
      console.log(e);
      return;
    }
  }

  // get context (learned topics)
  async test() {
      this.sendTestMessage("test");
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
    this.sendMessage({ type: "topic", value: value, actions: ["ask"] });
  }

  sendThinkingMessage() {
    this.sendMessage({ type: "thinking", value: "" });
  }

  sendTestMessage(value : string) {
    this.sendMessage({ type: "test", value: value, actions: ["A", "B", "C", "D"] });
  }

  sendAnswerMessage(value : string) {
    this.sendMessage({ type: "answer", value: value });
  }
}

export default Agent;