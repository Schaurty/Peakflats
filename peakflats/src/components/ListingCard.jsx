import { useState } from "react";
import { T, F, fmtEur } from "../theme.js";

export default function ListingCard({ l, onClick }) {
  const [hov, setHov] = useState(false);
  const isWG = l.type === "WG-Zimmer";
  return (
    <div
      onClick={() => onClick(l)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.surfaceAlt,
        border: `1.5px solid ${hov ? T.teal : T.border}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.18s",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? "0 8px 28px rgba(27,107,107,0.10)" : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ height: 130, background: `linear-gradient(135deg, ${T.tealPale} 0%, #EFF7F7 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, position: "relative" }}>
        {l.emoji}
        <div style={{ position: "absolute", top: 10, left: 12, display: "flex", gap: 6 }}>
          {l.posted === "heute" && <span style={{ background: T.teal, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 99 }}>NEU</span>}
          {isWG && <span style={{ background: T.gold, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 99 }}>WG</span>}
          {l.source === "web" && <span style={{ background: "#5B5BD6", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 99 }}>WEB</span>}
        </div>
        <span style={{ position: "absolute", top: 10, right: 12, background: "rgba(255,255,255,0.9)", color: T.inkLight, fontSize: 11, padding: "3px 9px", borderRadius: 99 }}>
          {l.applicants} Anfragen
        </span>
      </div>
      <div style={{ padding: "16px 18px 20px" }}>
        <h3 style={{ margin: "0 0 4px", fontFamily: F.display, fontSize: 17, fontWeight: 600, color: T.ink, lineHeight: 1.3 }}>{l.title}</h3>
        <div style={{ fontSize: 12, color: T.inkLight, marginBottom: 10 }}>
          📍 {l.district} · {l.floor} · {l.size} m²
          {isWG && l.wgTotal ? <span style={{ marginLeft: 6, color: T.teal }}>· {l.wgTotal}er-WG</span> : null}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
          {(l.features || []).slice(0, 3).map((f) => (
            <span key={f} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 99, background: T.bg, color: T.inkLight, border: `1px solid ${T.border}` }}>{f}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, color: T.ink }}>{fmtEur(l.rent)}</span>
            <span style={{ fontSize: 12, color: T.inkLight }}>/Mo</span>
          </div>
          <span style={{ fontSize: 11, color: T.inkFaint }}>
            {l.pricePerSqm || (l.rent && l.size ? Math.round(l.rent / l.size) : "–")} €/m²
          </span>
        </div>
      </div>
    </div>
  );
}
