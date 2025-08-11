import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Chatbot = () => {
  const { userInfo, chatHistory, setChatHistory } = useContext(UserContext);
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setChatHistory(prev => [...prev, { sender: 'user', text: query }]);

    try {
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text: `You are an expert AI Scientist. Always address the user by their name (${userInfo.name}) and only answer AI-related questions. If it's unrelated, reply: "I don't have knowledge about that."`
                },
                { text: `User query: ${query}` }
              ]
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": "AIzaSyB-YMsvZ6mUt3n_9vP66JACDRtx9-bY-Vo"
          }
        }
      );

      const aiResponse = res.data.candidates[0].content.parts[0].text;

      setChatHistory(prev => [...prev, { sender: 'bot', text: aiResponse }]);
    } catch (err) {
      console.error(err);
    }

    setQuery('');
  };

  return (
    <div className="chat-container">
      <h2>Welcome, {userInfo?.name}!</h2>
      <div className="chat-history">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <b>{msg.sender === 'user' ? userInfo.name : 'AI'}:</b> {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input 
          type="text" 
          placeholder="Ask something about AI..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
