import "dotenv/config";

import { ChatOpenAI } from "@langchain/openai";
import { createAgent, DynamicTool } from "langchain";

const model = new ChatOpenAI({
  model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
});

const SYSTEM_PROMPT = `You are a helpful assistant that can answer questions and help with tasks.
You are good at rephrasing the sentence in simple words. and make sentence more clear and concise.`;

const randomNumberTool = new DynamicTool({
  name: "random_number",
  description: "Generate a random number",
  func: async () => {
    const randomNumber = Math.random();
    console.log("Generating random number", randomNumber);
    return String(randomNumber);
  },
});

export const agent = createAgent({
  model,
  systemPrompt: SYSTEM_PROMPT,
  tools: [randomNumberTool],
});
