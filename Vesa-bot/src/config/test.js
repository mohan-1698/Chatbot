// src/config/test.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Use Vite environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 2048,
};

// Main prompt function
export async function run(prompt) {
  try {
    const chat = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    return result.response.text();
  } catch (err) {
    console.error("❌ Error from Gemini:", err);
    return "Something went wrong!";
  }
}
