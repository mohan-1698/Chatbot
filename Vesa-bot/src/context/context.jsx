// src/context/context.jsx

import { createContext, useState } from "react";
import { run } from "../config/test"; // Gemini API function

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [chats, setChats] = useState([
    {
      title: "New Chat",
      prompts: [],
      responses: [],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState("");

  const delaypara = (index, nextWord, callback = null) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
      if (callback && index === callback.lastIndex) {
        callback.done();
      }
    }, 50 * index);
  };

  const onSent = async (prompt) => {
    setLoading(true);
    setShowResult(true);
    setResultData("");

    try {
      const response = await run(prompt);

      // Format response
      let formatted = response
        .replace(/```/g, (match, offset, str) =>
          str.slice(0, offset).includes("<pre>")
            ? "</code></pre>"
            : "<pre><code>"
        )
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
        .replace(/\*/g, "<br/>");

      const words = formatted.split(" ");
      for (let i = 0; i < words.length; i++) {
        const callback =
          i === words.length - 1
            ? {
                lastIndex: i,
                done: () => {
                  setLoading(false);
                },
              }
            : null;
        delaypara(i, words[i] + " ", callback);
      }

      // Save prompt and response in the current chat
      const updatedChats = [...chats];
      updatedChats[currentChatIndex].prompts.push(prompt);
      updatedChats[currentChatIndex].responses.push(formatted);
      setChats(updatedChats);
    } catch (err) {
      setResultData("❌ Something went wrong!");
      setLoading(false);
      console.error("Error from Gemini:", err);
    } finally {
      setInput("");
    }
  };

  const createNewChat = () => {
    setChats([
      ...chats,
      {
        title: `Chat ${chats.length + 1}`,
        prompts: [],
        responses: [],
      },
    ]);
    setCurrentChatIndex(chats.length);
    setResultData("");
    setShowResult(false);
  };

  const loadChat = (index) => {
    setCurrentChatIndex(index);
    setShowResult(true);
    const lastResponse = chats[index].responses.at(-1) || "";
    setResultData(lastResponse);
  };

  const contextValue = {
    input,
    setInput,
    onSent,
    chats,
    currentChatIndex,
    createNewChat,
    loadChat,
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
