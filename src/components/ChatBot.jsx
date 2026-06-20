import { useState, useRef, useEffect } from "react";
import { IconMessage, IconX, IconSend, IconRobot } from "@tabler/icons-react";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const SYSTEM_CONTEXT = `You are Lawrence Saludes' portfolio assistant.

Known information:
- Lawrence is a BSIT graduate from Holy Cross of Davao College.
- He is a Junior Full Stack Developer.
- He has experience with React.js, Next.js, Laravel, PHP, MySQL, Supabase, Docker, Git/GitHub, REST APIs, and deployment workflows.
- Projects: DavCom Guide, StackRate, SafeShore/AquaCheck, Flowly, AI Resume Analyzer, PickN'Eat.
- He also has video editing experience.
- He is based in Davao City, Philippines.

Rules:
- Keep answers under 50 words.
- Answer only the current question.
- Do not repeat previous answers.
- Do not combine old answers with new answers.
- Be concise and professional.
- If information is unavailable, say exactly:
"I don't have that information in Lawrence's portfolio."
- For technical questions, give a short beginner-friendly explanation.
- Do not invent fake experience, age, salary, clients, or personal details.
- Do not mention Lawrence unless the question is specifically about him.`;

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm Lawrence's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsLoading(true);

    try {
      const res = await fetch(GEMINI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_CONTEXT }],
          },
          contents: [
            { role: "user", parts: [{ text }] },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 100,
          },
        }),
      });

      if (!res.ok) {
        const errBody = await res.text().catch(() => "");
        const parsed = (() => { try { return JSON.parse(errBody); } catch { return null; } })();
        const msg = parsed?.error?.message || `API error ${res.status}`;
        throw new Error(msg);
      }

      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response. Please try again.";

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      console.error("ChatBot error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I'm not available right now. Please try again later!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        className={`chatbot-toggle ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <IconX className="chatbot-toggle-icon" stroke={2} />
        ) : (
          <IconMessage className="chatbot-toggle-icon" stroke={2} />
        )}
      </button>

      <div className={`chatbot-panel ${isOpen ? "is-visible" : ""}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-left">
            <span className="chatbot-avatar">
              <IconRobot className="chatbot-avatar-icon" stroke={1.8} />
            </span>
            <span className="chatbot-header-text">AI Assistant</span>
          </div>
          <button
            className="chatbot-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <IconX stroke={2} />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-msg chatbot-msg--${msg.role}`}>
              <div className="chatbot-msg-bubble">{msg.text}</div>
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-msg chatbot-msg--assistant">
              <div className="chatbot-msg-bubble chatbot-typing-indicator">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-area">
          <input
            ref={inputRef}
            className="chatbot-input"
            type="text"
            placeholder="Ask about Lawrence..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            className="chatbot-send-btn"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <IconSend className="chatbot-send-icon" stroke={2} />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBot;
