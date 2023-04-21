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


// shutdown() -> call when user exists the learning session
class Agent {
  subject: string;
  topic: string;
  action: string;
  tasks: string[] = [];
  options?: string[] = [];
  answer?: string | undefined;
  person?: string;
  quiz?: Quiz = {
    question: "",
    answers: []
  };
  sendMessage: (message: Message) => void;

  constructor(
    subject: string,
    topic: string,
    action: string,
    addMessage: (message: Message) => void,
    person?: string,
  ) {
    this.subject = subject;
    this.topic = topic;
    this.action = action;
    this.person = person;
    this.sendMessage = addMessage;
  }

  async discuss() {
    this.sendAnswerMessage('abc');
  }

  async start() {
    this.sendThinkingMessage();

    const initExplain = "why this topic is important";
    const explanation = await this.getExplanation(initExplain);
    this.sendAnswerMessage(explanation);
    this.sendSystemMessage("Here's a few starting questions for you to start learning " + this.topic)

    try {
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

  async run() {
    this.sendThinkingMessage();

    try {
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

  async explore(question: string) {
    try {
      this.sendThinkingMessage();
      this.answer = await this.getAnswer(question);
      this.sendAnswerMessage(this.answer);
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async ask(question: string) {
    try {
      this.sendThinkingMessage();
      this.answer = await this.getAnswer(question);
      console.log(' GOT ANSWER from chat ::: ' + this.answer)
      this.sendAnswerMessage(this.answer);
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async test(testSubject: string) {
    try {
      this.sendThinkingMessage();
      this.quiz = await this.getTest(testSubject);
      this.sendTestMessage(this.quiz.question, this.quiz.answers);
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async answerTest(answer: string) {
    if (answer.endsWith("(incorrect)")) {
      answer = answer.slice(0, answer.length - 11);
    }

    if (answer.endsWith("(correct)")) {
      this.sendResultMessage("🥳 Correct! 🥳")
    } else {
      this.sendResultMessage("Wrong, try again!")
    }
  }

  async explain(concept: string) {
    this.sendThinkingMessage();
    try {
      const explanation = await this.getExplanation(concept);
      this.sendAnswerMessage(explanation)
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async getInitialTask(): Promise<string[]> {
    const res = await axios.post(`/api/chain`, {
      subject: this.subject,
      topic: this.topic
    })
    return res.data.newTask as string[];
  }

  async getAnswer(question: string) {
    const res = await axios.post(`/api/answer`, {
      question: question,
      subject: this.subject,
      topic: this.topic
    })
    return res.data.answer as string;
  }

  async getChatMessage(question: string) {
    const res = await axios.post(`/api/chat`, {
      question: question,
      subject: this.subject,
      topic: this.topic,
      person: this.person,
    })
    return res.data.answer as string;
  }

  async getExplanation(concept: string) {
    const res = await axios.post(`/api/explain`, {
      concept: concept,
      subject: this.subject,
      topic: this.topic
    })
    return res.data.explanation as string;
  }

  async getTest(testSubject: string) {
    const res = await axios.post(`/api/quiz`, {
      testSubject: testSubject
    })
    return res.data.quiz as Quiz;
  }

  sendTopicMessage(value: string) {
    this.sendMessage({ type: "topic", value: value, actions: ["ask"] });
  }

  sendResultMessage(value: string) {
    this.sendMessage({ type: "result", value: value });
  }

  sendSystemMessage(value: string) {
    this.sendMessage({ type: "system", value: value });
  }

  sendThinkingMessage() {
    this.sendMessage({ type: "thinking", value: "" });
  }

  sendTestMessage(value: string, options: string[]) {
    this.sendMessage({ type: "test", value: value, actions: options });
  }

  sendAnswerMessage(value: string) {
    this.sendMessage({ type: "answer", value: value });
  }
}

export default Agent;