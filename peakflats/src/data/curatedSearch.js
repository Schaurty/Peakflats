// ─── Kuratierte Web-Suche (Demo-Generator) ────────────────────────────────────
// Wichtig: Die ursprüngliche Version rief die Anthropic-API direkt aus dem
// Browser auf. Das funktioniert nur innerhalb von Claude.ai-Artifacts —
// auf Vercel scheitert jeder Aufruf (kein API-Key, CORS), und ein Key im
// Frontend wäre öffentlich einsehbar. Diese Demo generiert die Treffer
// deshalb lokal und kennzeichnet sie als Beispieldaten. Für echte Treffer
// braucht es später ein kleines Backend (siehe README).

import { PRICE_RULES } from "./listings.js";

const DISTRICTS = [
  "Maxvorstadt", "Schwabing", "Isarvorstadt", "Glockenbachviertel",
  "Haidhausen", "Au", "Lehel", "Altstadt", "Bogenhausen", "Neuhausen", "Sendling",
];

const FLOORS = ["EG (Hochparterre)", "1. OG", "2. OG", "3. OG", "4. OG", "DG"];
const EMOJIS = ["🏛️", "🌿", "✨", "🎨", "☀️", "🌸"];
const SOURCES = ["ImmobilienScout24", "WG-Gesucht", "Immowelt"];
const AVAILABLE = ["sofort", "01.08.2026", "15.08.2026", "01.09.2026", "15.09.2026"];
const POSTED = ["heute", "vor 1 Tag", "vor 2 Tagen"];

const FLOORS_WOOD = ["Fischgrätparkett", "Chevron-Parkett", "Dielenboden", "Stabparkett"];
const ERA = ["Altbau 1900", "Altbau 1905", "Altbau 1908", "Gründerzeit 1895", "Jugendstil 1910", "Altbau 1920er"];
const EXTRAS = ["Stuck", "Balkon", "Einbauküche", "Badewanne", "hohe Decken", "ruhige Hofseite", "Sprossenfenster", "Südseite", "Keller"];

const TITLES = {
  "WG-Zimmer": ["Helles WG-Zimmer im Altbau", "WG-Zimmer mit Parkett & Stuck", "Charmantes Zimmer in 3er-WG", "Großes WG-Zimmer, Altbau-Charme"],
  "1-Zimmer":  ["1-Zimmer-Apartment im Altbau", "Helles Apartment mit Parkett", "Charmantes 1-Zimmer-Apartment"],
  "2-Zimmer":  ["Stilvolle 2-Zimmer-Altbauwohnung", "2 Zimmer mit Parkett & Balkon", "Elegante 2-Zimmer-Wohnung"],
  "3-Zimmer":  ["Großzügige 3-Zimmer-Altbauwohnung", "Gründerzeit-Wohnung mit Stuck", "Repräsentative 3-Zimmer-Wohnung"],
  "Loft":      ["Loft im Gründerzeithaus", "Offenes Altbau-Loft", "Loft mit Industriecharme"],
};

const DESCRIPTIONS = {
  "WG-Zimmer": (d, f) => `Schönes Zimmer in gepflegter WG in ${d}. ${f[0]}, ${f[1]}, entspannte Mitbewohner. Gute Anbindung, alles Wichtige fußläufig.`,
  "1-Zimmer":  (d, f) => `Charmantes Apartment in ${d}. ${f[0]} in warmem Ton, dazu ${f[2]}. Gepflegtes Haus, ideal für den Start in München.`,
  "2-Zimmer":  (d, f) => `Elegante Wohnung in ${d}. Durchgehend ${f[0]}, dazu ${f[2]}. Helle Räume mit hohen Decken, sehr gute Lage.`,
  "3-Zimmer":  (d, f) => `Großzügige Wohnung in ${d}. ${f[0]}, dazu ${f[2]}. Viel Platz und Altbau-Atmosphäre — eine Rarität in dieser Lage.`,
  "Loft":      (d, f) => `Offen geschnittenes Loft in ${d}. ${f[0]}, hohe Decken, besonderes Raumgefühl. Selten auf dem Markt.`,
};

// Einfacher, gut verteilter Pseudozufall (damit jede Suche frisch wirkt)
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const between = (r, min, max) => min + r() * (max - min);

function makeListing(r, type, maxRent, idx) {
  const rule = PRICE_RULES[type];

  // Größe und Miete so wählen, dass alle Kurationsregeln eingehalten werden
  const size = Math.round(between(r, rule.minSize, rule.minSize * (type === "WG-Zimmer" ? 1.8 : 1.5)));
  const rentCeiling = Math.min(maxRent, Math.floor(size * rule.maxRentPerSqm));
  if (rentCeiling < rule.minRent) return null; // Budget zu niedrig für diesen Typ
  const rent = Math.round(between(r, rule.minRent, rentCeiling) / 10) * 10;

  const district = pick(r, DISTRICTS);
  const wood = pick(r, FLOORS_WOOD);
  const era = pick(r, ERA);
  const extras = [...EXTRAS].sort(() => r() - 0.5).slice(0, 3);
  const features = [wood, era, ...extras];
  const isWG = type === "WG-Zimmer";

  return {
    id: Date.now() + idx,
    source: "web",
    sourceName: pick(r, SOURCES),
    emoji: EMOJIS[idx % EMOJIS.length],
    title: `${pick(r, TITLES[type])} – ${district}`,
    city: "München",
    district,
    rent,
    size,
    rooms: type === "3-Zimmer" ? 3 : type === "2-Zimmer" ? 2 : 1,
    type,
    floor: pick(r, FLOORS),
    available: pick(r, AVAILABLE),
    wgTotal: isWG ? (r() > 0.5 ? 3 : 2) : null,
    wgSize: isWG ? Math.round(between(r, 80, 130)) : null,
    features,
    description: DESCRIPTIONS[type](district, features),
    landlord: { name: "Externer Anbieter", verified: false },
    applicants: Math.floor(r() * 35) + 3,
    posted: pick(r, POSTED),
    pricePerSqm: Math.round(rent / size),
    demo: true,
  };
}

export function generateCuratedResults({ type = "Alle", maxRent = 2000, count = 6 }) {
  const r = rng(Date.now() % 2147483647);
  const types =
    type === "Alle"
      ? Object.keys(PRICE_RULES).filter((t) => maxRent >= PRICE_RULES[t].minRent)
      : [type];

  if (types.length === 0) return [];

  const results = [];
  let guard = 0;
  while (results.length < count && guard < count * 6) {
    guard += 1;
    const t = types[results.length % types.length];
    const l = makeListing(r, t, maxRent, results.length);
    if (l && l.rent <= maxRent) results.push(l);
  }
  return results;
}
