// ─── Design-Tokens ────────────────────────────────────────────────────────────
export const T = {
  bg:           "#F4F2EE",
  surface:      "#FAFAF8",
  surfaceAlt:   "#FFFFFF",
  ink:          "#1A1A1A",
  inkMid:       "#4A4A4A",
  inkLight:     "#8A8A8A",
  inkFaint:     "#BCBCBC",
  teal:         "#1B6B6B",
  tealLight:    "#2A8F8F",
  tealPale:     "#E8F4F4",
  border:       "#E0DDD8",
  borderStrong: "#C8C4BE",
  red:          "#C0392B",
  redPale:      "#FEF2F2",
  green:        "#1E7A4A",
  greenPale:    "#F0FDF4",
  amber:        "#B45309",
  amberPale:    "#FFFBEB",
  gold:         "#C9A84C",
  whatsapp:     "#25D366",
};

export const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  body:    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

// ─── Geteilte Styles ──────────────────────────────────────────────────────────
export const inpStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  borderRadius: 10,
  fontSize: 14,
  fontFamily: F.body,
  border: `1.5px solid ${T.border}`,
  background: T.surfaceAlt,
  color: T.ink,
  outline: "none",
};

export const labelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  color: T.inkFaint,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  marginBottom: 5,
};

export function btnPrimary(disabled = false) {
  return {
    width: "100%",
    padding: "13px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: F.body,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    background: disabled ? T.border : T.teal,
    color: disabled ? T.inkFaint : "#fff",
    transition: "background 0.15s",
  };
}

// ─── Format-Helfer ────────────────────────────────────────────────────────────
export const fmtEur = (n) =>
  typeof n === "number" && Number.isFinite(n)
    ? n.toLocaleString("de-DE") + " €"
    : "– €";

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
