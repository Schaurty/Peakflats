# 🏠 PeakFlats

Kuratierte Altbau-Wohnungen & WG-Zimmer in München für 18–26-Jährige.
Fischgrätparkett, Innenstadtlagen, faire Preise.

**Tech:** React 18 + Vite 5 · keine weiteren Abhängigkeiten · kein Backend nötig.

---

## 🚀 Deployment: GitHub → Vercel (Schritt für Schritt)

### 1. Repository auf GitHub anlegen

> ⚠️ **Häufigster Fehler:** Die Projektdateien müssen **direkt im Repo-Root** liegen.
> `package.json` muss auf der obersten Ebene sichtbar sein — **nicht** in einem
> Unterordner wie `peakflats/`. Wenn du den Ordner als Ganzes hochlädst und auf
> GitHub zuerst einen Ordner statt der Dateien siehst, findet Vercel die
> `package.json` nicht und der Build schlägt fehl.

Per Kommandozeile (im entpackten Projektordner):

```bash
git init
git add .
git commit -m "PeakFlats v2"
git branch -M main
git remote add origin https://github.com/DEIN-NUTZERNAME/peakflats.git
git push -u origin main
```

Oder über die GitHub-Website: Neues Repo erstellen → „uploading an existing file" →
**alle Dateien und Ordner aus dem Projektordner** (nicht den Ordner selbst) ins
Fenster ziehen → committen.

### 2. Auf Vercel deployen

1. [vercel.com](https://vercel.com) → mit GitHub anmelden
2. **Add New… → Project** → dein `peakflats`-Repo importieren
3. Vercel erkennt Vite automatisch (Framework Preset: **Vite**). Nichts ändern:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - **Root Directory:** nur anpassen, falls die Dateien doch in einem Unterordner liegen
4. **Deploy** klicken → nach ~1 Minute bekommst du eine URL wie
   `https://peakflats-xyz.vercel.app`

### 3. Per WhatsApp teilen

Zwei Wege:

- **In der App:** oben rechts auf **💬 Teilen** → „Per WhatsApp teilen".
  Der Link zeigt automatisch auf deine echte Deployment-URL.
- **Manuell:** Deine Vercel-URL einfach in einen WhatsApp-Chat einfügen.
  Dank der Open-Graph-Tags in `index.html` erscheint eine Link-Vorschau
  mit Titel und Beschreibung.

### Lokal testen (optional)

```bash
npm install
npm run dev        # Entwicklung: http://localhost:5173
npm run build      # Produktions-Build nach dist/
npm run preview    # Produktions-Build lokal ansehen
```

---

## 📦 Was ist drin?

- **Onboarding** mit Rollenwahl (Suchende:r / Vermieter:in) und Altersverifikation (18–26, Demo)
- **Kuratierte Inserate**: nur Altbau, Parkett, Münchner Innenstadtlagen, mit Preis-Leistungs-Regeln
- **Inserieren** (für Vermieter:innen) mit automatischer Validierung von Lage, Größe und Preis
- **„Im Web gefunden"**: kuratierte Beispiel-Treffer (Demo-Daten, siehe unten)
- **Community-Chat** (lokal, Demo)
- **WhatsApp-Sharing** mit Link-Vorschau

## ⚠️ Warum die Web-Suche jetzt Demo-Daten zeigt

Die Vorversion rief die Anthropic-API **direkt aus dem Browser** auf. Das
funktioniert nur innerhalb von Claude.ai — auf Vercel scheitert jeder Aufruf
(kein API-Key, CORS-Sperre). Einen API-Key ins Frontend zu legen ist keine
Lösung: Er wäre für jeden Besucher im Quelltext sichtbar.

Diese Version generiert die Treffer deshalb **lokal** (klar als Demo
gekennzeichnet) und läuft damit überall ohne Konfiguration. Für echte
Live-Daten bräuchte es später ein kleines Backend (z. B. eine Vercel
Serverless Function), das den API-Key sicher serverseitig hält — das lässt
sich in `src/components/WebSearchTab.jsx` an einer Stelle austauschen.

## 📁 Struktur

```
index.html               – Einstieg, Fonts, Open-Graph-Tags für WhatsApp
vercel.json              – SPA-Rewrites & Build-Konfiguration für Vercel
src/
  main.jsx               – React-Einstieg mit ErrorBoundary
  App.jsx                – Navigation & Haupt-Layout
  theme.js               – Design-Tokens, geteilte Styles, Helfer
  data/
    listings.js          – Inserate, Lagen, Preisregeln, Validierung
    curatedSearch.js     – Demo-Generator für die Web-Suche
  components/            – Alle UI-Komponenten, je eine Datei
```
