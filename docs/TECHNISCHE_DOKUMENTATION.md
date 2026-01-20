# SchaltKraft Website - Technische Dokumentation

## Übersicht

Diese Dokumentation richtet sich an Entwickler und erklärt die gesamte Architektur, den Tech-Stack und alle wichtigen Aspekte der Website.

---

## Tech-Stack

| Komponente | Technologie | Version |
|------------|-------------|---------|
| **Framework** | Next.js (App Router) | 16.x |
| **Sprache** | TypeScript | 5.x |
| **CMS** | Keystatic | 0.5.x |
| **Styling** | Tailwind CSS | 3.x |
| **Hosting** | Netlify | - |
| **Repository** | GitHub | - |
| **Domain** | Metanet | - |
| **Content Format** | Markdoc | - |
| **Deployment** | Automatisch via Git Push | - |

---

## Architektur

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
├─────────────────────────────────────────────────────────────────┤
│  Next.js App Router                                             │
│  ├── src/app/(website)/     → Öffentliche Seiten               │
│  ├── src/app/keystatic/     → CMS Admin UI (isoliert)          │
│  ├── src/app/api/keystatic/ → CMS API Route                    │
│  └── src/components/        → React Components                  │
├─────────────────────────────────────────────────────────────────┤
│                         CMS LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│  Keystatic                                                      │
│  ├── keystatic.config.ts    → Schema-Definition                │
│  ├── content/               → JSON/Markdoc Dateien             │
│  └── src/lib/cms-server.ts  → Reader API                       │
├─────────────────────────────────────────────────────────────────┤
│                         CONTENT                                 │
├─────────────────────────────────────────────────────────────────┤
│  content/                                                       │
│  ├── global/                → Header, Footer, SEO              │
│  ├── pages/                 → Alle Unterseiten                 │
│  ├── services/              → Dienstleistungen                 │
│  ├── team/                  → Teammitglieder                   │
│  └── jobs/                  → Stellenangebote                  │
├─────────────────────────────────────────────────────────────────┤
│                         DEPLOYMENT                              │
├─────────────────────────────────────────────────────────────────┤
│  GitHub → Netlify → schaltkraft.ch                             │
│  └── Push to main → Auto Build → Auto Deploy                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Wichtige Dateien und Verzeichnisse

### Konfiguration

| Datei | Beschreibung |
|-------|-------------|
| `keystatic.config.ts` | CMS Schema (Singletons, Collections, Blocks) |
| `src/lib/markdoc.ts` | Markdoc Rendering-Konfiguration |
| `src/lib/cms-server.ts` | Keystatic Reader API Wrapper |
| `tailwind.config.ts` | Tailwind CSS Konfiguration |
| `next.config.js` | Next.js Konfiguration |
| `netlify.toml` | Netlify Build-Einstellungen (falls vorhanden) |

### Komponenten

| Verzeichnis | Inhalt |
|-------------|--------|
| `src/components/blocks/` | Page Block Komponenten (Hero, Intro, etc.) |
| `src/components/layout/` | Header, Footer, Layout Wrapper |
| `src/components/ui/` | Wiederverwendbare UI-Elemente |

### Seiten

| Verzeichnis | Route |
|-------------|-------|
| `src/app/(website)/page.tsx` | Homepage |
| `src/app/(website)/[slug]/page.tsx` | Dynamische Seiten |
| `src/app/(website)/dienstleistungen/[slug]/` | Service-Detailseiten |
| `src/app/(website)/jobs/[slug]/` | Job-Detailseiten |
| `src/app/keystatic/` | CMS Admin Interface |

---

## CMS Anpassen

### Neuen Block hinzufügen

1. **Schema in `keystatic.config.ts` definieren:**

```typescript
// In collections.pages.schema.blocks
neuBlock: {
  label: 'Neuer Block',
  description: 'Beschreibung für den Benutzer',
  schema: fields.object({
    titel: fields.text({ label: 'Titel' }),
    inhalt: fields.text({ label: 'Inhalt', multiline: true }),
  })
}
```

2. **Component erstellen:**

```tsx
// src/components/blocks/NeuBlock.tsx
export function NeuBlock({ block }: { block: any }) {
  return (
    <section className="py-16">
      <h2>{block.titel}</h2>
      <p>{block.inhalt}</p>
    </section>
  );
}
```

3. **In PageBlocks.tsx registrieren:**

```tsx
case 'neuBlock':
  return <NeuBlock key={index} block={block.value} />;
```

### Neues Feld hinzufügen

