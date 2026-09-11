# Ausgetrunken — Dokumentation

Öffentliche Rechts- und Produktseiten für die Ausgetrunken-App, ausgeliefert über
GitHub Pages: **https://markono-code.github.io/Ausgetrunken-Docs/**

Ausgetrunken verbindet Weinliebhaber mit lokalen Weingütern: Winzer pflegen
Profil, Weinkatalog und Bestand, Kunden entdecken Weingüter in ihrer Nähe und
abonnieren Benachrichtigungen zu ihren Weinen.

## Seiten

| Datei | URL | Inhalt |
|---|---|---|
| `index.html` | `/` | Übersicht, verlinkt die drei Dokumente |
| `about.html` | `/about.html` | Was die App kann, für wen, womit gebaut |
| `privacy-policy.html` | `/privacy-policy.html` | Privacy Policy (EN) |
| `datenschutzerklaerung.html` | `/datenschutzerklaerung.html` | Datenschutzerklärung (DE), inhaltsgleich |
| `terms-of-service.html` | `/terms-of-service.html` | Terms of Service |
| `delete-account/index.html` | `/delete-account/` | Kontolöschung, zweisprachig |

Die Löschseite ist Pflichtbestandteil für Google Play und den App Store — sie muss
ohne Login und ohne installierte App erreichbar bleiben.

## Aufbau

```
Ausgetrunken-Docs/
├── assets/
│   ├── css/docs.css     # das gesamte Design, ein File
│   ├── js/docs.js       # nur Theme-Umschalter und Jahreszahl
│   └── img/             # App-Icon und Favicon
├── index.html
├── about.html
├── privacy-policy.html
├── datenschutzerklaerung.html
├── terms-of-service.html
├── delete-account/index.html
├── _cloudflare/         # Redirect-Worker, wird nicht ausgeliefert (siehe Hosting)
└── _config.yml
```

Kein Build, keine Abhängigkeiten außer dem Font-Link im `<head>`. Eine Datei im
Browser öffnen ist die komplette Entwicklungsschleife. Jede Seite trägt ein
winziges Inline-Skript, das das gespeicherte Farbschema vor dem ersten Paint
setzt — ohne das blitzt beim Laden das falsche Theme auf.

Privacy Policy und Datenschutzerklärung sind **zwei Fassungen desselben Texts**.
Wer eine ändert, zieht die andere im selben Commit nach.

## Hosting

Dieses Repo ist die **einzige** Quelle der Ausgetrunken-Rechtsseiten. Bis
September 2026 gab es eine zweite Kopie in `Ausgetrunken/shared-docs/web/`, die
über den Cloudflare Worker `ausgetrunken-legal` ausgeliefert wurde; beide Kopien
waren inhaltlich auseinandergelaufen. Die Kopie ist gelöscht.

Der Worker bleibt bestehen, weil ausgelieferte App-Versionen (mindestens bis
0.4.4) auf `https://ausgetrunken-legal.markono-code.workers.dev/<seite>` verlinken.
Er leitet jeden Pfad 1:1 per 301 hierher um. Quelltext:
`_cloudflare/ausgetrunken-legal-worker.js` — Jekyll überspringt Ordner mit `_`,
er wird also nicht mit ausgeliefert. Cloudflare hat keine Git-Anbindung; deployt
wird von Hand:

```
npx wrangler deploy _cloudflare/ausgetrunken-legal-worker.js \
  --name ausgetrunken-legal --compatibility-date 2026-09-01
```

Wrangler legt dabei im aktuellen Verzeichnis einen `.wrangler/`-Cache an — nicht
committen. Die frühere Fassung mit den statischen Seiten ist Worker-Version
`8efcd9c1-164c-46ea-8b39-5cf1b5794996` (`wrangler rollback`).

Beim nächsten App-Release die Links in der App direkt auf diese Seite umstellen
(Android `SettingsScreen.kt`, iOS `LegalLinks.swift` und `SettingsView.swift`).
Danach kann der Worker weg, sobald keine alte Version mehr nennenswert im Umlauf ist.

## Design-Familie

Diese Seiten gehören zu einer Familie aus drei Sites — markono.dev, Tap2Card-Docs
und Ausgetrunken-Docs. Sie teilen Struktur, Komponentennamen, Token-Vokabular und
die Theme-Mechanik; unterschiedlich sind nur Akzentfarbe, Grund und Schriftton.

**Kanonische Beschreibung: `MarkoNoDev/docs/DESIGN_FAMILY.md`** in `Claude-Projects`.
Dort steht auch, warum es bewusst *keine* gemeinsame CSS-Datei gibt und was beim
Ändern in allen drei Sites nachgezogen werden muss.

Ausgetrunken ist innerhalb der Familie die **gehobene Variante**: Papierweiß
`#FDFBF7` statt Weiß, Cormorant Garamond für Überschriften, Burgundy `#722F37`
als Akzent. Gold `#D4AF37` kommt an genau einer Stelle vor — der Haarlinie unter
dem Hero. Es lag anfangs auch auf Kickern, Ziffern und Rahmen und wirkte dadurch
laut statt fein; eine Farbe in acht Rollen ist kein Akzent mehr. Alle Farben stammen aus
`Ausgetrunken/Android/.../ui/theme/Color.kt` — keine wird für die Website erfunden.

## Kontakt

ausgetrunken@markono.dev

---

© 2026 Marko Nonninger. Alle Rechte vorbehalten.
