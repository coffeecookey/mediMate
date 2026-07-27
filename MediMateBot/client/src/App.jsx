import { useState, useRef, useEffect } from "react";
import "./App.css";
import { bot_icon } from "./assets/assets";
import FloatingShape from "./FloatingShape"; // <-- import Framer Motion version

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const currentInput = input;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: currentInput }]);

    try {
      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: currentInput }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "bot", text: data.reply || "No reply from server." }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "bot", text: "Error connecting to server." }]);
    }
  };

  function formatBotReply(text) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const sections = {};
  let currentKey = null;

  const matchers = {
    Severity: /severity\s*:/i,
    "Immediate Need for Attention": /immediate\s+need\s+for\s+attention\s*:/i,
    "See a Doctor If": /(see|seek).*(doctor|medical)/i,
    "Next Steps": /next\s+steps\s*:/i,
    "Possible Conditions": /possible\s+conditions\s*:/i,
    Disclaimer: /disclaimer\s*:/i,
  };

  lines.forEach((line) => {
    for (let key in matchers) {
      if (matchers[key].test(line)) {
        currentKey = key;
        if (["See a Doctor If", "Next Steps", "Possible Conditions"].includes(key)) {
          sections[key] = [];
        } else {
          sections[key] = line.replace(matchers[key], "").trim();
        }
        return;
      }
    }

    if (line.startsWith("-") && currentKey && Array.isArray(sections[currentKey])) {
      sections[currentKey].push(line.replace(/^-/, "").trim());
    } else if (/^[-•*0-9]+\./.test(line) && currentKey && Array.isArray(sections[currentKey])) {
      sections[currentKey].push(line.replace(/^[-•*0-9.]+\s*/, "").trim());
    }
  });

  return (
    <div className="bot-reply" style={{ lineHeight: "1.6" }}>
      {sections["Severity"] && <p><strong>Severity:</strong> {sections["Severity"]}</p>}
      {sections["Immediate Need for Attention"] && (
        <p><strong>Immediate Need for Attention:</strong> {sections["Immediate Need for Attention"]}</p>
      )}
      {sections["See a Doctor If"]?.length > 0 && (
        <div>
          <strong>See a Doctor If:</strong>
          <ul>
            {sections["See a Doctor If"].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}
      {sections["Next Steps"]?.length > 0 && (
        <div>
          <strong>Next Steps:</strong>
          <ul>
            {sections["Next Steps"].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}
      {sections["Possible Conditions"]?.length > 0 && (
        <div>
          <strong>Possible Conditions:</strong>
          <ul>
            {sections["Possible Conditions"].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}
      {sections["Disclaimer"] && <p><em>{sections["Disclaimer"]}</em></p>}
    </div>
  );
}


  return (
    <div className="app">
      {/* Floating shapes */}
      <FloatingShape color="#02415a" size={250} top="10%" left="15%" delay={0} />
      <FloatingShape color="#036280" size={300} top="40%" left="70%" delay={3} />
      <FloatingShape color="#012f45" size={200} top="65%" left="25%" delay={5} />
      <FloatingShape color="#043d5f" size={150} top="75%" left="50%" delay={2} />

      {/* Header */}
      <div className="header">MediMate Bot</div>

      {/* Chat window */}
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.role}`}
            style={{ animation: "fadeIn 0.3s forwards", animationDelay: `${i * 0.1}s` }}
          >
            {msg.role === "bot" && <img src={bot_icon} alt="bot" className="bot-avatar" />}
            <div className="message-bubble">{msg.role === "bot" ? formatBotReply(msg.text) : msg.text}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <div className="input-bar">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Describe your symptoms..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
