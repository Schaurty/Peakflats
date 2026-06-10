// ─── Erlaubte Münchner Innenstadtlagen ────────────────────────────────────────
export const ALLOWED_DISTRICTS = [
  "Maxvorstadt", "Schwabing", "Schwabing-West", "Schwabing-Freimann",
  "Ludwigsvorstadt", "Isarvorstadt", "Glockenbachviertel", "Glockenbach",
  "Haidhausen", "Au", "Au-Haidhausen",
  "Altstadt", "Lehel", "Bogenhausen",
  "Neuhausen", "Nymphenburg",
  "Sendling", "Sendling-Westpark",
];

// ─── Preis-Leistungs-Regeln ───────────────────────────────────────────────────
// WG-Zimmer: min 15 m², ab 800 €   | 1-Zimmer: min 30 m², ab 1.100 €
// 2-Zimmer:  min 50 m², ab 1.300 € | 3-Zimmer: min 70 m², ab 1.700 €
export const PRICE_RULES = {
  "WG-Zimmer": { minSize: 15, minRent: 800,  maxRentPerSqm: 58 },
  "1-Zimmer":  { minSize: 30, minRent: 1100, maxRentPerSqm: 38 },
  "2-Zimmer":  { minSize: 50, minRent: 1300, maxRentPerSqm: 36 },
  "3-Zimmer":  { minSize: 70, minRent: 1700, maxRentPerSqm: 34 },
  "Loft":      { minSize: 50, minRent: 1400, maxRentPerSqm: 38 },
};

export const TYPES = ["Alle", "WG-Zimmer", "1-Zimmer", "2-Zimmer", "3-Zimmer", "Loft"];

export function validateListing(l) {
  const errors = [];
  const district = (l.district || "").trim();
  if (!district) {
    errors.push("Bitte gib einen Stadtteil an.");
  } else if (!ALLOWED_DISTRICTS.some((d) => district.toLowerCase().includes(d.toLowerCase()))) {
    errors.push(`Stadtteil „${district}“ liegt außerhalb der erlaubten Münchner Innenstadtlagen.`);
  }
  const rule = PRICE_RULES[l.type];
  if (rule) {
    if (!l.size || l.size < rule.minSize) {
      errors.push(`Mindestgröße für ${l.type} ist ${rule.minSize} m². Deine Angabe: ${l.size || 0} m².`);
    }
    if (!l.rent || l.rent < rule.minRent) {
      errors.push(`Mindestmiete für ${l.type} ist ${rule.minRent} €.`);
    }
    if (l.rent && l.size) {
      const ppm = l.rent / l.size;
      if (ppm > rule.maxRentPerSqm) {
        errors.push(`Preis-Leistung passt nicht: ${ppm.toFixed(0)} €/m² ist zu hoch für diesen Typ (max. ${rule.maxRentPerSqm} €/m²).`);
      }
    }
  }
  return errors;
}

// ─── Statische Inserate ───────────────────────────────────────────────────────
const ppm = (rent, size) => Math.round(rent / size);

