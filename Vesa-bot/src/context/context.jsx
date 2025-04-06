// src/context/context.jsx

import { createContext, useState } from "react";
import { run } from "../config/test"; // Vite frontend Gemini function

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    setPrevPrompts([...prevPrompts, prompt]);

    try {
      const response = await run(prompt);
      setResultData(response);
    } catch (err) {
      setResultData("❌ Something went wrong!");
      console.error("Error from Gemini:", err);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    input,
    setInput,
    onSent,
    recentPrompt,
    prevPrompts,
    showResult,
    loading,
    resultData,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
