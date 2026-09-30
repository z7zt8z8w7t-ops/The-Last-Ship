# v31 validation

- Touch-enabled WebKit, landscape and portrait: blank LOGIN, audio unlock, silent MU-TH-UR typing, square cursor and acknowledgement to roster.
- Full real-time mission opening: roster -> slow A-first outward title -> five-second hold -> three-second fade -> APC excerpt over active wind for 15.5 seconds -> four-second board fade -> briefing.
- Reduced-motion opening and saved-game continuation checked.
- Crew and classified briefing wording, red CRT theme and bottom-right acknowledgement checked.
- Enabled action-panel lettering glows; disabled lettering remains dim.
- All 27 artwork images match clean v30 bytes and fully decode. All 16 embedded audio assets match integrity hashes and decode with FFmpeg.
- Sound check has all 16 players; APC decodes in WebKit.
- Tracker tested at 1, 2, 3 and 5 hex distance: active only at <=2 for current player; mute stops sound while retaining visual contact.
- Native-media mute/unmute and pagehide/pageshow recovery checked.
- Offline reload checked with the HTTP server stopped after service-worker installation.
- JavaScript syntax checks passed; no browser exceptions.

Physical iPad listening has not been performed in this environment.
