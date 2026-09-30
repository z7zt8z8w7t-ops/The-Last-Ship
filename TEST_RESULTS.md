# v30 validation

- JavaScript syntax checks: passed.
- All 15 embedded MP3 assets decoded with FFmpeg; ECG and keyboard/RTTY assets absent.
- WebKit touch workflow: blank opening, LOGIN user gesture, CRT transition, instant MU-TH-UR prefixes, sequential typed messages, square cursor, ACKNOWLEDGE after completion, direct crew-roster transition.
- Smaller briefing lettering and faster completion, with tap-to-reveal.
- Selected tracker plays only within two hexes during active play; text and ECG sounds absent.
- Title starts from the A in LAST and builds outwards; final letter finishes after about 26 seconds.
- Mute/unmute retains edited roster names; simulated pagehide/pageshow pauses and resumes native media.
- Service-worker offline reload, portrait layout, reduced-motion preference, and sound-check controls.

This is desktop WebKit with touch/iPad-sized viewports. Real iPad audio interruptions and home-screen suspension need checking on the physical device.

Tracker checks cover one/two/three hexes, selection of the current player, mute retaining the visual blip, and containment within the board corner.

Artwork regression checks: all 27 images equal the clean source byte-for-byte and fully decode, and all 15 recording hashes match mastered assets and decode. WebKit renders every artwork type, tile terrain and the actual Risky salvage jetpack popup; screenshots were reviewed. Artwork is included in the v30 offline cache.