Verfügbare Field-Typen:
- `fields.text()` - Einfacher Text
- `fields.text({ multiline: true })` - Mehrzeiliger Text
- `fields.image()` - Bild-Upload
- `fields.select()` - Dropdown-Auswahl
- `fields.checkbox()` - Checkbox
- `fields.integer()` - Ganzzahl
- `fields.date()` - Datum
- `fields.url()` - URL
- `fields.markdoc()` - Rich Text Editor
- `fields.array()` - Liste von Elementen
- `fields.object()` - Gruppierte Felder

---

## Styling Ändern

### Globale Farben

In `tailwind.config.ts`:

```typescript
colors: {
  'brand-orange': '#FF6B00',
  'brand-dark': '#0A0A0A',
}
```

### Typografie

Die Schriften werden in `src/app/layout.tsx` geladen und in Tailwind als `font-heading` und `font-body` verfügbar gemacht.

### Komponenten-Styling

Alle Komponenten nutzen Tailwind CSS Klassen direkt im JSX. Keine separaten CSS-Dateien.

---

## SEO Anpassen

### Globale SEO-Defaults

In Keystatic unter "SEO Einstellungen":
- Website-Titel
- Standard-Beschreibung
- OG Image für Social Media

### Seiten-spezifisches SEO

Jede Seite hat eigene Felder:
- SEO Titel
- SEO Beschreibung

Die Metadata wird in `src/app/(website)/[slug]/page.tsx` generiert:

```typescript
export async function generateMetadata({ params }) {
  const page = await getPage(params.slug);
  return {
    title: page?.seoTitle || page?.title,
    description: page?.seoDescription,
  };
}
```

### Schema.org / Structured Data

Falls vorhanden, wird JSON-LD in den Layout-Komponenten definiert.

---

## Formulare (Netlify)

### Funktionsweise

1. HTML-Formular mit `data-netlify="true"`
2. Netlify erkennt das Formular beim Build
3. Submissions werden in Netlify Dashboard gespeichert
4. Optional: E-Mail-Benachrichtigung

### Formular anpassen

In `src/components/blocks/ContactFormBlock.tsx`:

```tsx
<form 
  name="contact" 
  method="POST" 
  data-netlify="true"
  netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contact" />
  {/* Felder hier */}
</form>
```

### E-Mail-Benachrichtigung einrichten

1. Netlify Dashboard öffnen
2. Site → Forms → Settings
3. Form notifications → Add notification
4. E-Mail eingeben

---

## Deployment

### Automatisch

Jeder Push auf `main` Branch:
1. GitHub Webhook → Netlify
2. Netlify Build (ca. 1-2 Min)
3. Deploy auf CDN

### Manuell

Im Netlify Dashboard:
- Deploys → Trigger deploy → Deploy site

### Build-Fehler beheben

1. Netlify Dashboard → Deploys
2. Failenden Build anklicken
3. Log prüfen

Häufige Probleme:
- TypeScript-Fehler → Lokal `npm run build` testen
- Fehlende Abhängigkeiten → `npm install`
- Markdoc-Syntax → Keystatic Content prüfen

---

## Lokale Entwicklung

### Setup

```bash
git clone https://github.com/infraoneit/schaltkraft-website.git
cd schaltkraft-website
npm install
npm run dev
```

### Zugänge

| Service | URL |
|---------|-----|
| Lokale Website | http://localhost:3000 |
| Lokales CMS | http://localhost:3000/keystatic |

### Commands

```bash
npm run dev      # Entwicklungsserver
npm run build    # Produktions-Build
npm run start    # Produktions-Server
npm run lint     # Code-Qualität prüfen
```

---

## Wichtige Abhängigkeiten

```json
{
  "next": "^16.x",
  "@keystatic/core": "^0.5.x",
  "@keystatic/next": "^5.x",
  "@markdoc/markdoc": "^0.4.x",
  "tailwindcss": "^3.x",
  "lucide-react": "^0.x",
  "react": "^19.x"
}
```

---

## Wartung & Updates

### Keystatic aktualisieren

```bash
npm update @keystatic/core @keystatic/next
npm run build  # Testen
git commit & push
```

### Next.js Major Update

1. Changelog lesen
2. Breaking Changes prüfen
3. In separatem Branch testen
4. Nach Merge auf main: automatisches Deploy

### Content Backup

Alle Inhalte sind in `content/` als JSON/Markdoc gespeichert.
Git-History dient als Backup. Bei Bedarf:

```bash
git log content/
git checkout <commit> -- content/  # Alte Version wiederherstellen
```

---

## Kontakt & Support

**Entwicklung:**
InfraOne IT Solutions GmbH
Rudolf-Diesel-Strasse 25
CH-8408 Winterthur

Tel: +41 52 222 18 18
E-Mail: info@infraone.ch
Web: www.infraone.ch
