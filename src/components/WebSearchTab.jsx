import { useState } from "react";
import { T, F, inpStyle, btnPrimary, sleep } from "../theme.js";
import { TYPES } from "../data/listings.js";
import { generateCuratedResults } from "../data/curatedSearch.js";
import ListingCard from "./ListingCard.jsx";
import DetailModal from "./DetailModal.jsx";

export default function WebSearchTab() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [typeQ, setTypeQ] = useState("Alle");
  const [maxRent, setMaxRent] = useState("2000");
  const [detail, setDetail] = useState(null);

  const doSearch = async () => {
    setLoading(true);
    setResults([]);
    setSearched(true);
    await sleep(1400); // kurze, ehrliche Lade-Animation
    setResults(generateCuratedResults({ type: typeQ, maxRent: parseInt(maxRent, 10), count: 6 }));
    setLoading(false);
  };

  return (
    <div>
      <div style={{ background: T.surfaceAlt, borderBottom: `1px solid ${T.border}`, padding: "20px 20px 16px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 600, color: T.ink, marginBottom: 4 }}>Im Web gefunden</div>
          <p style={{ color: T.inkLight, fontSize: 13, marginBottom: 16 }}>
            Nur Altbau mit Parkett in Münchner Innenstadtlagen — wir filtern den Rest raus.
            <span style={{ color: T.inkFaint }}> (Demo: Beispieldaten)</span>
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <select value={typeQ} onChange={(e) => setTypeQ(e.target.value)} style={{ ...inpStyle, flex: 1, minWidth: 140 }}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select value={maxRent} onChange={(e) => setMaxRent(e.target.value)} style={{ ...inpStyle, flex: 1, minWidth: 140 }}>
              <option value="1000">bis 1.000 €</option>
              <option value="1500">bis 1.500 €</option>
              <option value="2000">bis 2.000 €</option>
              <option value="2500">bis 2.500 €</option>
              <option value="3500">bis 3.500 €</option>
            </select>
            <button onClick={doSearch} disabled={loading} style={{ ...btnPrimary(loading), flex: "0 0 auto", width: "auto", padding: "11px 22px" }}>
              {loading ? "Suche…" : "Suchen"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 40px" }}>
        {!searched && !loading && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>🔍</div>
            <div style={{ fontFamily: F.display, fontSize: 20, color: T.ink, marginBottom: 8 }}>Kuratiert suchen</div>
            <p style={{ color: T.inkLight, fontSize: 14 }}>Typ und Budget wählen — nur Altbau mit Parkett in besten Münchner Lagen.</p>
          </div>
        )}

        {loading && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>⏳</div>
            <div style={{ fontFamily: F.display, fontSize: 20, color: T.ink, marginBottom: 8 }}>Stelle kuratierte Auswahl zusammen…</div>
            <p style={{ color: T.inkLight, fontSize: 13 }}>Filtere nach Altbau, Parkett, Innenstadtlagen.</p>
          </div>
        )}

        {!loading && searched && results.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontFamily: F.display, fontSize: 18, color: T.ink }}>{results.length} Treffer in München</div>
              <span style={{ fontSize: 12, color: T.inkLight }}>Nur Altbau · Parkett · Innenstadt</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
              {results.map((l) => <ListingCard key={l.id} l={l} onClick={setDetail} />)}
            </div>
          </>
        )}

        {!loading && searched && results.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: T.inkLight }}>
            Für dieses Budget gibt es in dieser Kategorie keine kuratierten Treffer. Versuch ein höheres Budget oder einen anderen Typ.
          </div>
        )}
      </div>

      {detail && <DetailModal l={detail} onClose={() => setDetail(null)} webMode />}
    </div>
  );
}
