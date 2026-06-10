import { useState } from "react";
import { T, F, inpStyle, btnPrimary, sleep } from "../theme.js";

const MIN_AGE = 18;
const MAX_AGE = 26;

export function calcAge(dobString, now = new Date()) {
  const birth = new Date(dobString);
  if (Number.isNaN(birth.getTime())) return null;
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
}

export default function IDVerification({ onVerified }) {
  const [step, setStep] = useState("intro");
  const [dob, setDob] = useState("");
  const [scanning, setScanning] = useState(false);

  const simulateScan = async (side) => {
    setScanning(true);
    await sleep(1800);
    setScanning(false);
    setStep(side === "front" ? "back" : "dob");
  };

  const checkAge = async () => {
    setStep("checking");
    await sleep(1200);
    const age = dob ? calcAge(dob) : null;
    if (age === null || age < MIN_AGE || age > MAX_AGE) {
      setStep("fail");
    } else {
      setStep("done");
      setTimeout(onVerified, 1500);
    }
  };

  const wrap = (children) => (
    <div style={{ minHeight: "100dvh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400, background: T.surfaceAlt, borderRadius: 20, padding: "36px 32px", border: `1px solid ${T.border}`, boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
        {children}
      </div>
    </div>
  );

  const tag = (
    <div style={{ fontSize: 11, fontWeight: 600, color: T.teal, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 20 }}>
      Altersverifikation
    </div>
  );

  const scanBox = (label, emoji) => (
    <div style={{ border: `2px dashed ${T.borderStrong}`, borderRadius: 16, height: 170, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: T.bg, marginBottom: 24, gap: 10 }}>
      {scanning ? (
        <>
          <div style={{ fontSize: 32 }}>⏳</div>
          <div style={{ color: T.teal, fontSize: 14, fontWeight: 600 }}>Wird verarbeitet…</div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 40 }}>{emoji}</div>
          <div style={{ color: T.inkLight, fontSize: 13 }}>{label}</div>
        </>
      )}
    </div>
  );

  if (step === "intro") return wrap(
    <>
      {tag}
      <h2 style={{ fontFamily: F.display, fontSize: 28, fontWeight: 700, color: T.ink, margin: "0 0 14px" }}>Ausweis scannen</h2>
      <p style={{ color: T.inkMid, lineHeight: 1.7, fontSize: 14, marginBottom: 18 }}>
        PeakFlats ist ausschließlich für Personen zwischen <strong>18 und 26 Jahren</strong>. Bitte scanne kurz deinen Personalausweis oder Reisepass.
      </p>
      <div style={{ background: T.tealPale, border: `1px solid ${T.teal}30`, borderRadius: 12, padding: "14px 18px", marginBottom: 28 }}>
        <div style={{ fontSize: 13, color: T.teal, fontWeight: 600, marginBottom: 6 }}>🔒 Hinweis (Demo)</div>
        <p style={{ fontSize: 13, color: T.inkMid, margin: 0, lineHeight: 1.6 }}>
          Dies ist eine Demo: Es wird <strong>kein Foto aufgenommen, gespeichert oder übertragen</strong>. Die Altersprüfung erfolgt allein über dein eingegebenes Geburtsdatum, direkt auf deinem Gerät.
        </p>
      </div>
      <button onClick={() => setStep("front")} style={btnPrimary()}>Weiter zur Verifikation →</button>
    </>
  );

  if (step === "front") return wrap(
    <>
      {tag}
      <h2 style={{ fontFamily: F.display, fontSize: 26, fontWeight: 700, color: T.ink, margin: "0 0 10px" }}>Vorderseite scannen</h2>
      <p style={{ color: T.inkLight, fontSize: 14, marginBottom: 24 }}>Halte die Vorderseite deines Ausweises gut lesbar vor die Kamera.</p>
      {scanBox("Vorderseite Personalausweis / Pass", "🪪")}
      <button onClick={() => simulateScan("front")} disabled={scanning} style={btnPrimary(scanning)}>
        {scanning ? "Wird verarbeitet…" : "Foto aufnehmen"}
      </button>
    </>
  );

  if (step === "back") return wrap(
    <>
      {tag}
      <div style={{ color: T.green, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>✓ Vorderseite erfolgreich gescannt</div>
      <h2 style={{ fontFamily: F.display, fontSize: 26, fontWeight: 700, color: T.ink, margin: "0 0 10px" }}>Rückseite scannen</h2>
      <p style={{ color: T.inkLight, fontSize: 14, marginBottom: 24 }}>Drehe den Ausweis um und fotografiere die Rückseite.</p>
      {scanBox("Rückseite Personalausweis / Pass", "🪪")}
      <button onClick={() => simulateScan("back")} disabled={scanning} style={btnPrimary(scanning)}>
        {scanning ? "Wird verarbeitet…" : "Foto aufnehmen"}
      </button>
    </>
  );

  if (step === "dob") return wrap(
    <>
      {tag}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <span style={{ color: T.green, fontSize: 13, fontWeight: 600 }}>✓ Vorderseite</span>
        <span style={{ color: T.inkFaint }}>·</span>
        <span style={{ color: T.green, fontSize: 13, fontWeight: 600 }}>✓ Rückseite</span>
      </div>
      <h2 style={{ fontFamily: F.display, fontSize: 26, fontWeight: 700, color: T.ink, margin: "0 0 10px" }}>Geburtsdatum bestätigen</h2>
      <p style={{ color: T.inkLight, fontSize: 14, marginBottom: 20 }}>Bitte gib dein Geburtsdatum zur finalen Bestätigung ein.</p>
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
        style={{ ...inpStyle, marginBottom: 20 }}
      />
      <button onClick={checkAge} disabled={!dob} style={btnPrimary(!dob)}>Alter prüfen →</button>
    </>
  );

  if (step === "checking") return wrap(
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
      <h2 style={{ fontFamily: F.display, fontSize: 24, color: T.ink }}>Wird geprüft…</h2>
    </div>
  );

  if (step === "done") return wrap(
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ width: 70, height: 70, borderRadius: "50%", background: T.greenPale, border: `2px solid ${T.green}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 20px" }}>✓</div>
      <h2 style={{ fontFamily: F.display, fontSize: 26, color: T.ink, margin: "0 0 10px" }}>Verifiziert!</h2>
      <p style={{ color: T.inkLight, fontSize: 14 }}>Alter bestätigt. Es wurden keine Daten gespeichert oder übertragen.</p>
    </div>
  );

  // step === "fail"
  return wrap(
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>🚫</div>
      <h2 style={{ fontFamily: F.display, fontSize: 24, color: T.ink, margin: "0 0 12px" }}>Zugang nicht möglich</h2>
      <p style={{ color: T.inkLight, lineHeight: 1.6, marginBottom: 20 }}>
        PeakFlats ist ausschließlich für Personen zwischen <strong>18 und 26 Jahren</strong>.
      </p>
      <div style={{ background: T.redPale, border: `1px solid ${T.red}30`, borderRadius: 12, padding: "14px 18px", marginBottom: 24 }}>
        <p style={{ margin: 0, fontSize: 13, color: T.red }}>Es wurden keine Daten gespeichert.</p>
      </div>
      <button onClick={() => setStep("intro")} style={btnPrimary()}>Zurück</button>
    </div>
  );
}
