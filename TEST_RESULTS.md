# v33 validation

- Touch-enabled WebKit: blank LOGIN, native audio unlock, silent sequential MU-TH-UR text, instant prefixes, flashing cursor and acknowledgement to roster.
- Full real-time opening: 31-second title, 3-second fade, APC driving/stopping over wind, 4-second board fade and mission briefing. Slower login text completes within the updated timeout.
- Tracker contact at 1, 2, 3 and 5 hexes: blip and pings only within two hexes of current player. Sting fires once on new contact; popup/private-panel transitions and mute/unmute do not replay it. Leaving and re-entering range triggers a new sting.
- Capture popup plays orchestral swarm layered with the human voice. Scientist popup retains artwork and CRT snap without a scream.
- All 27 artwork payloads match the clean v26/v30 bytes and fully decode in WebKit. All 17 active embedded recordings match integrity hashes and fully decode with FFmpeg.
- Crew/classified orders, all tile artwork, risky salvage equipment popup and enabled-button lettering checked.
- Native audio mute/unmute, pagehide/pageshow recovery, portrait and reduced-motion behavior checked.
- Offline reload passed with the server stopped after cache installation.
- Game and inline JavaScript syntax passed; no browser exceptions.

Physical iPad listening has not been performed here.

- Selected title ambience embedded from original 00:20 through the end. Six-second fade-in and final three-second fade-out baked into recording for reliable iPad loudness.
- WebKit title audio plays with wind, resumes from saved position after backgrounding, and stops at black as APC starts.

- Start Game launches music immediately, then 0.9-second roster fade and three-second black hold precede the title. Original recording pitch and playback speed retained.
