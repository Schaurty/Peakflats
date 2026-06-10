import React from "react";
import { T, F, btnPrimary } from "../theme.js";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("PeakFlats ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100dvh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: F.body }}>
          <div style={{ maxWidth: 380, width: "100%", background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 20, padding: "36px 32px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>🏚️</div>
            <h2 style={{ fontFamily: F.display, fontSize: 24, color: T.ink, margin: "0 0 10px" }}>Da ist etwas schiefgelaufen</h2>
            <p style={{ color: T.inkLight, fontSize: 14, lineHeight: 1.6, marginBottom: 22 }}>
              Bitte lade die Seite neu. Falls das Problem bleibt, melde dich gern.
            </p>
            <button onClick={() => window.location.reload()} style={btnPrimary()}>Neu laden</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
