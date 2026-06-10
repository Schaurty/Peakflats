import { useEffect } from "react";
import { T, F, fmtEur, btnPrimary } from "../theme.js";

export default function DetailModal({ l, onClose, hasApplied, onApply, webMode }) {
  // ESC schließt das Modal, Hintergrund-Scroll wird gesperrt
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!l) return null;
  const isWG = l.type === "WG-Zimmer";

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={onClose}
    >
      <div
        style={{ background: T.surfaceAlt, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 640, maxHeight: "90dvh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ height: 160, background: `linear-gradient(135deg, ${T.tealPale}, #EFF7F7)`, borderRadius: "20px 20px 0 0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, position: "relative" }}>
          {l.emoji}
          <button onClick={onClose} aria-label="Schließen" style={{ position: "absolute", top: 14, right: 14, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", fontSize: 15 }}>✕</button>
          {l.source === "web" && (
            <div style={{ position: "absolute", top: 14, left: 14, background: "#5B5BD6", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 99 }}>
              WEB · {l.sourceName || "extern"}{l.demo ? " · Demo" : ""}
            </div>
          )}
        </div>
        <div style={{ padding: "24px 28px 36px" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {isWG && <span style={{ background: T.gold, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>WG-Zimmer</span>}
            <span style={{ background: T.tealPale, color: T.teal, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99 }}>📍 {l.district}</span>
          </div>
          <h2 style={{ margin: "0 0 6px", fontFamily: F.display, fontSize: 24, fontWeight: 700, color: T.ink }}>{l.title}</h2>
          <div style={{ color: T.inkLight, fontSize: 13, marginBottom: 20 }}>
            {l.floor} · {l.size} m² · frei ab {l.available}
            {isWG && l.wgTotal ? ` · ${l.wgTotal}er-WG (gesamt ${l.wgSize} m²)` : ""}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { label: "Miete", val: fmtEur(l.rent) },
              { label: "Fläche", val: `${l.size} m²` },
              { label: "€/m²", val: `${l.pricePerSqm || (l.rent && l.size ? Math.round(l.rent / l.size) : "–")} €` },
            ].map(({ label, val }) => (
              <div key={label} style={{ background: T.bg, borderRadius: 10, padding: "12px", textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: T.ink }}>{val}</div>
                <div style={{ fontSize: 11, color: T.inkFaint, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
          <p style={{ color: T.inkMid, lineHeight: 1.7, fontSize: 14, marginBottom: 20 }}>{l.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
            {(l.features || []).map((f) => (
              <span key={f} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 99, border: `1.5px solid ${T.border}`, color: T.inkMid }}>✓ {f}</span>
            ))}
          </div>
          {l.landlord && (
            <div style={{ background: T.bg, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.tealPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👤</div>
              <div>
                <div style={{ fontWeight: 600, color: T.ink, fontSize: 14 }}>
                  {l.landlord.name}
                  {l.landlord.verified && <span style={{ marginLeft: 6, color: T.green, fontSize: 11 }}>✓ verifiziert</span>}
                </div>
                <div style={{ fontSize: 12, color: T.inkLight, marginTop: 2 }}>{l.applicants} Anfragen · {l.posted}</div>
              </div>
            </div>
          )}
          {webMode ? (
            <div style={{ textAlign: "center", padding: "13px", background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 12, color: T.inkLight, fontSize: 13 }}>
              Demo-Inserat — in der Vollversion führt dieser Button zur Original-Quelle.
            </div>
          ) : hasApplied ? (
            <div style={{ textAlign: "center", padding: 14, background: T.greenPale, border: `1.5px solid ${T.green}`, borderRadius: 12, color: T.green, fontWeight: 700 }}>
              ✓ Anfrage bereits gesendet
            </div>
          ) : (
            <button onClick={() => onApply(l)} style={btnPrimary()}>Anfrage schicken →</button>
          )}
        </div>
      </div>
    </div>
  );
}
