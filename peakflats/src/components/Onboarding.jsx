import { useState } from "react";
import { T, F, inpStyle, btnPrimary } from "../theme.js";
import IDVerification from "./IDVerification.jsx";

export default function Onboarding({ onDone }) {
  const [step, setStep] = useState("role");
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", bio: "", instagram: "" });
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const ageNum = parseInt(form.age, 10);
  const formValid = form.name.trim().length > 0 && ageNum >= 18 && ageNum <= 26;

  if (step === "id") {
    return <IDVerification onVerified={() => onDone({ ...form, name: form.name.trim(), city: "München", role })} />;
  }

  if (step === "role") return (
    <div style={{ minHeight: "100dvh", background: T.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ marginBottom: 52, textAlign: "center" }}>
        <div style={{ fontFamily: F.display, fontSize: 44, fontWeight: 700, color: T.ink, letterSpacing: "-1.5px", lineHeight: 1 }}>
          Peak<span style={{ color: T.teal }}>Flats</span>
        </div>
        <div style={{ color: T.inkLight, fontSize: 12, marginTop: 10, letterSpacing: "2px", textTransform: "uppercase" }}>
          München · Innenstadtlagen · 18–26
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 360 }}>
        <p style={{ fontFamily: F.display, fontSize: 22, fontWeight: 600, color: T.ink, textAlign: "center", marginBottom: 24 }}>Ich bin hier als…</p>
        {[
          { r: "tenant", icon: "🎒", title: "Wohnungssuchende:r", sub: "18–26 Jahre · Studium oder Berufseinstieg" },
          { r: "landlord", icon: "🔑", title: "Vermieter:in", sub: "Hochwertige Münchner Innenstadtwohnungen inserieren" },
        ].map(({ r, icon, title, sub }) => (
          <button
            key={r}
            onClick={() => { setRole(r); setStep("profile"); }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.teal; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; }}
            style={{
              width: "100%", background: T.surfaceAlt, border: `1.5px solid ${T.border}`,
              borderRadius: 14, padding: "18px 20px", marginBottom: 10, cursor: "pointer",
              textAlign: "left", display: "flex", alignItems: "center", gap: 16, fontFamily: F.body,
            }}
          >
            <span style={{ fontSize: 28 }}>{icon}</span>
            <div>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 17, color: T.ink }}>{title}</div>
              <div style={{ fontSize: 12, color: T.inkLight, marginTop: 2 }}>{sub}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // step === "profile"
  return (
    <div style={{ minHeight: "100dvh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: F.display, fontSize: 28, fontWeight: 700, color: T.ink }}>Profil erstellen</div>
          <div style={{ color: T.inkLight, fontSize: 13, marginTop: 6 }}>Schritt 1 von 2</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input placeholder="Vollständiger Name" value={form.name} onChange={(e) => up("name", e.target.value)} style={inpStyle} />
          <input type="number" placeholder="Alter (18–26)" min="18" max="26" value={form.age} onChange={(e) => up("age", e.target.value)} style={inpStyle} />
          {form.age && !formValid && form.name.trim() && (
            <div style={{ fontSize: 12, color: T.red }}>Bitte gib ein Alter zwischen 18 und 26 an.</div>
          )}
          <textarea
            placeholder={role === "tenant" ? "Kurz über dich: Studium, Beruf, was dir beim Wohnen wichtig ist…" : "Kurz über dich als Vermieter:in…"}
            value={form.bio}
            onChange={(e) => up("bio", e.target.value)}
            style={{ ...inpStyle, minHeight: 90, resize: "vertical" }}
          />
          <input placeholder="Instagram (optional)" value={form.instagram} onChange={(e) => up("instagram", e.target.value)} style={inpStyle} />
        </div>
        <button onClick={() => formValid && setStep("id")} disabled={!formValid} style={{ ...btnPrimary(!formValid), marginTop: 20 }}>
          Weiter → Altersverifikation
        </button>
        <button onClick={() => setStep("role")} style={{ marginTop: 10, width: "100%", background: "none", border: "none", color: T.inkLight, cursor: "pointer", fontSize: 13, fontFamily: F.body }}>
          ← Zurück
        </button>
      </div>
    </div>
  );
}
