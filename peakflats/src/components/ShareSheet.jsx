import { useState } from "react";
import { T, F, btnPrimary } from "../theme.js";

export default function ShareSheet({ onClose }) {
  const [copied, setCopied] = useState(false);

  // Wichtig: nicht hartkodieren! So zeigt der geteilte Link immer auf die
  // tatsächliche Deployment-URL (egal ob *.vercel.app oder eigene Domain).
  const url = typeof window !== "undefined" ? window.location.origin : "";
  const text = `🏠 PeakFlats – kuratierte Altbau-Wohnungen & WG-Zimmer in München für 18–26-Jährige. Fischgrätparkett, Innenstadtlagen, ab 800 €. Schau rein: ${url}`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(text)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(onClose, 900);
    } catch {
      // Fallback für Browser ohne Clipboard-API
      window.prompt("Link kopieren:", url);
      onClose();
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ background: T.surfaceAlt, borderRadius: 20, padding: "32px 28px", maxWidth: 380, width: "100%" }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: "0 0 6px", fontFamily: F.display, fontSize: 22, fontWeight: 700, color: T.ink }}>App teilen</h3>
        <p style={{ color: T.inkLight, fontSize: 14, marginBottom: 22 }}>Teile PeakFlats mit Freunden — für Suchende und Vermieter:innen.</p>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: T.whatsapp, borderRadius: 12, textDecoration: "none", marginBottom: 10 }}
        >
          <span style={{ fontSize: 24 }}>💬</span>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Per WhatsApp teilen</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>Gruppe oder Kontakt wählen</div>
          </div>
        </a>
        <button
          onClick={copy}
          style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: T.bg, borderRadius: 12, border: `1.5px solid ${T.border}`, cursor: "pointer", width: "100%", marginBottom: 16, fontFamily: F.body }}
        >
          <span style={{ fontSize: 22 }}>🔗</span>
          <span style={{ color: copied ? T.green : T.ink, fontWeight: 600, fontSize: 14 }}>{copied ? "✓ Kopiert!" : "Link kopieren"}</span>
        </button>
        <button onClick={onClose} style={{ width: "100%", background: "none", border: "none", color: T.inkLight, fontSize: 13, cursor: "pointer", fontFamily: F.body }}>Schließen</button>
      </div>
    </div>
  );
}
