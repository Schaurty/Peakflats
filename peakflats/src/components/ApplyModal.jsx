import { useState } from "react";
import { T, F, inpStyle, btnPrimary, fmtEur } from "../theme.js";

export default function ApplyModal({ l, user, onClose, onDone }) {
  const [msg, setMsg] = useState("");
  const [occupation, setOccupation] = useState("");
  const [done, setDone] = useState(false);

  if (!l) return null;

  const valid = msg.trim().length > 0 && occupation !== "";

  if (done) return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: T.surfaceAlt, borderRadius: 20, padding: "44px 36px", textAlign: "center", maxWidth: 380, width: "100%" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
        <h2 style={{ fontFamily: F.display, fontSize: 26, color: T.ink, margin: "0 0 10px" }}>Anfrage gesendet</h2>
        <p style={{ color: T.inkLight, fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          {(l.landlord && l.landlord.name) || "Der/die Vermieter:in"} wurde benachrichtigt und meldet sich in der Regel innerhalb von 48 Stunden.
        </p>
        <button onClick={onDone} style={btnPrimary()}>Weiter stöbern</button>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: T.surfaceAlt, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 640, maxHeight: "90dvh", overflowY: "auto", padding: "28px 28px 44px" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <h3 style={{ margin: 0, fontFamily: F.display, fontSize: 22, fontWeight: 700, color: T.ink }}>Anfrage senden</h3>
            <div style={{ color: T.inkLight, fontSize: 13, marginTop: 3 }}>{l.title} · {fmtEur(l.rent)}/Mo</div>
          </div>
          <button onClick={onClose} aria-label="Schließen" style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: T.inkLight }}>✕</button>
        </div>
        <div style={{ background: T.bg, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: T.tealPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: `2px solid ${T.teal}` }}>🙂</div>
          <div>
            <div style={{ fontWeight: 600, color: T.ink, fontSize: 14 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: T.inkLight }}>{user.age} Jahre · München · <span style={{ color: T.green }}>✓ verifiziert</span></div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <select value={occupation} onChange={(e) => setOccupation(e.target.value)} style={inpStyle}>
            <option value="" disabled>Beruf / Studiengang</option>
            <option>Student/in</option>
            <option>Berufseinsteiger/in (angestellt)</option>
            <option>Selbstständig</option>
            <option>Duales Studium / Ausbildung</option>
          </select>
          <textarea
            placeholder="Persönliche Nachricht…"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            style={{ ...inpStyle, minHeight: 110, resize: "vertical" }}
          />
        </div>
        <button onClick={() => valid && setDone(true)} disabled={!valid} style={{ ...btnPrimary(!valid), marginTop: 20 }}>
          Anfrage abschicken
        </button>
      </div>
    </div>
  );
}
