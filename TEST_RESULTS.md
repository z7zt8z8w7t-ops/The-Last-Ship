# v25 verification

2026-09-30: Playwright WebKit 26.5, 1024 × 768 touch viewport.

Passed:
- Boot text fits and completes its reveal.
- Full-screen touch advances boot and title.
- All title strokes finish drawing using valid CSS delays.
- All 15 packaged MP3 files decode; audio context is running and wind source active after the initial gesture.
- Add player adds one row per tap.
- Names, added rows and capture voice choices survive sound toggles.
- Muting stops all active sources; unmuting resumes wind.
- Start Game selects the dedicated start-screech asset.
- Mission briefing, handoff, private-order close and game board render work.
- ECG sample plays during the player's turn; abort stops it and returns to title.
- Game reloads from service-worker cache when the server is shut down, and all 15 audio files decode again.
- No unexpected browser errors; the disconnected service-worker update request fails as expected.
- JavaScript syntax checks pass for game.js, audio.js and sw.js.
- All audio manifest paths resolve; no oscillator/noise synthesis routines remain.

Limitations: no physical iPad listening test; this is not an exhaustive board-game rules playtest. The ECG is a pre-existing sound-effect sample, not a verified clinical-device recording. Creature effects are openly licensed creator-produced audio, not verified professional studio recordings.