export const STATIC_LISTINGS = [
  {
    id: 1, source: "peakflats", emoji: "🏛️",
    title: "Traumhaftes WG-Zimmer mit Fischgrätparkett",
    city: "München", district: "Maxvorstadt",
    rent: 890, size: 22, rooms: 1, type: "WG-Zimmer",
    floor: "3. OG", available: "01.08.2026",
    wgTotal: 3, wgSize: 120,
    features: ["Fischgrätparkett", "Stuck", "Altbau 1908", "Balkon (gemeinschaftl.)", "helle Südseite"],
    description: "Großes WG-Zimmer (22 m²) in einer eleganten 3er-WG im Gründerzeithaus. Durchgehend Original-Fischgrätparkett, 3,20 m Deckenhöhe, Stuckverzierungen. Mitbewohner: zwei Masterstudenten, ruhig, ordentlich. Küche und Bad frisch renoviert.",
    landlord: { name: "Mia K.", age: 24, verified: true },
    applicants: 18, posted: "heute",
    pricePerSqm: ppm(890, 22),
  },
  {
    id: 2, source: "peakflats", emoji: "🌿",
    title: "WG-Zimmer Glockenbachviertel – stylisch & zentral",
    city: "München", district: "Glockenbachviertel",
    rent: 950, size: 20, rooms: 1, type: "WG-Zimmer",
    floor: "2. OG", available: "15.07.2026",
    wgTotal: 2, wgSize: 85,
    features: ["Dielenboden", "Altbau", "Einbauküche", "ruhige Hofseite", "Stuck"],
    description: "Helles 20-m²-Zimmer in einer gepflegten 2er-WG direkt im Glockenbachviertel. Breiter alter Dielenboden, hohe Decken. Mitbewohnerin: Grafikdesignerin, 25, unkompliziert. Alles zu Fuß erreichbar.",
    landlord: { name: "Sophie R.", age: 25, verified: true },
    applicants: 24, posted: "vor 1 Tag",
    pricePerSqm: ppm(950, 20),
  },
  {
    id: 3, source: "peakflats", emoji: "✨",
    title: "WG-Zimmer Haidhausen – großzügig & hell",
    city: "München", district: "Haidhausen",
    rent: 850, size: 18, rooms: 1, type: "WG-Zimmer",
    floor: "1. OG", available: "sofort",
    wgTotal: 3, wgSize: 105,
    features: ["Parkettboden", "Altbau 1920er", "Balkon", "Einbauküche", "Keller"],
    description: "Gemütliches Zimmer in einer entspannten 3er-WG in Haidhausen. Parkettboden durchgehend, Südbalkon, große Gemeinschaftsküche. S-Bahn Rosenheimer Platz 5 Minuten zu Fuß.",
    landlord: { name: "Jonas B.", age: 26, verified: true },
    applicants: 11, posted: "vor 2 Tagen",
    pricePerSqm: ppm(850, 18),
  },
  {
    id: 4, source: "peakflats", emoji: "☀️",
    title: "1-Zimmer-Apartment Schwabing – Altbau pur",
    city: "München", district: "Schwabing",
    rent: 1350, size: 42, rooms: 1, type: "1-Zimmer",
    floor: "2. OG", available: "01.08.2026",
    features: ["Fischgrätparkett", "Stuck", "Altbau 1912", "Einbauküche", "ruhige Lage"],
    description: "Wunderschönes 1-Zimmer-Apartment im Schwabinger Altbau. Original Fischgrätparkett, hohe Stuckdecken, große Sprossenfenster. Ruhige Seitenstraße, alles fußläufig.",
    landlord: { name: "Thomas K.", age: 38, verified: true },
    applicants: 29, posted: "vor 3 Tagen",
    pricePerSqm: ppm(1350, 42),
  },
  {
    id: 5, source: "peakflats", emoji: "🏠",
    title: "Stilvolle 2-Zimmer-Wohnung Isarvorstadt",
    city: "München", district: "Isarvorstadt",
    rent: 1680, size: 65, rooms: 2, type: "2-Zimmer",
    floor: "3. OG", available: "15.08.2026",
    features: ["Chevron-Parkett", "Stuck", "Altbau", "Süd-Balkon", "Badewanne"],
    description: "Traumhafte 2-Zimmer-Wohnung in der Isarvorstadt. Durchgehend Chevron-Parkett, Stuck an Decke und Wänden, sonniger Südbalkon. Perfekte Lage zwischen Isar und Sendlinger Tor.",
    landlord: { name: "Clara M.", age: 31, verified: true },
    applicants: 34, posted: "heute",
    pricePerSqm: ppm(1680, 65),
  },
  {
    id: 6, source: "peakflats", emoji: "🌟",
    title: "Gründerzeit-Wohnung Maxvorstadt",
    city: "München", district: "Maxvorstadt",
    rent: 2100, size: 88, rooms: 3, type: "3-Zimmer",
    floor: "4. OG", available: "01.09.2026",
    features: ["Fischgrätparkett", "Stuck", "Altbau 1905", "Einbauküche", "2 Bäder", "ruhig"],
    description: "Repräsentative 3-Zimmer-Wohnung in einem der schönsten Gründerzeithäuser der Maxvorstadt. Durchgehend Fischgrätparkett, aufwendig restaurierte Stuckelemente, zwei Bäder. Schwabinger Tor in 3 Minuten.",
    landlord: { name: "Isabelle F.", age: 44, verified: true },
    applicants: 41, posted: "vor 1 Tag",
    pricePerSqm: ppm(2100, 88),
  },
  {
    id: 7, source: "peakflats", emoji: "🎨",
    title: "Altbau-Zimmer in eleganter WG – Lehel",
    city: "München", district: "Lehel",
    rent: 1050, size: 24, rooms: 1, type: "WG-Zimmer",
    floor: "2. OG", available: "01.08.2026",
    wgTotal: 2, wgSize: 95,
    features: ["Dielenboden", "Stuck", "Altbau 1911", "Badewanne", "ruhige Lage", "Nähe Englischer Garten"],
    description: "Großzügiges Zimmer (24 m²) in einer gepflegten 2er-WG direkt im Lehel, 5 Minuten zum Englischen Garten. Breiter Dielenboden, Stuckdecke, freistehende Badewanne im Gemeinschaftsbad. Mitbewohner: Architekt, 27, ruhig.",
    landlord: { name: "Felix M.", age: 27, verified: true },
    applicants: 15, posted: "vor 4 Stunden",
    pricePerSqm: ppm(1050, 24),
  },
  {
    id: 8, source: "peakflats", emoji: "🌸",
    title: "Helles 1-Zimmer-Apartment Au-Haidhausen",
    city: "München", district: "Au-Haidhausen",
    rent: 1190, size: 38, rooms: 1, type: "1-Zimmer",
    floor: "1. OG", available: "sofort",
    features: ["Stabparkett", "Altbau", "Einbauküche", "Gartenblick", "ruhig"],
    description: "Charmantes 1-Zimmer-Apartment mit Blick in den begrünten Innenhof. Stabparkett in warmem Ton, frisch renoviertes Bad, Einbauküche. Isarnähe und ein lebendiges Viertel direkt vor der Tür.",
    landlord: { name: "Anna S.", age: 29, verified: true },
    applicants: 19, posted: "vor 2 Tagen",
    pricePerSqm: ppm(1190, 38),
  },
];

