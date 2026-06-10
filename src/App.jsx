import { useState } from "react";
import { T, F, btnPrimary } from "./theme.js";
import { STATIC_LISTINGS, TYPES } from "./data/listings.js";
import Onboarding from "./components/Onboarding.jsx";
import ListingCard from "./components/ListingCard.jsx";
import DetailModal from "./components/DetailModal.jsx";
import ApplyModal from "./components/ApplyModal.jsx";
import AddListingModal from "./components/AddListingModal.jsx";
import WebSearchTab from "./components/WebSearchTab.jsx";
import CommunityChat from "./components/CommunityChat.jsx";
import ProfileView from "./components/ProfileView.jsx";
import ShareSheet from "./components/ShareSheet.jsx";

const NAV = [
  { id: "listings", label: "Inserate",  icon: "🏠" },
  { id: "web",      label: "Im Web",    icon: "🔍" },
  { id: "chat",     label: "Community", icon: "💬" },
  { id: "profile",  label: "Profil",    icon: "👤" },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("listings");
  const [listings, setListings] = useState(STATIC_LISTINGS);
  const [typeFilter, setTypeFilter] = useState("Alle");
  const [detail, setDetail] = useState(null);
  const [applying, setApplying] = useState(null);
  const [applications, setApplications] = useState([]);
  const [showShare, setShowShare] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  if (!user) return <Onboarding onDone={setUser} />;

  const filtered = listings.filter((l) => typeFilter === "Alle" || l.type === typeFilter);
  const hasApplied = (l) => applications.some((a) => a.id === l.id);

  return (
    <div style={{ background: T.bg, minHeight: "100dvh", fontFamily: F.body }}>
      <header style={{ background: T.surfaceAlt, borderBottom: `1px solid ${T.border}`, padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontFamily: F.display, fontSize: 26, fontWeight: 700, color: T.ink, letterSpacing: "-0.5px" }}>
          Peak<span style={{ color: T.teal }}>Flats</span>
          <span style={{ fontSize: 11, color: T.inkFaint, fontFamily: F.body, fontWeight: 400, marginLeft: 8, letterSpacing: "0.5px" }}>München</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {user.role === "landlord" && (
            <button onClick={() => setShowAdd(true)} style={{ ...btnPrimary(), padding: "8px 14px", fontSize: 13, width: "auto" }}>+ Inserieren</button>
          )}
          <button
            onClick={() => setShowShare(true)}
            aria-label="App teilen"
            style={{ background: T.whatsapp, color: "#fff", border: "none", borderRadius: 9, padding: "8px 13px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F.body }}
          >
            💬 Teilen
          </button>
        </div>
      </header>

      {tab === "listings" && (
        <>
          <div style={{ background: T.surfaceAlt, borderBottom: `1px solid ${T.border}`, padding: "28px 20px 22px" }}>
            <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
              <div style={{ display: "inline-block", background: T.tealPale, color: T.teal, fontSize: 11, fontWeight: 600, padding: "4px 14px", borderRadius: 99, marginBottom: 16, letterSpacing: "1px", textTransform: "uppercase" }}>
                München · Altbau · Parkett · Innenstadtlagen
              </div>
              <h1 style={{ fontFamily: F.display, fontSize: "clamp(26px, 5vw, 42px)", fontWeight: 700, color: T.ink, margin: "0 0 10px", letterSpacing: "-1px", lineHeight: 1.15 }}>
                Wohnungen, die man<br />wirklich haben möchte.
              </h1>
              <p style={{ color: T.inkLight, fontSize: 15, margin: "0 auto", lineHeight: 1.6, maxWidth: 420 }}>
                WG-Zimmer ab 800 € · 1-Zimmer ab 1.100 € · 2-Zimmer ab 1.300 €<br />
                Nur Altbau, echtes Parkett, beste Münchner Lagen.
              </p>
            </div>
          </div>

          <div style={{ background: T.surfaceAlt, borderBottom: `1px solid ${T.border}`, padding: "12px 20px", overflowX: "auto" }}>
            <div style={{ display: "flex", gap: 7, flexWrap: "nowrap" }}>
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  style={{ padding: "6px 14px", borderRadius: 99, fontSize: 13, whiteSpace: "nowrap", border: `1.5px solid ${typeFilter === t ? T.teal : T.border}`, background: typeFilter === t ? T.teal : T.surfaceAlt, color: typeFilter === t ? "#fff" : T.inkLight, cursor: "pointer", fontFamily: F.body }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 40px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
              {filtered.map((l) => <ListingCard key={l.id} l={l} onClick={setDetail} />)}
              {filtered.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 60, color: T.inkLight }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                  Keine Inserate für diesen Filter.
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {tab === "web" && <WebSearchTab />}
      {tab === "chat" && <CommunityChat user={user} />}
      {tab === "profile" && <ProfileView user={user} applications={applications} onBack={() => setTab("listings")} />}

      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: T.surfaceAlt, borderTop: `1px solid ${T.border}`, display: "flex", height: 58, zIndex: 100, paddingBottom: "env(safe-area-inset-bottom)" }}>
        {NAV.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, color: tab === id ? T.teal : T.inkFaint, fontFamily: F.body, borderTop: `2px solid ${tab === id ? T.teal : "transparent"}` }}
          >
            <span style={{ fontSize: 18 }}>{icon}</span>
            <span style={{ fontSize: 10, fontWeight: tab === id ? 700 : 400 }}>{label}</span>
          </button>
        ))}
      </nav>
      <div style={{ height: 58 }} />

      {detail && !applying && (
        <DetailModal
          l={detail}
          onClose={() => setDetail(null)}
          hasApplied={hasApplied(detail)}
          onApply={(l) => { setDetail(null); setApplying(l); }}
        />
      )}
      {applying && (
        <ApplyModal
          l={applying}
          user={user}
          onClose={() => setApplying(null)}
          onDone={() => { setApplications((p) => [...p, applying]); setApplying(null); }}
        />
      )}
      {showShare && <ShareSheet onClose={() => setShowShare(false)} />}
      {showAdd && (
        <AddListingModal
          user={user}
          onClose={() => setShowAdd(false)}
          onAdd={(l) => { setListings((p) => [l, ...p]); setShowAdd(false); }}
        />
      )}
    </div>
  );
}
