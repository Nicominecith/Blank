# Blank – Minecraft-Bedrock-Seite (Netlify)

## Dateien
- index.html  Startseite (Projekt, Teilnehmer mit Skin)
- player.html Eintragen und Status prüfen, danach Realm-Code
- admin.html  Anfragen annehmen/ablehnen (Admin-Passwort)
- netlify/functions  API (speichert in Netlify Blobs)

## Umgebungsvariablen (Netlify → Site configuration → Environment variables)
| Name | Bedeutung |
|---|---|
| JOIN_PASSWORD | Passwort, das du an Spieler weitergibst |
| ADMIN_PASSWORD | Passwort für admin.html |
| REALM_CODE | Realm-Code, wird nur freigeschalteten Spielern gezeigt |

## Deploy
1. Ordner in ein Git-Repo (GitHub) oder per Netlify CLI: `netlify deploy --prod`
2. Umgebungsvariablen setzen, danach neu deployen.
(Ein reines Drag-and-drop-Deploy unterstützt keine Functions/Blobs.)

## Schrift
Die Seite nutzt Google Fonts: "Press Start 2P" (Überschriften) und "VT323" (Text) für den Minecraft-Look. Zum Ändern die Namen in `assets/style.css` (`--f`, `--fh`) und den `<link>` in den drei HTML-Dateien anpassen.
