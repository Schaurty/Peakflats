import { useState, useEffect, useRef } from "react";
import { T, F, inpStyle, btnPrimary } from "../theme.js";
import { INIT_MESSAGES } from "../data/listings.js";

export default function CommunityChat({ user }) {
  const [messages, setMessages] = useState(INIT_MESSAGES);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: user.name,
        age: parseInt(user.age, 10),
        city: "München",
        text,
        time: new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }),
        role: user.role,
        isMe: true,
      },
    ]);
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100dvh - 120px)" }}>
      <div style={{ background: T.surfaceAlt, borderBottom: `1px solid ${T.border}`, padding: "16px 20px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 600, color: T.ink, marginBottom: 2 }}>Community-Chat</div>
          <p style={{ color: T.inkLight, fontSize: 13, margin: 0 }}>Öffentlich · München · Tipps, Erfahrungen, freie Zimmer</p>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 0" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {messages.map((m) => {
            const isMe = !!m.isMe;
            return (
              <div key={m.id} style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: isMe ? T.tealPale : T.bg, border: `1.5px solid ${isMe ? T.teal : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                  {m.role === "landlord" ? "🔑" : "🙂"}
                </div>
                <div style={{ maxWidth: "72%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4, flexDirection: isMe ? "row-reverse" : "row" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: isMe ? T.teal : T.ink }}>{m.user}</span>
                    <span style={{ fontSize: 11, color: T.inkFaint }}>{m.age} J · {m.time}</span>
                  </div>
                  <div style={{ background: isMe ? T.teal : T.surfaceAlt, color: isMe ? "#fff" : T.ink, border: `1px solid ${isMe ? T.teal : T.border}`, borderRadius: isMe ? "16px 4px 16px 16px" : "4px 16px 16px 16px", padding: "10px 14px", fontSize: 14, lineHeight: 1.55 }}>
                    {m.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>
      </div>
      <div style={{ background: T.surfaceAlt, borderTop: `1px solid ${T.border}`, padding: "12px 20px 14px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", gap: 10 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) send(); }}
            placeholder="Schreib etwas…"
            style={{ ...inpStyle, flex: 1 }}
          />
          <button onClick={send} disabled={!input.trim()} style={{ ...btnPrimary(!input.trim()), padding: "11px 18px", width: "auto" }}>
            Senden
          </button>
        </div>
      </div>
    </div>
  );
}
