# v28 validation

Passed with Playwright WebKit at 1024 × 768, mobile/touch enabled.

- First MU-TH-UR tap unlocks native media and replays text with synchronized recorded keystrokes; second tap skips and stops typing audio.
- Opening text, title letter strokes, roster name preservation and one-action-per-tap retained.
- Mission text visibly progresses; font family, colour and font weight match the opening MU-TH-UR text.
- Tap-to-reveal completes mission/private orders and stops keyboard sounds. Acknowledge and Begin turn continue normally.
- Keyboard audio is silent while sound is disabled, and transmission timers cancel on leaving the screen.
- Reduced-motion preference shows the transmission immediately and does not block progression.
- All 19 embedded audio assets decode successfully and match the processed MP3 masters.
- Sound checker contains 19 players; the exact user-uploaded Start Game sample with reverb decodes to approximately 2.22 seconds.
- Rejected v27 Start Game data removed from index.html.
- Native wind, Start Game effect, ECG during the turn, sound off/on, and abort stopping heartbeat passed.
- Offline reload with server stopped passes; all 19 native assets load offline.
- No unexpected browser errors or external audio file requests.
- AudioContext constructors deliberately throw in regression tests; native playback still works.
- JavaScript syntax checks and visual review of opening and mission screens passed.

Audio levels and reverberation are baked into assets for iPad compatibility. The ECG dry signal is about 7 dB quieter than v27, with a short 160 ms reverb tail. Wind, alien calls and marine/scientist screams contain damped stereo reverb. Keyboard keys come from recorded single-key files, with no generated typing samples used.

These are desktop WebKit tests at an iPad viewport. Final perceived sound levels and physical iPad playback require auditioning on the user's device.
