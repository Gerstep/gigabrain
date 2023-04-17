/* eslint-disable no-console */
import axios from "axios";

export interface Message {
  type: "thinking" | "action" | "system" | "topic" | "test" | "answer" | "result";
  info?: string;
  options?: string[];
  value: string;
  actions?: string[];
}

export interface Quiz {
  question: string;
  answers: string[];
}

class Agent {
  subject: string;
  proficiency: string;
  topic: string;
  action: string;
  tasks: string[] = [];
  options: string[] = [];
  answer: string | undefined;
  quiz: Quiz = {
    question: "",
    answers: []
  };
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
  async test(testSubject : string) {
    try {
      this.sendThinkingMessage();
      this.quiz = await this.getTest(testSubject);
      this.sendTestMessage(this.quiz.question, this.quiz.answers);
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async answerTest(answer : string) {
    this.sendThinkingMessage();
    if(answer.endsWith("(correct)")){
      this.sendResultMessage("CONGRATS!")
    } else {
      this.sendResultMessage("You failed")
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

  async getTest(testSubject : string) {
    const res = await axios.post(`/api/quiz`, {
      testSubject: testSubject
    })
    return res.data.quiz as string;
  }

  sendTopicMessage(value : string) {
    this.sendMessage({ type: "topic", value: value, actions: ["ask"] });
  }

  sendResultMessage(value : string) {
    this.sendMessage({ type: "result", value: value });
  }

  sendThinkingMessage() {
    this.sendMessage({ type: "thinking", value: "" });
  }

  sendTestMessage(value : string, options : string[]) {
    this.sendMessage({ type: "test", value: value, actions: options });
  }

  sendAnswerMessage(value : string) {
    this.sendMessage({ type: "answer", value: value });
  }
}

export default Agent;