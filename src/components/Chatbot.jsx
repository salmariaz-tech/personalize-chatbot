import React, { useState } from "react";
import axios from "axios";
import "../index.css";



const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBd89v2DDyfus0k9uYsm_ctcyMAR9BO4PQ",
        {
          contents: [
            {
              parts: [
                {
                  text: `You are an expert AI Scientist only answer AI related queries. If user asks anything else, reply: "I Don't have knowledge about that".`,
                },
                {
                  text: `User query: ${query}`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        res.data &&
        res.data.candidates &&
        res.data.candidates[0].content &&
        res.data.candidates[0].content.parts[0].text
      ) {
        setResponse(res.data.candidates[0].content.parts[0].text);
      } else {
        setResponse("⚠️ No response received. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setResponse("⚠️ Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">🤖 AI Chatbot</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="query" className="chatbot-label">
          Enter Your Query
        </label>
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={handleChange}
          placeholder="Ask me anything about AI..."
          className="chatbot-input"
        />

        <button
          type="submit"
          disabled={loading}
          className="chatbot-button"
        >
          {loading ? "Processing..." : "Send Query"}
        </button>
      </form>

      {response && (
        <div className="chatbot-response">
          <h2 className="chatbot-response-title">Chatbot Response:</h2>
          <p className="chatbot-response-text">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;


