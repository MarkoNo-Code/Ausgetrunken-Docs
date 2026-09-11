# Ausgetrunken-Docs — offene Punkte

Stand: 11.09.2026, nach der Konsolidierung. Dieses Repo ist jetzt die **einzige**
Quelle der Ausgetrunken-Rechtsseiten (siehe README → Hosting). Die Kopie in
`Ausgetrunken/shared-docs/web/` ist gelöscht.

Live seit 11.09.2026: GitHub Pages liefert diesen Stand aus, der Worker
`ausgetrunken-legal` leitet alle alten App-Links per 301 hierher um (Version
`8fae01fa`, alle sieben Pfade geprüft).

---

## 1. Store-Konsolen

Die alten Worker-URLs funktionieren dank Umleitung weiter. Trotzdem die direkten
URLs eintragen, dann hängt der Store-Eintrag nicht mehr am Worker:

- [ ] **Store-Konsolen auf die direkten URLs setzen:**
      - Play Console → App-Inhalte → Datenschutzerklärung:
        `https://markono-code.github.io/Ausgetrunken-Docs/privacy-policy.html`
      - Play Console → App-Inhalte → Datensicherheit → Kontolöschung:
        `https://markono-code.github.io/Ausgetrunken-Docs/delete-account/`
      - App Store Connect → App-Datenschutz → Datenschutzrichtlinie: wie Play.

## 2. Beim nächsten App-Release

- [ ] In-App-Links direkt auf GitHub Pages stellen (Android `SettingsScreen.kt`,
      iOS `LegalLinks.swift`, `SettingsView.swift` — dort steht noch die
      Worker-URL).
- [ ] Support-Kontakt: `support@ausgetrunken.app` (Android `SettingsScreen.kt`,
      `CustomerProfileScreen.kt`, iOS `SettingsView.swift`) zeigt auf eine
      Domain, die niemandem gehört. Entweder Domain registrieren und
      weiterleiten (dann kann der Link bleiben) oder auf
      `ausgetrunken@markono.dev` umstellen. Ebenso `ausgetrunken@gmail.com` im
      Dialog für gesperrte Konten (Android `AuthScreen.kt`) — dieses Gmail-Konto
      existiert nicht (bestätigt 11.09.2026), Mails aus dem Dialog gehen ins Leere.

## 3. Inhaltlich

- [ ] **Ein Jurist hat da nicht draufgeschaut.** Privacy Policy am 09.09.2026
      grundlegend überarbeitet, Datenschutzerklärung am 11.09.2026 als
      Übersetzung davon ergänzt. Beide bilden ab, was der Code tut — keine
      Rechtsberatung. Vor allem Abschnitt 04 (Dienste) und 06 (Löschung).
- [ ] Die Terms erwähnen kostenpflichtige Winzer-Abos und die Kontolöschung.
      Prüfen, ob die Abo-Bedingungen (Laufzeit, Kündigung, Erstattung) reichen.
- [ ] Terms und About sind nur Englisch. Die alte Worker-Fassung hatte das auch
      nur auf Englisch — kein Rückschritt, aber für den deutschen Markt offen.

## Erledigt am 11.09.2026

- Deutsche Datenschutzerklärung (`datenschutzerklaerung.html`), Sprachumschalter
  auf beiden Fassungen, Karte auf der Startseite. Die Worker-Fassung war
  zweisprachig — ohne das wäre die deutsche Fassung beim Umzug verloren gegangen.
- Menüpfad zur Kontolöschung korrigiert: „Einstellungen → Konto löschen“ stimmte
  für Kunden nicht. In beiden Apps liegt der Button im Profil; Winzer unter iOS
  erreichen ihn über das Profilbild.
- Veraltete `about.md`, `privacy-policy.md`, `terms-of-service.md` und das
  ungenutzte Cayman-Theme entfernt.
- `ausgetrunken@markono.dev`: Weiterleitung angelegt, Testmail kommt an.

---

## Was sich am Inhalt gegenüber der alten Fassung geändert hat — und warum

Die alte Fassung nannte **Firebase** für Authentication, Firestore, Cloud Storage
und Cloud Messaging. Nach Prüfung des Codes:

| | tatsächlich |
|---|---|
| Auth, Datenbank, Storage, Edge Functions | **Supabase** — nicht Firebase |
| Push | Firebase Cloud Messaging (beide Plattformen) |
| Absturzberichte | Firebase Crashlytics (beide Plattformen) |
| Nutzungsstatistik | Firebase Analytics (Android) |
| Karte und Standort | Google Maps SDK |
| Bezahlte Abos | Google Play Billing (Android), App Store (iOS) |
| Anmeldung | E-Mail, Sign in with Apple, Google |

Auch die bis heute live laufende Worker-Fassung (Stand 17.06.2026) nennt
Analytics, Crashlytics, Maps und Zahlungen nicht — die Umstellung schließt diese
Lücke.

Weiter korrigiert:

- **Löschung.** Ablauf korrekt beschrieben: Markierung, sofortige Abmeldung,
  30 Tage Widerruf durch erneutes Anmelden, danach `purge-deleted-accounts`
  (täglicher pg_cron) → Apple-Grant widerrufen, Storage-Fotos löschen,
  `auth.admin.deleteUser` mit Kaskade über alle Tabellen.
- **Verantwortlicher:** Winterthur, Schweiz.
- **Plattformen:** Android *und* iOS.
- **Kontakt:** `ausgetrunken@markono.dev`.
