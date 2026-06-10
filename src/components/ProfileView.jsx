import { T, F, fmtEur } from "../theme.js";

export default function ProfileView({ user, applications, onBack }) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 20px 60px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: T.inkLight, cursor: "pointer", fontSize: 13, marginBottom: 28, fontFamily: F.body }}>← Zurück</button>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: T.tealPale, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, border: `2.5px solid ${T.teal}` }}>🙂</div>
        <h2 style={{ margin: "0 0 4px", fontFamily: F.display, fontSize: 24, fontWeight: 700, color: T.ink }}>{user.name}</h2>
        <div style={{ color: T.inkLight, fontSize: 14 }}>{user.age} Jahre · München</div>
        {user.instagram && <div style={{ color: T.teal, fontSize: 13, marginTop: 4 }}>{user.instagram}</div>}
        <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 8 }}>
          <span style={{ padding: "4px 13px", borderRadius: 99, background: T.tealPale, color: T.teal, fontSize: 12, fontWeight: 600 }}>
            {user.role === "tenant" ? "🎒 Suchend" : "🔑 Vermieter:in"}
          </span>
          <span style={{ padding: "4px 13px", borderRadius: 99, background: T.greenPale, color: T.green, fontSize: 12, fontWeight: 600 }}>✓ Altersverifiziert</span>
        </div>
      </div>
      {user.bio && (
        <div style={{ background: T.bg, borderRadius: 14, padding: "16px 18px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.inkFaint, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Über mich</div>
          <p style={{ margin: 0, color: T.inkMid, fontSize: 14, lineHeight: 1.6 }}>{user.bio}</p>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {[
          { label: "Anfragen gesendet", val: applications.length },
          { label: "Verifiziert", val: "✓" },
        ].map(({ label, val }) => (
          <div key={label} style={{ background: T.bg, borderRadius: 12, padding: "16px", textAlign: "center" }}>
            <div style={{ fontFamily: F.display, fontSize: 26, fontWeight: 700, color: T.teal }}>{val}</div>
            <div style={{ fontSize: 12, color: T.inkLight, marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>
      {applications.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.inkFaint, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>Meine Anfragen</div>
          {applications.map((a) => (
            <div key={a.id} style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600, color: T.ink, fontSize: 14 }}>{a.title}</div>
                <div style={{ color: T.inkLight, fontSize: 12, marginTop: 2 }}>{fmtEur(a.rent)}/Mo · {a.district}</div>
              </div>
              <span style={{ padding: "4px 12px", borderRadius: 99, background: T.amberPale, color: T.amber, fontSize: 11, fontWeight: 700 }}>⏳ Offen</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
