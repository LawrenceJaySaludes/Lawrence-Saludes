import { useState, useRef, useEffect } from "react";
import { IconMessage, IconX, IconSend, IconRobot } from "@tabler/icons-react";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const SYSTEM_CONTEXT = `You are Lawrence Jay A. Saludes' portfolio assistant. Answer questions about Lawrence completely — never cut off mid-sentence.

=== ABOUT LAWRENCE ===
Full name: Lawrence Jay A. Saludes
Location: Davao City, Philippines
Birthday: January 29, 2004
Email: lawrencejaysaludes@gmail.com
Phone: 0939 694 2357
Website: https://www.lawrencesaludes.me

=== ROLE ===
Junior Full Stack Developer & Video Editor. Open for remote, onsite, and freelance opportunities in web development, systems work, and creative production.

=== EDUCATION ===
Bachelor of Science in Information Technology (BSIT) graduate from Holy Cross of Davao College.

=== WORK EXPERIENCE ===
- INFOSOFT — Developer (intern/experience). Gained exposure to frontend-backend integration, API connectivity, debugging, Git/GitHub, Docker, deployment, and modern dev practices.
- Vast Professionals — Video Editor (1-2 years). Produced motion graphics, VFX, thumbnails, YouTube content using Premiere Pro, After Effects, Canva. CEO Kyla Don: "Over 2 years, Lawrence grew significantly as a video editor — strong potential to excel further."
- Freelance: PickN'Eat food management system, Infosoft Team Building 2026 same-day edit.

=== SKILLS ===
Frontend (Expert): React.js, Next.js, JavaScript, HTML, Tailwind CSS
Backend: Node.js, PHP, Laravel, REST APIs, Supabase
Mobile: React Native, Expo
Desktop: C# WinForms
Databases: MySQL, PostgreSQL, SQL Server, SQL
Deployment/DevOps: Docker, Git/GitHub, Vercel
Other: Vue (familiar), API Integration, Google API
Video Editing: Adobe Premiere Pro, After Effects, Photoshop, Canva, CapCut, motion graphics, storytelling, sound design, thumbnails, short-form & long-form content, YouTube content

=== PROJECTS ===
1. DavCom Guide — Full-stack commute navigation for Davao City with Leaflet maps. Stack: Next.js, Laravel, PostgreSQL, Docker. Live: davcom-guide.vercel.app
2. PickN'Eat — Freelance food management system with admin dashboard, auth, CRUD. Stack: React.js, Supabase, Vercel. Live: pickneat-azure.vercel.app
3. ShortList (AI Resume Analyzer) — AI-powered ATS resume analysis against job descriptions. Stack: Next.js, TypeScript, Tailwind, Gemini AI, jsPDF. Live: aishortlist.netlify.app
4. Mood Tracker — Mood logging app with database persistence. Stack: React.js, Supabase. Live: mood-tracker-shiella.vercel.app
5. SafeShore / AquaCheck — IoT-based water quality monitoring dashboard (capstone). Stack: React.js, IoT, Supabase. Live: safeshore9.vercel.app
6. Flowly — PWA personal finance tracker with real-time dashboard. Stack: React.js, Supabase. Live: flowlyfinance.vercel.app
7. Mental Health Matters — Mental health awareness platform with AI support. Stack: React.js, Node.js.
8. DATABASY — Team collab CRM project. Stack: PHP, Laravel, Docker. Live: databasy.io
9. StackRate — Mobile app for developers to assess software stack proficiency (0-100%). Stack: React Native, Expo, TypeScript, Supabase.
10. Clinical Appointment System — Desktop appointment management. Stack: C# WinForms, SQL Server.
11. Billing Receipt for PickN'Eat — Desktop billing system. Stack: C# WinForms, SQL Server.

=== SOCIAL & PROFILES ===
LinkedIn: linkedin.com/in/lawrence-jay-saludes-4b112a298
GitHub: github.com/LawrenceJaySaludes
OnlineJobs.ph, Indeed, JobStreet profiles available

=== VIDEO EDITING PORTFOLIO (YouTube channels edited) ===
Travel Pug, Water Lemon, Elite Trade Club, Business Boss, Land of Tomorrow, Keith Hothe$

=== RULES ===
- Give complete responses — never truncate or cut off mid-sentence.
- Answer only what is asked. Be concise but thorough.
- If information isn't in Lawrence's portfolio, say: "I don't have that information in Lawrence's portfolio."
- For technical questions, give a short beginner-friendly explanation.
- Do not invent fake experience, age, salary, clients, or personal details.
- Do not mention Lawrence unless the question is about him.`;

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
            maxOutputTokens: 600,
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
