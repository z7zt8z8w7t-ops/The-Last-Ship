# v91 verification

- All 31 real recordings match their restored source hashes and fully decode without errors, non-finite samples or extreme spikes.
- Unsafe whole-document version substitution is reproduced; safe build update preserves all embedded media.
- Countdown end ramp is checked in the audio engine test. Existing title, terminal and music gains and requested playback paths pass.
- All production and executable inline JavaScript syntax checks pass.
- 14 regression/playthrough scripts pass; one additional findings script continues to reproduce documented unrelated defects. Physical Safari playback is not claimed.

- audit-findings.test.js: PASS
- background-crossfade.test.js: PASS
- board-tokens.test.js: PASS
- boarding-loss.test.js: PASS
- drone-playback.test.js: PASS
- emplacement-spacing.test.js: PASS
- ending-audio.test.js: PASS
- facing-vehicles.test.js: PASS
- mission-dialog.test.js: PASS
- quarantine-ending.test.js: PASS
- skip-sequences.test.js: PASS
- terminal-orphan.test.js: PASS
- terrain-render.test.js: PASS
- touch-capture-items.test.js: PASS
- virtual-playthrough.test.js: PASS


See V92_CHANGES.md for the v92 update, validation and device-test limitations.
