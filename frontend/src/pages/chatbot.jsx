import React, { useState, useRef, useEffect } from 'react'
import { bot_icon } from '../assets/assets'
import FloatingShape from '../components/FloatingShape'

const API_URL = "https://medimate-git-562216568812.europe-west1.run.app/api/chat"

const Chatbot = () => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    const currentInput = input
    setInput("")
    setMessages((m) => [...m, { role: "user", text: currentInput }])
    setLoading(true)

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: currentInput }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: "bot", text: data.reply || "No reply from server." }])
    } catch (err) {
      setMessages((m) => [...m, { role: "bot", text: "Error connecting to server." }])
    } finally {
      setLoading(false)
    }
  }

  function formatBotReply(text) {
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean)
    const sections = {}
    let currentKey = null

    const matchers = {
      Severity: /severity\s*:/i,
      "Immediate Need for Attention": /immediate\s+need\s+for\s+attention\s*:/i,
      "See a Doctor If": /(see|seek).*(doctor|medical)/i,
      "Next Steps": /next\s+steps\s*:/i,
      "Possible Conditions": /possible\s+conditions\s*:/i,
      Disclaimer: /disclaimer\s*:/i,
    }

    lines.forEach((line) => {
      for (let key in matchers) {
        if (matchers[key].test(line)) {
          currentKey = key
          if (["See a Doctor If", "Next Steps", "Possible Conditions"].includes(key)) {
            sections[key] = []
          } else {
            sections[key] = line.replace(matchers[key], "").trim()
          }
          return
        }
      }

      if (line.startsWith("-") && currentKey && Array.isArray(sections[currentKey])) {
        sections[currentKey].push(line.replace(/^-/, "").trim())
      } else if (/^[-•*0-9]+\./.test(line) && currentKey && Array.isArray(sections[currentKey])) {
        sections[currentKey].push(line.replace(/^[-•*0-9.]+\s*/, "").trim())
      }
    })

    return (
      <div className="space-y-2 leading-relaxed">
        {sections["Severity"] && <p><strong>Severity:</strong> {sections["Severity"]}</p>}
        {sections["Immediate Need for Attention"] && (
          <p><strong>Immediate Need for Attention:</strong> {sections["Immediate Need for Attention"]}</p>
        )}
        {sections["See a Doctor If"]?.length > 0 && (
          <div>
            <strong>See a Doctor If:</strong>
            <ul className="list-disc list-inside">
              {sections["See a Doctor If"].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        )}
        {sections["Next Steps"]?.length > 0 && (
          <div>
            <strong>Next Steps:</strong>
            <ul className="list-disc list-inside">
              {sections["Next Steps"].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        )}
        {sections["Possible Conditions"]?.length > 0 && (
          <div>
            <strong>Possible Conditions:</strong>
            <ul className="list-disc list-inside">
              {sections["Possible Conditions"].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        )}
        {sections["Disclaimer"] && <p className="italic text-sm text-gray-500">{sections["Disclaimer"]}</p>}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-teal-700 py-24 px-4 relative overflow-hidden">
      <FloatingShape color="#02415a" size={250} top="10%" left="15%" delay={0} />
      <FloatingShape color="#036280" size={300} top="40%" left="70%" delay={3} />
      <FloatingShape color="#012f45" size={200} top="65%" left="25%" delay={5} />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Chat with Miffy</h1>
          <p className="text-teal-200 mt-1">Describe your symptoms and get instant guidance</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl flex flex-col h-[70vh] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <p className="text-center text-gray-400 mt-10">Start by describing how you're feeling.</p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-end gap-2 max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.role === "bot" && (
                    <img src={bot_icon} alt="Miffy" className="w-8 h-8 rounded-full flex-shrink-0" />
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    {msg.role === "bot" ? formatBotReply(msg.text) : msg.text}
                  </div>
                </div>
              </div>
            ))}
            {loading && <p className="text-sm text-gray-400">Miffy is typing...</p>}
            <div ref={chatEndRef} />
          </div>

          <div className="border-t border-gray-200 p-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Describe your symptoms..."
              className="flex-1 px-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={sendMessage}
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
