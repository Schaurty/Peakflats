import { useState } from "react";
import { T, F, inpStyle, labelStyle, btnPrimary } from "../theme.js";
import { PRICE_RULES, validateListing } from "../data/listings.js";

const EMOJIS = ["🏡", "🌿", "✨", "🎨", "☀️", "🏛️", "🌸"];

export default function AddListingModal({ user, onClose, onAdd }) {
  const [form, setForm] = useState({
    title: "", district: "", rent: "", size: "", type: "2-Zimmer",
    floor: "", available: "", features: "", description: "",
  });
  const [errors, setErrors] = useState([]);
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const requiredFilled = form.title.trim() && form.district.trim() && form.rent && form.size;

  const tryAdd = () => {
    const rent = parseInt(form.rent, 10) || 0;
    const size = parseInt(form.size, 10) || 0;
    const errs = validateListing({ ...form, rent, size, city: "München" });
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    const rooms = form.type === "3-Zimmer" ? 3 : form.type === "2-Zimmer" ? 2 : 1;
    onAdd({
      id: Date.now(),
      source: "peakflats",
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      title: form.title.trim(),
      city: "München",
      district: form.district.trim(),
      rent,
      size,
      rooms,
      type: form.type,
      floor: form.floor.trim() || "k. A.",
      available: form.available || "nach Absprache",
      features: form.features.split(",").map((s) => s.trim()).filter(Boolean),
      description: form.description.trim(),
      landlord: { name: user.name, verified: false },
      applicants: 0,
      posted: "heute",
      pricePerSqm: Math.round(rent / size),
    });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: T.surfaceAlt, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 640, maxHeight: "92dvh", overflowY: "auto", padding: "28px 28px 48px" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <h3 style={{ margin: 0, fontFamily: F.display, fontSize: 22, fontWeight: 700, color: T.ink }}>Wohnung inserieren</h3>
          <button onClick={onClose} aria-label="Schließen" style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: T.inkLight }}>✕</button>
        </div>

        <div style={{ background: T.tealPale, border: `1px solid ${T.teal}40`, borderRadius: 10, padding: "10px 14px", marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: T.teal, fontWeight: 600, marginBottom: 4 }}>📍 Erlaubte Münchner Lagen</div>
          <div style={{ fontSize: 11, color: T.inkMid, lineHeight: 1.5 }}>
            Maxvorstadt · Schwabing · Isarvorstadt · Glockenbachviertel · Haidhausen · Au · Lehel · Altstadt · Bogenhausen · Neuhausen · Sendling
          </div>
        </div>

        {errors.length > 0 && (
          <div style={{ background: T.redPale, border: `1px solid ${T.red}40`, borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
            {errors.map((e, i) => (
              <div key={i} style={{ color: T.red, fontSize: 13, marginBottom: i < errors.length - 1 ? 6 : 0 }}>⚠ {e}</div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          <div>
            <label style={labelStyle}>Wohnungstyp</label>
            <select value={form.type} onChange={(e) => up("type", e.target.value)} style={inpStyle}>
              {Object.keys(PRICE_RULES).map((t) => <option key={t}>{t}</option>)}
            </select>
            {PRICE_RULES[form.type] && (
              <div style={{ fontSize: 11, color: T.inkLight, marginTop: 4 }}>
                Mindestgröße: {PRICE_RULES[form.type].minSize} m² · Mindestmiete: {PRICE_RULES[form.type].minRent} € · max. {PRICE_RULES[form.type].maxRentPerSqm} €/m²
              </div>
            )}
          </div>
          {[
            ["Titel", "title", "text", "z. B. WG-Zimmer mit Fischgrätparkett in Schwabing"],
            ["Stadtteil (nur Innenstadtlagen)", "district", "text", "z. B. Maxvorstadt"],
            ["Miete (€/Monat)", "rent", "number", ""],
            ["Größe (m²)", "size", "number", ""],
            ["Etage", "floor", "text", "z. B. 2. OG"],
            ["Verfügbar ab", "available", "date", ""],
          ].map(([lbl, key, typ, ph]) => (
            <div key={key}>
              <label style={labelStyle}>{lbl}</label>
              <input type={typ} placeholder={ph} value={form[key]} onChange={(e) => up(key, e.target.value)} style={inpStyle} />
            </div>
          ))}
          <div>
            <label style={labelStyle}>Ausstattung (kommagetrennt)</label>
            <input placeholder="Fischgrätparkett, Stuck, Altbau, Balkon…" value={form.features} onChange={(e) => up("features", e.target.value)} style={inpStyle} />
          </div>
          <div>
            <label style={labelStyle}>Beschreibung</label>
            <textarea placeholder="Beschreib die Wohnung / das Zimmer ehrlich und detailliert…" value={form.description} onChange={(e) => up("description", e.target.value)} style={{ ...inpStyle, minHeight: 90, resize: "vertical" }} />
          </div>
        </div>
        <button onClick={tryAdd} disabled={!requiredFilled} style={{ ...btnPrimary(!requiredFilled), marginTop: 20 }}>
          Wohnung veröffentlichen →
        </button>
      </div>
    </div>
  );
}