// ─── Community-Chat: Startnachrichten ─────────────────────────────────────────
export const INIT_MESSAGES = [
  { id: 1, user: "Lena M.", age: 22, city: "München", text: "Hat jemand Erfahrung mit Haidhausen? Ich überlege, ob ich dort ein WG-Zimmer nehmen soll oder lieber Schwabing.", time: "10:32", role: "tenant" },
  { id: 2, user: "Max P.", age: 24, city: "München", text: "Haidhausen ist super — junges Viertel, Isar in 5 Min, viel Leben. Schwabing ist ruhiger, aber etwas teurer für die gleiche Größe.", time: "10:45", role: "tenant" },
  { id: 3, user: "Sophie R.", age: 25, city: "München", text: "Ich vermiete gerade ein Zimmer im Glockenbach — 20 m², Dielenboden, 950 €. Hab's gerade hier inseriert!", time: "11:02", role: "landlord" },
  { id: 4, user: "Felix B.", age: 21, city: "München", text: "Tipp: morgens früh schauen! Die besten Zimmer sind oft innerhalb von Stunden weg, besonders im Lehel und Glockenbach.", time: "11:18", role: "tenant" },
  { id: 5, user: "Anna K.", age: 23, city: "München", text: "Fischgrätparkett oder Dielenboden — was findet ihr schöner für ein WG-Zimmer?", time: "11:34", role: "tenant" },
  { id: 6, user: "Tim H.", age: 26, city: "München", text: "Dielenboden hat mehr Charakter, finde ich. Fischgrät wirkt manchmal zu förmlich. Kommt aber auch auf die WG an.", time: "11:41", role: "tenant" },
];
